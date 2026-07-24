## ADDED Requirements

### Requirement: Release v1.0.0 Versioning and In-App Changelog
The system SHALL display the `v1.0.0` version number in the header and provide an accessible Changelog modal displaying release notes.

#### Scenario: User clicks Version badge in header
- **WHEN** user clicks the `v1.0.0` release badge in the top navigation bar
- **THEN** the system opens a Changelog modal summarizing all key release features and version history

### Requirement: GitHub Repository Publication via GH CLI
The codebase SHALL be initialized as a Git repository and published to GitHub using the `gh` CLI.

#### Scenario: Developer publishes release
- **WHEN** release command is executed via `gh` CLI
- **THEN** the local repository is published and pushed to GitHub
