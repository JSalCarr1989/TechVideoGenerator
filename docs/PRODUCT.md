Tech Video Generator — Product Definition

1. Product vision

Tech Video Generator is a local Windows application for creating technical diagrams, explanatory animations, and visual resources for technology documentaries.

Its primary purpose is to help creators explain complex technical concepts through clear, attractive, editable visual compositions.

The application complements external video editors such as DaVinci Resolve, Filmora, and CapCut.

It does not replace the external editor or attempt to produce an entire documentary.

2. Target workflow

The typical workflow is:

1. Create or open a project.
2. Describe a technical concept or import narration.
3. Create a storyboard organized into scenes.
4. Edit scenes using a visual editor.
5. Preview the compositions and animations.
6. Render individual scenes, segments, or complete sequences.
7. Import the exported videos into an external video editor.

The external editor remains responsible for final editing, narration, music, subtitles, stock footage, color correction, and final documentary export.

3. Product principles

- Local-first: projects and resources are stored locally.
- Portable projects: project folders contain the resources needed to move or back up a project.
- Reusable assets: a local library stores reusable visual components.
- Editable output: generated scenes must remain editable inside the application.
- AI-assisted, not AI-dependent: AI helps create and modify scenes but does not control the entire application.
- Interchangeable AI providers: changing providers must not require rebuilding the product.
- Cost control: paid AI services require user authorization.
- Resource awareness: rendering and AI operations must be controllable and cancellable.
- Incremental development: implement a working MVP before advanced capabilities.

4. Scene creation

The product supports two creation modes.

4.1 Create from scratch

The user describes a concept.

AI may suggest a storyboard, visual structure, and scene composition.

The user can review and edit the proposal before generating the scene.

4.2 Create from narration

The user imports one complete audio file or multiple independent audio files.

The application can suggest narrative segments and scene boundaries.

The user can review, adjust, add, remove, and reorganize segments before rendering.

Narration is imported. Voice generation is not part of the initial product scope.

5. Visual editor

The editor provides a canvas-based workflow.

Supported visual elements include:

- Text and labels.
- Shapes and backgrounds.
- Icons and images.
- Arrows and connectors.
- Nodes and technical components.
- Charts and diagrams.
- Reusable groups and compositions.

Users can select individual or multiple elements, group them, move them, resize them, and modify their properties.

Scenes can be static or animated.

The editor should remain approachable and should not become a full professional video timeline editor.

AI can propose and modify visual elements, but manual editing must not require AI tokens.

Small reversible AI changes may be applied automatically. Significant changes require user approval.

6. Visual identity

Each project can define a global visual identity.

Individual segments and scenes may override selected style properties.

Users can update the global style and choose which scenes should receive those changes.

7. Audio and narration

Future capabilities include:

- Importing complete narration or multiple audio files.
- Transcription in Spanish and English.
- Automatic narrative segmentation.
- Editable timestamps and scene boundaries.
- Waveform visualization synchronized with scene selection.
- Playback and manual timing adjustments.
- AI-assisted suggestions for scene duration.
- Rendering complete videos or individual segments.
- Regenerating a segment without rendering everything again.

Exported video has no audio by default. Audio inclusion is optional.

8. Export

The product targets compatibility with standard video editors.

Primary output:

- MP4.
- H.264.
- 1920x1080 horizontal.
- 1080x1920 vertical.
- 30 FPS by default.

Export should support individual scenes and larger sequences.

Future capabilities include:

- ProRes 4444 with transparency.
- PNG image sequences with alpha.
- Batch rendering.
- Advanced codec and bitrate settings.
- Additional export profiles.

Horizontal-to-vertical adaptation should reorganize composition elements instead of merely cropping the center.

9. AI capabilities

AI is used to:

- Interpret user descriptions.
- Suggest storyboards.
- Propose scene structures.
- Suggest visual components.
- Modify selected elements.
- Analyze narration and suggest narrative segmentation.

AI produces structured scene data that the application interprets.

AI is not responsible for rendering the final video.

The architecture must support interchangeable providers, local credential management, usage tracking, and cost controls.

The application must never assume that a subscription to a third-party AI product automatically provides general API access.

10. Local asset library

The library stores reusable resources such as:

- Icons.
- Shapes.
- Technical nodes.
- Connections.
- Diagrams.
- Animations.
- Sequences.
- Templates.
- Styles.
- Compositions.

Users can import, export, modify, and reuse library resources.

11. MVP scope

The first MVP must establish a working manual creation and rendering workflow.

Initial capabilities:

1. Create and save local projects.
2. Open existing projects.
3. Display a visual canvas.
4. Add and edit basic visual elements.
5. Select, move, resize, and group elements.
6. Create basic diagrams and connections.
7. Add simple animations and transitions.
8. Preview compositions.
9. Render MP4 H.264.
10. Support horizontal and vertical compositions.

The first validation scenario is a technical diagram showing an API communicating with a database, including an animated connection.

The user must be able to edit it, save it, reopen it, preview it, and export it.

AI integration should follow after the manual creation and rendering workflow is functional.

12. Future scope

The following capabilities are part of the product vision but should not delay the initial MVP:

- AI storyboard generation.
- AI-assisted scene editing.
- Narration transcription and segmentation.
- Advanced audio synchronization.
- Advanced reusable asset library.
- Multiple AI providers.
- Cost management dashboards.
- Transparent video export.
- Batch rendering.
- Advanced export profiles.
- Intelligent composition adaptation.

13. Explicit exclusions

The application is not intended to:

- Replace professional video editors.
- Produce complete documentaries automatically.
- Generate narration or voice acting in the initial version.
- Automatically research technical information on the Internet.
- Automatically validate the technical accuracy of documentary content.
- Analyze reference videos.
- Require cloud storage or a subscription.
- Require a powerful GPU to operate.

Technical correctness remains the user's responsibility.

Optional scene documentation may contain explanations, narration notes, manually supplied sources, and observations.