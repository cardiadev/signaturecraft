## Context

The SignatureCraft application needs an ultra-professional, enterprise-grade aesthetic for portfolio showcase. Emojis and flag characters detract from this look. Additionally, the application requires full i18n localization, an in-app Changelog modal for the official `v1.0.0` release, and deployment to GitHub via `gh` CLI.

## Goals / Non-Goals

**Goals:**
- Eliminate all emojis and flag icons from components, headers, forms, toasts, and README, replacing them with Lucide icons or clean typography.
- Implement an explicit i18n dictionary system in `lib/i18n/` to drive all UI strings in English (`en`) and Spanish (`es`).
- Create `CHANGELOG.md` and an in-app `ChangelogModal` component triggered by clicking the version badge in `Header`.
- Publish the project repository to GitHub using `gh` CLI commands.

**Non-Goals:**
- Support for additional languages beyond English and Spanish for v1.0.0.

## Decisions

### 1. Lucide SVG Icons & Typography Badges Over Emojis
- **Decision**: Replace `🇲🇽` / `🇺🇸` flag emojis with clean text badges (`ES` / `EN`) or globe icons (`<Globe />`). Replace `✉️`, `✨`, `📥`, `📤` with `<Mail />`, `<Sparkles />`, `<Download />`, `<Upload />`.
- **Rationale**: Elevates visual professionalism and eliminates "AI-generated" aesthetics.

### 2. Centralized Dictionary i18n Architecture (`lib/i18n/`)
- **Decision**: Create `lib/i18n/index.ts` export dictionaries for `en` and `es` containing UI strings for navigation, headers, forms, filter buttons, modals, and toasts.
- **Rationale**: Keeps translation keys type-safe and consistent without requiring heavyweight external dependencies.

### 3. Release v1.0.0 & Changelog Modal
- **Decision**: Create `CHANGELOG.md` at root and `components/changelog-modal.tsx`. Make the `v1.0.0` badge in `Header` clickable to open the modal.
- **Rationale**: Gives users and reviewers immediate visibility into release history and project maturity.

### 4. GitHub Deployment via GH CLI
- **Decision**: Use `git init`, `git add`, `git commit`, `gh repo create` to push to GitHub.

## Risks / Trade-offs

- [Risk] Missing untranslated hardcoded UI strings → Mitigation: Audit every component (`header.tsx`, `signature-form.tsx`, `template-card.tsx`, `code-modal.tsx`, `app/page.tsx`).
