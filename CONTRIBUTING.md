# Panduan Kontribusi

Resepy adalah platform resep interaktif: smart pantry, meal planner, cooking mode hands-free, dan creator studio. Dibangun dengan Next.js 16, React 19, Prisma, dan Tailwind CSS v4.

## Menjalankan

```bash
npm install --ignore-scripts
npm run dev    # http://localhost:3000
npm test
```

## Sebelum mengirim perubahan

- Jalankan `npm run lint` dan `npm test` sebelum push.
- Cek di 375px dan desktop; cooking mode harus tetap bisa dipakai tanpa mouse.
- Jangan commit `.env`, kunci API, atau hasil build.

## Alur kontribusi

1. `git checkout -b fix/nama-singkat`
2. Commit dengan pesan yang jelas.
3. Buka pull request ke `main`, jelaskan **apa** dan **kenapa**.

Untuk masalah keamanan, ikuti `SECURITY.md`, jangan buka issue publik.

## Lisensi

Dengan mengirim pull request, kontribusimu dirilis di bawah [MIT License](LICENSE).