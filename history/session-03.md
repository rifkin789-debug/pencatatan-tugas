# Riwayat Sesi 03

**Tanggal:** 16 November 2026

## Yang Dikerjakan
- Memasang `@supabase/supabase-js` dan menambahkan klien Supabase yang membaca environment variables.
- Menyiapkan migration tabel `tasks`, RLS policies, dan data contoh.
- Mengganti template awal dengan antarmuka daftar tugas yang mendukung tambah, edit, hapus, tandai selesai, dan filter.
- Menambahkan `.env.example`, instruksi Supabase/Vercel, dan `vercel.json`.
- Menyiapkan status yang jelas bila environment Supabase belum dikonfigurasi.
- Memverifikasi tampilan aplikasi lokal tanpa kredensial, `npm run lint`, dan `npm run build`.

## Status
- Aplikasi lokal dapat dibuka dan menampilkan petunjuk konfigurasi; lint dan production build lulus.
- Project Supabase belum dibuat/dihubungkan; URL dan publishable/anon key belum tersedia.
- Vercel belum dihubungkan karena belum ada sesi login akun Vercel.
- Migration menggunakan policy publik karena spesifikasi tidak mencakup login; data tugas bersifat bersama dan dapat diubah pengunjung.

## Langkah Berikutnya
- Buat project Supabase, jalankan migration, lalu isi URL dan publishable/anon key.
- Login ke Vercel dan impor repo GitHub untuk deployment otomatis.
