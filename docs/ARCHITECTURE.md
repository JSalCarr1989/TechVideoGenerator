Tech Video Generator — Architecture

1. Architectural goals

- Run locally on Windows.
- Keep projects and resources under user control.
- Separate the visual editor from the rendering engine.
- Keep scene data independent of UI implementation.
- Support interchangeable AI providers.
- Avoid unnecessary services and infrastructure.
- Allow future capabilities without overengineering the MVP.

2. Initial technology stack

Layer| Technology
Frontend| React
Language| TypeScript
Frontend tooling| Vite
Visual rendering| Remotion
Video encoding| FFmpeg through Remotion rendering
Backend| ASP.NET Core / C#
Persistence| Local project files and local database when needed
AI integration| Provider abstraction in the backend

Use stable versions compatible with the selected Remotion release.

3. High-level architecture

The application consists of three main parts:

Frontend

React and TypeScript provide:

- Main application interface.
- Project navigation.
- Scene editor.
- Visual canvas.
- Properties and editing controls.
- Asset library interface.
- Remotion Player preview.

Vite provides the frontend development server and production build tooling.

Backend

ASP.NET Core provides:

- Local application API.
- Project management.
- Local configuration.
- AI provider integration.
- Credential management.
- Cost and usage tracking.
- Rendering job management.
- Communication with the rendering process.

API credentials must never be exposed to browser code.

Renderer

Remotion provides:

- Scene compositions.
- Animation logic.
- Preview-compatible compositions.
- Video rendering.

The renderer consumes structured scene data and converts it into visual output.

FFmpeg is used through the Remotion rendering pipeline.

4. Scene data model

The scene model must be independent of the React editor and rendering implementation.

It should represent:

- Project metadata.
- Scene metadata.
- Canvas dimensions and orientation.
- Visual elements.
- Element properties and positions.
- Connections.
- Groups.
- Animation definitions.
- Style information.
- Optional narration timing and documentation.

The frontend edits the scene model.

The renderer interprets the same model to produce the composition.

AI providers generate or modify structured scene data instead of generating video directly.

The exact schema should be defined through an OpenSpec change before implementation.

5. Project storage

Each project must be portable.

A project folder should contain:

- Project metadata.
- Scene definitions.
- Local assets.
- Project-specific settings.
- Required supporting resources.

Projects and the asset library must be stored outside the application source directory.

Their storage location should be configurable.

Application updates must not overwrite user projects or library resources.

6. Asset library

The asset library is local and reusable.

It should support importing, exporting, and modifying assets.

Asset types may include icons, shapes, diagrams, nodes, connectors, animations, templates, styles, and compositions.

The initial implementation should avoid introducing a complex asset-management system before basic project and scene workflows work.

7. AI provider architecture

AI integrations must be isolated behind provider abstractions.

The application should not depend on one specific provider.

Responsibilities include:

- Provider configuration.
- Credential management.
- Model selection.
- Usage tracking.
- Cost estimation where available.
- Error handling.
- Provider availability and limits.

Provider credentials are managed by the local backend.

Free providers may be used when available and configured.

Paid provider usage requires explicit user authorization.

OpenCode Go may be considered as an optional integration only if its API and usage terms support the intended use. Do not assume its subscription provides general-purpose API access.

8. Rendering architecture

Rendering should run locally.

The backend manages rendering jobs and communicates with the renderer.

Requirements:

- Preview before export.
- Individual scene rendering.
- Segment rendering.
- Complete sequence rendering.
- Cancellation.
- Controlled concurrency.
- Configurable resolution and FPS.
- Clear error reporting.

The MVP should prioritize reliable MP4 H.264 output.

Transparency and advanced export formats are future capabilities.

9. Resource management

The application should work without a powerful GPU.

GPU acceleration may be optional.

Rendering concurrency must be controlled to avoid exhausting system resources.

Long-running operations should provide progress and cancellation where technically possible.

10. Initial repository structure

TechVideoGenerator/
├── AGENTS.md
├── README.md
├── openspec/
│   ├── config.yaml
│   ├── specs/
│   └── changes/
│       └── archive/
├── docs/
│   ├── PRODUCT.md
│   └── ARCHITECTURE.md
└── src/
    ├── web/
    ├── api/
    └── renderer/

The exact project structure and responsibilities should be validated during the initial implementation proposal.

11. Architectural constraints

- Do not introduce microservices for the MVP.
- Do not create unnecessary abstractions.
- Keep the backend and renderer integration straightforward.
- Keep the scene model independent from the editor.
- Keep AI provider integrations replaceable.
- Keep user data outside application deployment directories.
- Prefer local processing whenever practical.
- Do not introduce cloud infrastructure as a requirement.

12. Evolution

The architecture may evolve as actual requirements emerge.

Significant changes must be documented through OpenSpec.

Do not implement speculative infrastructure solely to anticipate possible future features.