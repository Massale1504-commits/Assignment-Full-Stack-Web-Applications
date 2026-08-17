'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import MovieCard from './MovieCard';
import AddMovieForm from './AddMovieForm';

export default function MovieBoard({ initialMovies, isAdmin }) {
  const [movies, setMovies] = useState(initialMovies);
  const supabase = createClient();

  async function handleAddMovie(newMovie) {
    const { data, error } = await supabase.from('movies').insert(newMovie).select().single();
    if (error) return { error: error.message };
    setMovies((prev) => [...prev, data]);
    return { error: null };
  }

  async function handleUpdateMovie(id, updates) {
    const { data, error } = await supabase
      .from('movies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (!error) {
      setMovies((prev) => prev.map((m) => (m.id === id ? data : m)));
    }
  }

  async function handleDeleteMovie(id) {
    const { error } = await supabase.from('movies').delete().eq('id', id);
    if (!error) {
      setMovies((prev) => prev.filter((m) => m.id !== id));
    }
  }

  return (
    <div className="grid gap-10">
      <section>
        <h2 className="font-display text-2xl font-bold text-marquee">Now available</h2>
        <p className="mt-1 text-sm text-ink/70">{movies.length} titles in the catalogue</p>

        {movies.length === 0 ? (
          <p className="mt-4 text-sm text-ink/60">No movies yet.</p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isAdmin={isAdmin}
                onUpdate={handleUpdateMovie}
                onDelete={handleDeleteMovie}
              />
            ))}
          </ul>
        )}
      </section>

      {isAdmin && (
        <section>
          <h2 className="font-display text-2xl font-bold text-marquee">Add a movie</h2>
          <p className="mt-1 text-sm text-ink/70">All fields are required and validated.</p>
          <div className="mt-4 rounded-lg border border-marquee/15 bg-white p-5">
            <AddMovieForm onAddMovie={handleAddMovie} />
          </div>
        </section>
      )}
    </div>
  );
}
