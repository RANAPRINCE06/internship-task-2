# 🔑 RandomForge — Secure String & Password Generator

> **Task 2 — Internship Project**  
> A cryptographically secure random string and password generator built with React + Vite.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://ranaprince06.github.io/internship-task-2/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)

---

## 🚀 Live Demo

**[https://ranaprince06.github.io/internship-task-2/](https://ranaprince06.github.io/internship-task-2/)**

---

## ✨ Features

- 🔐 **Cryptographically Secure** — Uses `window.crypto.getRandomValues()` for true randomness
- 🎛️ **Customizable** — Control length (1–50) and character types (Uppercase, Lowercase, Numbers, Special)
- 📊 **Strength Meter** — Real-time visual password strength indicator
- 📋 **History** — Last 10 generated strings with one-click copy
- 🌙 **Dark / Light Theme** — Toggle with persistence via `localStorage`
- 💾 **Export** — Download any generated string as a `.txt` file
- ✨ **Premium UI** — Glassmorphism design with floating particles and micro-animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI Components & State Management |
| **Vite 8** | Build Tool & Dev Server |
| **Crypto API** | Secure random generation |
| **localStorage** | Preference & history persistence |
| **CSS (Vanilla)** | Glassmorphism styling & animations |
| **react-icons** | Icon library |

---

## ⚛️ React Concepts Used

| Hook | Usage |
|---|---|
| `useState` | Theme, length, options, generated string, history, copyStatus |
| `useEffect` | Apply theme to DOM, persist prefs, auto-regenerate on option change |
| `useCallback` | Memoized `generateString`, `handleCopy`, `clearHistory`, `exportTxt` |
| `useRef` | 3D card tilt effect via DOM reference |
| **Custom Hook** | `useRandomString()` — encapsulates all generation logic |

---

## 📁 Project Structure

```
random-string-gen/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── keybank-logo.png
│   ├── components/
│   │   ├── AnimatedString.jsx    # Character scramble animation
│   │   ├── BackgroundEffects.jsx # Animated gradient background
│   │   ├── Controls.jsx          # Slider + character type toggles
│   │   ├── FloatingParticles.jsx # Floating particle background
│   │   ├── Header.jsx            # Sticky glassmorphism header
│   │   ├── History.jsx           # Last 10 strings with copy
│   │   ├── StrengthMeter.jsx     # Password strength visualization
│   │   ├── StringGenerator.jsx   # Main output card with 3D tilt
│   │   └── ThemeToggle.jsx       # Dark/light mode toggle button
│   ├── hooks/
│   │   └── useRandomString.js    # Custom hook for all generation logic
│   ├── App.css                   # All styles (glassmorphism, animations)
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global reset
│   └── main.jsx                  # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🏃 Running Locally

```bash
# Clone the repo
git clone https://github.com/RANAPRINCE06/internship-task-2.git
cd internship-task-2/random-string-gen

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deployment

This project is deployed to **GitHub Pages** using the `gh-pages` package.

```bash
cd random-string-gen
npm run deploy
```

This will:
1. Run `vite build` to produce the `dist/` folder
2. Push the built files to the `gh-pages` branch
3. GitHub Pages serves from that branch automatically

---

## 📸 Screenshots

| Dark Mode | Light Mode |
|---|---|
| Glassmorphism UI with animated particles | Clean light theme with smooth transitions |

---

## 👨‍💻 Author

**Prince Rana**  
GitHub: [@RANAPRINCE06](https://github.com/RANAPRINCE06)

---

*Built as Task 2 of the internship — demonstrating React hooks, custom hooks, Crypto API, and modern UI design.*
