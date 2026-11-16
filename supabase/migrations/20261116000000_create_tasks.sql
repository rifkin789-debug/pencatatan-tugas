create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  description text,
  due_date date not null,
  priority text not null default 'sedang'
    check (priority in ('rendah', 'sedang', 'tinggi')),
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

-- The app has no sign-in; tasks are intentionally shared and writable by visitors.
grant select, insert, update, delete on public.tasks to anon, authenticated;

drop policy if exists "Public can read tasks" on public.tasks;
create policy "Public can read tasks"
  on public.tasks for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can create tasks" on public.tasks;
create policy "Public can create tasks"
  on public.tasks for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Public can update tasks" on public.tasks;
create policy "Public can update tasks"
  on public.tasks for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Public can delete tasks" on public.tasks;
create policy "Public can delete tasks"
  on public.tasks for delete
  to anon, authenticated
  using (true);

insert into public.tasks (title, description, due_date, priority)
select 'Contoh: Selesaikan tugas kuliah', 'Ganti atau hapus tugas contoh ini.', current_date + 1, 'tinggi'
where not exists (
  select 1 from public.tasks where title = 'Contoh: Selesaikan tugas kuliah'
);

insert into public.tasks (title, description, due_date, priority)
select 'Contoh: Baca materi perkuliahan', null, current_date + 3, 'sedang'
where not exists (
  select 1 from public.tasks where title = 'Contoh: Baca materi perkuliahan'
);
