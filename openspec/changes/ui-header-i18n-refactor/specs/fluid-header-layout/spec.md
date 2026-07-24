## ADDED Requirements

### Requirement: Fluid Header Layout
The top navigation header bar SHALL span 100% of the viewport width without fixed `max-w-7xl` or `64rem` container bounds.

#### Scenario: User resizes browser window to widescreen
- **WHEN** user views the application on a widescreen display
- **THEN** the top header bar spans full width (`w-full px-4 sm:px-6 lg:px-8`) matching the viewport

### Requirement: Simplified Header Controls
The header bar SHALL ONLY contain the application title/subtitle, the top i18n language toggle (`EN` / `ES`), and the "My Profile" (`Mis Datos`) drawer toggle button.

#### Scenario: User inspects header actions
- **WHEN** user views the top right section of the header
- **THEN** only the language switcher (`EN` / `ES`) and the profile drawer toggle button are visible
