# Peekaboo Landing Page

Peekaboo 앱 소개 및 다운로드 랜딩 페이지입니다.

A landing page for the Peekaboo transparent browser app—features, demo video, and downloads.

---

## 🌐 Live / 배포

**https://peekaboo-daol.vercel.app**

---

## ✨ Features / 주요 기능

| Feature | Description |
|---------|-------------|
| **Hero** | Two-column layout, headline, demo video |
| **Auto-download** | Detects Mac/Windows and offers the right build |
| **i18n** | Korean/English toggle (한/EN) |
| **Direct download** | Fetches GitHub Releases API for latest assets |
| **OG image** | 1200×630 high-quality link preview |
| **Mac install notice** | Right-click → Open (Apple Developer pending) |
| **Windows coming soon** | Disabled state with "준비중" |

---

## 🛠 Tech Stack / 기술 스택

- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- shadcn/ui (Button, Card, Badge, Dropdown)
- Motion (animations, tilt cards)
- Vercel deployment

---

## 📁 Project Structure / 프로젝트 구조

```
peekaboo-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main landing page
│   │   ├── layout.tsx         # Root layout, metadata
│   │   ├── opengraph-image.tsx # Dynamic OG image
│   │   └── api/releases/      # GitHub Releases API proxy
│   ├── components/ui/         # shadcn components
│   └── lib/
│       ├── i18n.ts            # KO/EN translations
│       ├── detect-platform.ts # Mac/Windows detection
│       └── utils.ts
├── public/
│   ├── peekaboo.png           # App icon
│   └── peekaboo.mp4           # Demo video
└── package.json
```

---

## 🚀 Development / 개발

```bash
npm install
npm run dev
```

## Build / 빌드

```bash
npm run build
```

---

## 📤 Deployment (Vercel) / 배포

1. Connect this repo to [vercel.com](https://vercel.com)
2. Deploy (auto on push to main)
3. Or: `npx vercel`

---

## Related / 관련 프로젝트

- [tranparent-browser](https://github.com/ho0405/tranparent-browser) – Peekaboo Electron app
