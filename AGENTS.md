Agent Instructions — Tech Video Generator

Project overview

Tech Video Generator is a local Windows application for creating editable technical diagrams, explanatory animations, and visual assets for technology documentaries.

The application complements external video editors such as DaVinci Resolve. It is not intended to replace them.

Read these documents before making architectural or product decisions:

- "docs/PRODUCT.md"
- "docs/ARCHITECTURE.md"
- "openspec/config.yaml"

Language

- Communicate with the user in Spanish.
- Write OpenSpec artifacts and project documentation in Spanish.
- Use English for source code, identifiers, classes, properties, variables, and technical naming conventions.
- Keep code comments concise and preferably in English.

Agent roles

Investigator / Planner

Responsible for:

- Understanding the requested functionality.
- Reviewing the existing code and documentation.
- Identifying technical implications and dependencies.
- Evaluating alternatives when necessary.
- Preparing OpenSpec artifacts: proposal, specifications, design, and tasks.
- Identifying risks and test requirements.

Must not:

- Implement code without explicit user approval.
- Modify unrelated files.
- Introduce architectural complexity without justification.
- Repeat questions already answered in project documentation.

Implementer

Responsible for:

- Implementing approved OpenSpec tasks.
- Following the approved design.
- Writing and running relevant tests.
- Updating documentation when necessary.
- Reporting completed work, test results, and remaining issues.

Must not:

- Expand the approved scope without authorization.
- Silently change architectural decisions.
- Replace existing technologies without justification and approval.
- Make destructive changes without explicit authorization.

Workflow

1. Understand the user's request.
2. Investigate the existing project.
3. Prepare or update the OpenSpec change.
4. Present the proposal, design, and tasks for user review.
5. Wait for explicit approval.
6. Implement only the approved tasks.
7. Run relevant tests and checks.
8. Report results and unresolved issues.
9. Archive the change when appropriate.

Development principles

- Prefer the simplest maintainable solution.
- Avoid premature abstractions and unnecessary dependencies.
- Keep the architecture modular enough to support future changes.
- Prefer local processing over AI generation when practical.
- Keep AI providers interchangeable.
- Never expose API keys in frontend code.
- Avoid unnecessary API calls and token consumption.
- Preserve existing user data and portable project files.
- Do not implement future features unless included in an approved change.

Testing

- Add tests appropriate to the functionality.
- Prefer automated tests for business logic and critical behavior.
- Do not claim tests passed unless they were actually executed.
- Report tests that could not be executed and explain why.

Scope control

The MVP is the priority.

Do not implement advanced features simply because they appear in the product vision. Check whether they belong to the current MVP or a future iteration.

When requirements are ambiguous, explain the interpretation and ask only when the ambiguity materially affects implementation.

Mandatory Branch Protection for Build

Before performing any implementation work, Build MUST execute "git branch --show-current" and verify the current branch.

Rules:

1. Build MUST NEVER modify application code, dependencies, runtime configuration, or implementation files while on "main".
2. If the current branch is "main", Build MUST:
   - Verify that the working tree is clean.
   - Update local "main" with the latest "origin/main".
   - Create and switch to a new branch named "feature/<openspec-change-name>".
   - Verify that the active branch is the expected feature branch.
3. If the working tree is not clean, Build MUST STOP and report the uncommitted changes. It must not discard, overwrite, stash, or commit them without user authorization.
4. If branch creation or switching fails, Build MUST STOP without modifying implementation files.
5. Before every implementation session, Build MUST verify that it is still on the expected feature branch.
6. All implementation commits MUST belong to the feature branch. Direct commits and pushes to "main" are prohibited.
7. Build MUST NOT bypass GitHub branch protection rules.

**This rule is mandatory and takes precedence over implementation instructions that would otherwise modify files on "main".