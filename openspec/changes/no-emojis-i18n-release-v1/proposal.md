## Why

The application currently has emojis and flag icons in the UI that degrade visual professionalism and convey an AI-generated look. Furthermore, internationalization (i18n) needs to be formally integrated across all UI components, followed by an official v1.0.0 release with an integrated changelog modal/view, and automated publication to GitHub via `gh` CLI.

## What Changes

- Remove all emojis, flag icons (`🇲🇽`, `🇺🇸`), and decorative symbols (`✨`, `📥`, `📤`) across the entire application UI and codebase, replacing them with crisp SVG Lucide icons and clean typography.
- Implement an explicit i18n dictionary system (`lib/i18n/`) supporting dynamic English (`en`) and Spanish (`es`) locale toggling across all UI strings.
- Add an in-app Changelog modal and `CHANGELOG.md` file documenting the official `v1.0.0` release.
- Publish the project repository to GitHub using `gh` CLI.

## Capabilities

### New Capabilities
- `ui-emojiless-design`: Elimination of all emojis and flag icons in favor of Lucide icons and clean typography.
- `app-i18n`: Full internationalization translation system supporting English and Spanish.
- `release-v1`: Release v1.0.0 versioning, in-app changelog display, and GitHub repository publishing.

### Modified Capabilities

## Impact

- Affected files: `components/header.tsx`, `components/signature-form.tsx`, `components/template-card.tsx`, `components/code-modal.tsx`, `app/page.tsx`, `lib/templates/index.ts`, `README.md`.
- Added files: `lib/i18n/index.ts`, `components/changelog-modal.tsx`, `CHANGELOG.md`.
- GitHub repository deployment via `gh` CLI.
