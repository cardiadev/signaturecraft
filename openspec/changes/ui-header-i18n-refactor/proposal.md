## Why

The header currently contains redundant controls (Export/Import buttons already present in the sidebar) and is constrained to a fixed 64rem container width instead of adapting fluidly to widescreen viewports. Additionally, the version badge needs to relocate to the footer, remaining static UI strings must be migrated to the centralized i18n dictionary, and the mobile sidebar needs to expand to fill 100% of the viewport when open.

## What Changes

- **Header Refactoring**: Simplify top navigation bar to contain ONLY the top i18n language selector (`EN` / `ES`) and the "My Profile" (`Mis Datos`) drawer toggle. Remove duplicate Export/Import buttons.
- **Widescreen Fluid Layout**: Remove `max-w-7xl` / `max-w-5xl` constraints from the header and main container so the navigation bar and workspace adapt fluidly to any screen width.
- **Footer Versioning**: Relocate `v1.0.0` version badge and clickable Changelog modal trigger to the bottom viewport footer ("SignatureCraft © 2026 • v1.0.0 • 100% Anti-Spam HTML Signatures...").
- **100% App-wide i18n Localization**: Audit and migrate all remaining hardcoded strings in components, modals, and toasts to the `lib/i18n/index.ts` dictionary system.
- **Full Viewport Mobile Sidebar**: Ensure the profile sidebar drawer occupies 100% of the viewport width and height when expanded on mobile devices.

## Capabilities

### New Capabilities
- `fluid-header-layout`: Fluid widescreen header layout with i18n selector and profile drawer toggle.
- `strict-app-i18n`: Comprehensive audit ensuring 100% of interface text is powered by the i18n dictionary.
- `mobile-full-viewport-sidebar`: Mobile sidebar expanding to fill 100% of the viewport width and height.

### Modified Capabilities

## Impact

- Affected files: `components/header.tsx`, `components/signature-form.tsx`, `components/template-card.tsx`, `components/code-modal.tsx`, `app/page.tsx`, `lib/i18n/index.ts`.
