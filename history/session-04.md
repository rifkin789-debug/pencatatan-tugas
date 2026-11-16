# Riwayat Sesi 04

**Tanggal:** 16 November 2026

## Yang Dikerjakan
- Menggunakan URL dan publishable key Supabase yang tersedia di `.env.example` untuk membuat `.env` lokal yang diabaikan Git.
- Memverifikasi bahwa build Vite menggunakan konfigurasi Supabase dan lint/build lulus.
- Memeriksa endpoint Supabase: project merespons, tetapi `public.tasks` belum ada (HTTP 404 / PGRST205).
- Membuka alur login Supabase dan Vercel; keduanya masih meminta login GitHub.
- Memperbarui status Tahap 2 di `plan.md`.

## Status Tertunda
- Migration tabel, RLS, dan data contoh belum dijalankan karena sesi dashboard Supabase masih meminta autentikasi.
- Repo belum dapat diimpor/deploy di Vercel karena alur GitHub login dan izin GitHub App belum selesai.
- `.env` lokal berisi konfigurasi project dan tidak dilacak Git.

## Langkah Berikutnya
- Login ke Supabase dan jalankan `supabase/migrations/20261116000000_create_tasks.sql`.
- Izinkan GitHub App Vercel untuk repo `rifkin789-debug/pencatatan-tugas`, impor project, atur environment variables, lalu deploy.
- Uji endpoint database dan deployment setelah akses pulih.
