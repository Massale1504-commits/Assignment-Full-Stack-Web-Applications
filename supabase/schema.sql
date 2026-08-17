-- run this in the Supabase SQL editor for your project

create table if not exists movies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  actors text[] not null,
  release_year int not null,
  created_at timestamptz not null default now()
);

alter table movies enable row level security;

-- anyone (including logged-out visitors) can read the movie list
create policy "movies_select_public"
  on movies for select
  using (true);

-- only signed-in users (the admin) can add, edit or delete movies
create policy "movies_insert_authenticated"
  on movies for insert
  to authenticated
  with check (true);

create policy "movies_update_authenticated"
  on movies for update
  to authenticated
  using (true)
  with check (true);

create policy "movies_delete_authenticated"
  on movies for delete
  to authenticated
  using (true);

insert into movies (title, actors, release_year) values
  ('The Matrix', array['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'], 1999),
  ('Inception', array['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'], 2010),
  ('Parasite', array['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'], 2019),
  ('Spirited Away', array['Rumi Hiiragi', 'Miyu Irino'], 2001),
  ('Mad Max: Fury Road', array['Tom Hardy', 'Charlize Theron'], 2015);
