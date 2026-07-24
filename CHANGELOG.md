# Changelog

All notable changes to the **SignatureCraft** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-24

### Added
- **10 Anti-Spam HTML Templates**: Executive Sleek, Corporate Classic, Clean & Minimal, Modern Split, Tech Specialist, Compact Badge, Bordered Accent, Serif Elegant, Creative Freelance, Developer Terminal.
- **Dual-Language i18n System**: Native English and Spanish support with dynamic UI localization and independent bilingual pronouns (`pronounsEs` & `pronounsEn`).
- **Rich Text Gmail Portapapeles Integration**: 1-Click copying using `ClipboardItem` API and DOM Selection fallback (`execCommand`) for direct visual pasting into Gmail Settings.
- **Hybrid Responsive Email Architecture**: Panorámico horizontal desktop view with automatic `@media` stacking on mobile screens (< 480px) preventing vertical phone number squishing.
- **Dual Persistence Architecture**: Automatic synchronization between browser `localStorage` and local server `data/profile.json`.
- **JSON Backup & Import/Export**: Full profile configuration backup & restore via `.json` files.
- **Interactive UI Shortcuts**: Custom `<Kbd>` and `<KbdGroup>` toast notification shortcuts.
- **Changelog Modal**: Interactive version modal accessible directly from the top navigation bar.

### Changed
- **Zero Emojis & Flags**: Replaced all emojis, flag icons, and decorative symbols with SVG Lucide icons and clean typography.
- **Portfolio-Ready Architecture**: 100% strict TypeScript types, Next.js 16 App Router, Turbopack, and Bun tooling.
