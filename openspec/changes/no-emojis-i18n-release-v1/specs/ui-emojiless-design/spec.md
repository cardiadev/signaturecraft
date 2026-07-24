## ADDED Requirements

### Requirement: Emoji-Free UI Components
The application UI SHALL NOT contain any emoji characters or flag emoji icons (`🇲🇽`, `🇺🇸`, `✉️`, `✨`, `📥`, `📤`). All icons MUST be rendered using SVG Lucide icons or clean typography badges.

#### Scenario: User views header and sidebar buttons
- **WHEN** user inspects the header, sidebar, or template cards
- **THEN** all controls display Lucide SVG icons or clean text tags without any emoji characters

### Requirement: Clean Text Language Badges
Language toggle buttons SHALL display clean text tags (e.g. `ES` / `EN` or `Spanish` / `English`) without flag emojis.

#### Scenario: User toggles language
- **WHEN** user views or toggles the language switchers
- **THEN** the buttons present clean text badges (`ES` / `EN`) without flag emojis
