import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SignOutButton from './SignOutButton';

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-marquee text-cream">
      <div
        className="h-2"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 10px 4px, var(--color-gold) 0 2.5px, transparent 3px 20px)',
        }}
      />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/">
          <p className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            Internet Movies Rental
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Movie Catalogue</p>
        </Link>
        <div className="text-sm">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-cream/70 sm:inline">{user.email}</span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="font-medium uppercase tracking-wide hover:text-gold transition-colors"
            >
              Admin sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
