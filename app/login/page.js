'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/');
    router.refresh();
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl font-bold text-marquee">Admin sign in</h1>
      <p className="mt-1 text-sm text-ink/70">
        Sign in to add, edit or delete movies in the catalogue.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-lg border border-marquee/15 bg-white p-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-marquee">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-marquee/25 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="admin@imr-movies.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-marquee">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-marquee/25 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-brick">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-marquee px-5 py-2 text-sm font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-marquee/85 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
