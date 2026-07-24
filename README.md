<div align="center">

# ✉️ SignatureCraft

**Open-Source Professional HTML Email Signature Generator (Gmail, Outlook & Apple Mail)**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.1-fbf0df?style=for-the-badge&logo=bun)](https://bun.sh/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*A modern web application designed to build, customize, export, and import 100% anti-spam compliant email signatures with hybrid responsive design and full international bilingual support.*

[Features](#-key-features) • [Installation](#-getting-started--local-development) • [Architecture](#-technical-architecture)

</div>

---

## 🌟 Key Features

### 🛡️ 100% Anti-Spam (Zero Images & Emojis)
- **Zero email client blocking**: Built exclusively using pure HTML tables, inline CSS styles, and clean ASCII text markers (`E:`, `T:`, `M:`, `W:`, `LINKEDIN | GITHUB | PORTFOLIO`).
- Prevents emails from ending up in Spam or Promotions folders caused by third-party remote images or blocked icons.

### 🌐 International Bilingual Support (Spanish / English)
- **Global & card-level language toggling**: Switch the language globally across all templates or toggle individual cards (`ES` / `EN`) prior to copying.
- **Persistent bilingual pronouns**: Store independent versions of pronouns in Spanish (e.g., `Él / Him`) and English (e.g., `He / Him`).
- **Career-focused availability badges**: Tailored for active job seekers (`● Open to new career opportunities` / `● Abierto a oportunidades laborales`).

### 📋 1-Click WYSIWYG Copying for Gmail
- **Real Rich Text Copying**: Powered by native `ClipboardItem` API with DOM Selection fallback (`execCommand`) to place rendered visual HTML directly onto your system clipboard.
- Paste your visual signature seamlessly into **Gmail Settings > Signature** via <kbd>Cmd</kbd> + <kbd>V</kbd> / <kbd>Ctrl</kbd> + <kbd>V</kbd> without exposing raw HTML markup code.

### 📱 Hybrid Responsive Architecture (Desktop & Mobile)
- **Desktop View**: Wide, elegant horizontal layout with `|` dividers and spacious margins.
- **Mobile View (< 480px)**: Embedded `@media` queries automatically stack contact items into single-line blocks to eliminate vertical squishing of phone numbers.

### 💻 VSCode-Style Inline Code Viewer
- **Inline Code Inspection**: Inspect and view raw HTML code directly under each template card with line numbers and VSCode dark theme syntax highlighting (`#569cd6`, `#9cdcfe`, `#ce9178`).

### 💾 LocalStorage & .JSON Data Management
- **LocalStorage Persistence**: Auto-saves profile state directly in browser `localStorage`.
- **Export & Import JSON**: Export your complete profile configuration to a `.json` backup file and restore it anytime.

---

## 🎨 10 Included Professional Templates

1. **Executive Sleek**: Modern top accent line, crisp typography, and executive hierarchy.
2. **Corporate Classic**: Left vertical accent bar with formal corporate labeling.
3. **Clean & Minimal**: Ultra-clean minimal layout with subtle horizontal dividers.
4. **Modern Split**: 2-column structure with an initials block badge.
5. **Tech Specialist**: Monospace developer-style dark tag blocks.
6. **Compact Badge**: Compact bordered card ideal for fast reply threads.
7. **Bordered Accent**: Subtle top and bottom borders for balanced formal tone.
8. **Serif Elegant**: Refined Georgia serif typography for corporate or institutional signatures.
9. **Creative Freelance**: Clean layout emphasizing portfolio visibility and social handles.
10. **Developer Terminal**: Monospace developer console aesthetic (`$ whoami`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) powered by [Turbopack](https://nextjs.org/docs/architecture/turbopack).
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type definitions.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/).
- **UI Components**: Native components inspired by [Shadcn UI](https://ui.shadcn.com/) (Collapsible Sidebar, Kbd shortcuts, Modals).
- **Notifications & Effects**: [Sonner](https://sonner.emilkowal.si/) Toasts & [Canvas Confetti](https://github.com/catdad/canvas-confetti).
- **Package Manager**: [Bun](https://bun.sh/).

---

## 📂 Technical Architecture

```bash
signature/
├── app/
│   ├── layout.tsx               # Next.js root layout
│   ├── page.tsx                 # Main dashboard with viewport height layout
│   └── globals.css              # Global styles & design system tokens
├── components/
│   ├── ui/
│   │   ├── kbd.tsx              # Kbd & KbdGroup components for toast shortcuts
│   │   └── sidebar.tsx          # Collapsible Sidebar component
│   ├── header.tsx               # Top navigation header with stats and controls
│   ├── signature-form.tsx       # Sidebar form with accordions & import/export/reset
│   └── template-card.tsx        # Template card with Gmail window simulator & VSCode viewer
├── lib/
│   ├── templates/
│   │   ├── index.ts             # Render engine for all 10 HTML templates
│   │   └── types.ts             # TypeScript interfaces (SignatureProfile, SignatureTemplate)
│   └── utils.ts                 # HTML Clipboard copy utility & DOM selection fallback
└── README.md
```

---

## 💻 Getting Started & Local Development

### Prerequisites
- Node.js 18+ or [Bun](https://bun.sh/) (Recommended)

### 1. Clone the repository
```bash
git clone https://github.com/CarlosDiaz-Improving/signaturecraft.git
cd signaturecraft
```

### 2. Install dependencies
```bash
bun install
# or via npm:
# npm install
```

### 3. Run the development server
```bash
bun dev
# or via npm:
# npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for production
```bash
bun run build
# or via npm:
# npm run build
```

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
