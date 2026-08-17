import { createClient } from '@/lib/supabase/server';
import MovieBoard from '@/components/MovieBoard';

// dynamic - the catalogue is database-backed and user-specific (admin vs public)
export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();

  const [{ data: movies }, { data: { user } }] = await Promise.all([
    supabase.from('movies').select('*').order('release_year', { ascending: true }),
    supabase.auth.getUser(),
  ]);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <MovieBoard initialMovies={movies ?? []} isAdmin={!!user} />
    </main>
  );
}
