# LingoDe

Almanca öğrenme PWA uygulaması — Angular 19 + Node.js/Express + Claude AI.

## Özellikler

- 📷 Kamera / PDF / dosyadan kelime çıkarma
- 🤖 Claude AI ile toplu kelime analizi (çekim, anlam, örnek cümle)
- 🃏 SM-2 aralıklı tekrar flashcard
- 📚 Statik gramer dersleri (A1–C2)
- 🔗 Präpositionalverben — 162 edat+fiil kombinasyonu, boşluk doldurma
- 🎯 Eşleştirme oyunu (kelime ve edat modları)
- 📱 PWA — telefona yüklenebilir

## Kurulum

### Backend
```bash
cd backend
npm install
cp .env.example .env   # API anahtarlarını gir
node src/server.js
```

### Frontend
```bash
cd frontend
npm install
npx ng serve
```

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Angular 19, Tailwind CSS v3, PWA |
| Backend | Node.js, Express, MongoDB/Mongoose |
| AI | Anthropic Claude API |
| Algoritma | SM-2 Spaced Repetition |
