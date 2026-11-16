# Pencatatan Tugas

Aplikasi React + Vite untuk mencatat tugas dengan Supabase sebagai database dan Vercel untuk deployment.

## Menjalankan secara lokal

1. Install Node.js dan jalankan `npm install`.
2. Buat project Supabase, lalu jalankan SQL di `supabase/migrations/20261116000000_create_tasks.sql` melalui Supabase SQL Editor.
3. Jalankan `Copy-Item .env.example .env` di PowerShell, lalu isi URL project dan publishable/anon key Supabase di `.env`.
4. Jalankan `npm run dev`.

Tanpa kredensial Supabase, aplikasi tetap dapat dijalankan dan menampilkan petunjuk konfigurasi, tetapi fitur penyimpanan tugas belum aktif.

## Environment variables

```env
VITE_SUPABASE_URL=https://project-id.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

Gunakan publishable key (atau anon key lama), bukan `service_role`/secret key. File `.env` tidak dimasukkan ke Git.

## Menjalankan pemeriksaan

- `npm run lint`
- `npm run build`

## Deployment ke Vercel

Hubungkan repo GitHub ini ke Vercel sebagai project Vite, lalu tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di Environment Variables untuk Production, Preview, dan Development. `vercel.json` mengatur build dan output `dist`; push ke branch `main` memicu deployment setelah integrasi repo diaktifkan.

## Akses data

Spesifikasi saat ini tidak mencakup login. Kebijakan RLS pada migration membuat daftar tugas bersama dan mengizinkan pengunjung aplikasi membaca, menambah, mengedit, serta menghapus tugas. Jangan masukkan informasi sensitif. Jika tugas harus privat per pengguna, autentikasi dan kebijakan per-user perlu ditambahkan.
