## ADDED Requirements

### Requirement: Full Viewport Mobile Sidebar
On mobile devices (< 768px), when the sidebar drawer expands, it SHALL occupy 100% of the viewport width and height (`w-full h-full inset-0 z-50`).

#### Scenario: User opens sidebar on mobile device
- **WHEN** user clicks the "My Profile" button on a mobile viewport
- **THEN** the sidebar expands to fill 100% of the screen width and height
