# Changelog

All notable changes to the **SignatureCraft** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-07-24

### Added
- **VSCode-Style Inline Code Viewer**: Replaced modal popups with inline collapsible VSCode code viewer featuring line numbers, HTML syntax highlighting (`#569cd6`, `#9cdcfe`, `#ce9178`), and integrated header controls (`Copy Raw` & `.HTML`).
- **WCAG 2.1 Color Contrast Engine**: Integrated automatic WCAG contrast calculation for Dark Mode and interactive UI warning banner with `Auto-Adjust Hue` button in Section 4 (*Style & Colors*).
- **Fluid Widescreen Layout**: Upgraded top navigation header and dashboard layout to 100% fluid widescreen (`w-full px-4 sm:px-6 lg:px-8`).
- **Decoupled i18n System**: Topnav language selector controls 100% of global app UI, while sidebar language selector controls signature profile defaults independently.
- **Full Viewport Mobile Sidebar**: Mobile sidebar expands to 100% viewport (`w-full h-full inset-0 z-50`).
- **Reset Data Option**: Added `Reset Data` button (`<RotateCcw />`) in sidebar for 1-click profile restoration.
- **Pure LocalStorage Persistence**: Transitioned to 100% client LocalStorage persistence for static deployment compatibility.

### Changed
- **Security & Privacy Sanitization**: Replaced personal profile data with generic `Alex Morgan` dummy data and sanitized Git commit history.

---

## [1.0.0] - 2026-07-24

### Added
- **10 Anti-Spam HTML Templates**: Executive Sleek, Corporate Classic, Clean & Minimal, Modern Split, Tech Specialist, Compact Badge, Bordered Accent, Serif Elegant, Creative Freelance, Developer Terminal.
- **Dual-Language i18n System**: Native English and Spanish support with dynamic UI localization and independent bilingual pronouns (`pronounsEs` & `pronounsEn`).
- **Rich Text Gmail Portapapeles Integration**: 1-Click copying using `ClipboardItem` API and DOM Selection fallback (`execCommand`) for direct visual pasting into Gmail Settings.
- **Hybrid Responsive Email Architecture**: Panorámico horizontal desktop view with automatic `@media` stacking on mobile screens (< 480px) preventing vertical phone number squishing.
- **JSON Backup & Import/Export**: Full profile configuration backup & restore via `.json` files.
- **Interactive UI Shortcuts**: Custom `<Kbd>` and `<KbdGroup>` toast notification shortcuts.
- **Changelog Modal**: Interactive version modal accessible directly from footer version trigger.

### Changed
- **Zero Emojis & Flags**: Replaced all emojis, flag icons, and decorative symbols with SVG Lucide icons and clean typography.
- **Portfolio-Ready Architecture**: 100% strict TypeScript types, Next.js 16 App Router, Turbopack, and Bun tooling.
