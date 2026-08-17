'use client';

import { useState } from 'react';
import { validateMovie, parseActors } from '@/lib/validateMovie';

export default function MovieCard({ movie, isAdmin, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: movie.title,
    actors: movie.actors.join(', '),
    releaseYear: String(movie.release_year),
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    const validationErrors = validateMovie(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    await onUpdate(movie.id, {
      title: form.title.trim(),
      actors: parseActors(form.actors),
      release_year: Number(form.releaseYear),
    });
    setSaving(false);
    setEditing(false);
  }

  function handleCancel() {
    setForm({
      title: movie.title,
      actors: movie.actors.join(', '),
      releaseYear: String(movie.release_year),
    });
    setErrors({});
    setEditing(false);
  }

  if (editing) {
    return (
      <li className="rounded-lg border border-marquee/15 bg-white p-4 shadow-sm">
        <form onSubmit={handleSave} className="grid gap-3">
          <div>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded border border-marquee/25 px-3 py-1.5 text-sm"
              placeholder="Title"
            />
            {errors.title && <p className="mt-1 text-xs text-brick">{errors.title}</p>}
          </div>
          <div>
            <input
              name="actors"
              value={form.actors}
              onChange={handleChange}
              className="w-full rounded border border-marquee/25 px-3 py-1.5 text-sm"
              placeholder="Actors, comma separated"
            />
            {errors.actors && <p className="mt-1 text-xs text-brick">{errors.actors}</p>}
          </div>
          <div>
            <input
              name="releaseYear"
              value={form.releaseYear}
              onChange={handleChange}
              className="w-28 rounded border border-marquee/25 px-3 py-1.5 text-sm"
              placeholder="Year"
            />
            {errors.releaseYear && <p className="mt-1 text-xs text-brick">{errors.releaseYear}</p>}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-marquee px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded border border-marquee/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-marquee"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="relative flex items-stretch overflow-hidden rounded-lg border border-marquee/15 bg-white shadow-sm">
      <div className="flex w-14 shrink-0 items-center justify-center border-r border-dashed border-marquee/25 bg-cream">
        <span className="font-display text-lg font-bold text-marquee">{movie.release_year}</span>
      </div>
      <div className="flex-1 px-4 py-3">
        <p className="font-display text-base font-semibold text-marquee">{movie.title}</p>
        <p className="mt-1 text-sm text-ink/70">{movie.actors.join(', ')}</p>
      </div>
      {isAdmin && (
        <div className="flex shrink-0 flex-col justify-center gap-1 border-l border-dashed border-marquee/25 px-3 text-xs">
          <button
            onClick={() => setEditing(true)}
            className="font-semibold uppercase tracking-wide text-marquee hover:text-gold"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="font-semibold uppercase tracking-wide text-brick hover:text-brick/70"
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
