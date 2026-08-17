'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-medium uppercase tracking-wide hover:text-gold transition-colors"
    >
      Sign out
    </button>
  );
}
