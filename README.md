# Internet Movies Rental - Movie Catalogue

Single-page Next.js app backed by Supabase. Anyone can browse the movie catalogue;
signing in as an admin unlocks add, edit and delete.

## How the auth split works

- Movie data lives in a `movies` table in Supabase.
- Row Level Security policies (in `supabase/schema.sql`) allow anyone to `select`,
  but only signed-in (`authenticated`) users can `insert`, `update` or `delete`.
- There's no separate "admin" flag - any account you create in Supabase Auth acts
  as an admin once signed in. Visitors who aren't signed in only see the read-only view.

## Structure

- `supabase/schema.sql` - table definition, RLS policies, seed data
- `lib/supabase/client.js` - browser Supabase client
- `lib/supabase/server.js` - server component Supabase client
- `lib/supabase/middleware.js` + `proxy.js` - keeps the auth session cookie fresh
- `lib/validateMovie.js` - validation rules shared by add and edit forms
- `components/Navbar.js` - static navbar, shows sign in/out state (server component)
- `components/Footer.js` - static footer with company info (server component)
- `components/MovieBoard.js` - holds the movie list state, wires up Supabase calls (client component)
- `components/MovieCard.js` - ticket-style movie card with inline edit/delete (client component)
- `components/AddMovieForm.js` - add-movie form with validation (client component)
- `app/login/page.js` - admin sign-in page
- `app/page.js` - server component that loads movies and the current session

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` 

## 3. Sign in on the website

email: admin@gmail.com
pass: 12345678

## 5. Deploy on Vercel

1. Push this project to a GitHub repo.
2. Go to vercel.com, "Add New Project", import the repo.
3. Under Environment Variables, add `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` with the same values as your `.env.local`.
4. Deploy. Vercel gives you a live URL.

## Submission checklist

- [ ] Supabase schema and seed data applied
- [ ] Admin account created in Supabase Auth
- [ ] Environment variables set locally and on Vercel
- [ ] All group members have committed at least once
- [ ] GitHub repo link
- [ ] Deployed site link
