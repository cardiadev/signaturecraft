## Context

The user requested a cleaner, widescreen-adapted navigation bar, complete dynamic i18n coverage across all UI elements, relocating the version number and Changelog trigger to the footer, and ensuring the mobile sidebar expands to fill 100% of the mobile viewport.

## Goals / Non-Goals

**Goals:**
- Make top header fluid (`w-full px-4 sm:px-6 lg:px-8`) without `max-w-7xl` or `max-w-5xl` constraints.
- Simplify top header controls: keep ONLY the top i18n language selector (`EN` / `ES`) and the "My Profile" drawer toggle.
- Relocate `v1.0.0` version badge and Changelog modal trigger to the footer.
- Expand `lib/i18n/index.ts` to cover 100% of untranslated text strings across all components.
- Make mobile sidebar drawer fill 100% width and height on small viewports.

## Decisions

### 1. Fluid Widescreen Header Layout
- Replace `max-w-7xl mx-auto` in `components/header.tsx` and `max-w-5xl mx-auto` in `app/page.tsx` with full width flex containers `w-full px-4 sm:px-6 lg:px-8`.

### 2. Top Header Simplification
- Remove Export and Import buttons from the header. Keep them exclusively in the bottom sticky bar of `SignatureForm`.
- Place `<LanguageSelector />` pill (`EN` / `ES`) directly in the header next to the "My Profile" toggle button.

### 3. Footer Release & Changelog Trigger
- Render clickable `v1.0.0` version link in `footer` at the bottom of the page, opening `ChangelogModal`.

### 4. 100% Mobile Sidebar Full Screen Overlay
- Set `w-full h-full inset-0 z-50` for mobile sidebar drawer overlay.
