'use client';

import { useState } from 'react';
import { validateMovie, parseActors } from '@/lib/validateMovie';

const EMPTY_FORM = { title: '', actors: '', releaseYear: '' };

export default function AddMovieForm({ onAddMovie }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateMovie(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setMessage('');
      return;
    }

    setSaving(true);
    const { error } = await onAddMovie({
      title: form.title.trim(),
      actors: parseActors(form.actors),
      release_year: Number(form.releaseYear),
    });
    setSaving(false);

    if (error) {
      setMessage(error);
      return;
    }

    setForm(EMPTY_FORM);
    setMessage(`${form.title.trim()} was added to the catalogue.`);
  }

  const fieldClass = (field) =>
    `w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold ${
      errors[field] ? 'border-brick' : 'border-marquee/25'
    }`;

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-3">
      <div>
        <label className="mb-1 block text-sm font-medium text-marquee">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={fieldClass('title')}
          placeholder="The Matrix"
        />
        {errors.title && <p className="mt-1 text-xs text-brick">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-marquee">Actors</label>
        <input
          name="actors"
          value={form.actors}
          onChange={handleChange}
          className={fieldClass('actors')}
          placeholder="Keanu Reeves, Carrie-Anne Moss"
        />
        {errors.actors && <p className="mt-1 text-xs text-brick">{errors.actors}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-marquee">Release year</label>
        <input
          name="releaseYear"
          value={form.releaseYear}
          onChange={handleChange}
          className={fieldClass('releaseYear')}
          placeholder="1999"
        />
        {errors.releaseYear && <p className="mt-1 text-xs text-brick">{errors.releaseYear}</p>}
      </div>

      <div className="sm:col-span-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-marquee px-5 py-2 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-marquee/85 disabled:opacity-60"
        >
          {saving ? 'Adding...' : 'Add movie'}
        </button>
        {message && <p className="mt-3 text-sm text-marquee">{message}</p>}
      </div>
    </form>
  );
}
