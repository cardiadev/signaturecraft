## 1. Header & Footer Layout Refactoring

- [x] 1.1 Update `components/header.tsx` to be widescreen fluid (`w-full px-4 sm:px-6 lg:px-8`), keeping ONLY the top i18n language selector (`EN` / `ES`) and "My Profile" toggle.
- [x] 1.2 Update `app/page.tsx` footer to contain the clickable `v1.0.0` version link triggering `ChangelogModal`.

## 2. Complete 100% i18n Audit

- [x] 2.1 Expand `lib/i18n/index.ts` dictionary with all missing UI strings (modal text, filter empty states, toasts, placeholders).
- [x] 2.2 Update `components/signature-form.tsx`, `components/template-card.tsx`, `components/code-modal.tsx`, `components/changelog-modal.tsx`, and `app/page.tsx` to consume i18n.

## 3. Mobile Viewport Full Screen Sidebar

- [x] 3.1 Update mobile sidebar styles in `components/ui/sidebar.tsx` or `signature-form.tsx` drawer container so it expands to 100% width and 100% height (`w-full h-full inset-0 z-50`) on mobile screens.

## 4. Build & Verification

- [x] 4.1 Run production build (`bun run build`) to ensure 0 TypeScript / Turbopack errors.
