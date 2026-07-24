## ADDED Requirements

### Requirement: Centralized i18n Dictionary System
The application SHALL maintain a centralized i18n dictionary system in `lib/i18n/` providing structured English and Spanish translations for all user-facing interface text.

#### Scenario: Application switches locale
- **WHEN** user changes the active locale between English (`en`) and Spanish (`es`)
- **THEN** all UI labels, headings, buttons, toasts, and placeholders update dynamically to match the selected locale

### Requirement: Persistent Language Preference
The active UI language selection SHALL persist in `localStorage` and synchronize across components.

#### Scenario: User reloads application
- **WHEN** user reloads the page
- **THEN** the application restores the user's selected language preference
