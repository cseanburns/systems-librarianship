# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the mdBook source markdown; `src/SUMMARY.md` defines navigation.
- `src/images/` holds images referenced by chapters.
- `book/` is generated HTML output from mdBook; avoid manual edits.
- `notes/` holds supplemental working notes and references that are not built into the book.

## Build, Test, and Development Commands
- `mdbook build .` builds the book into `book/`.
- `make build` runs the same build via the Makefile.
- `make create` runs build + `git add .` + commit + push; use only if you intend to publish.
- `make commit` and `make push` mirror the Makefile defaults.

## Coding Style & Naming Conventions
- Write in Markdown; keep one top-level heading per chapter.
- Follow the existing filename pattern: numeric prefix with letter (e.g., `1a-history-linux-unix.md`) and keep ordering aligned with `src/SUMMARY.md`.
- Use relative links within `src/` and place images under `src/images/`.
- No formal formatter is enforced; keep lines readable and avoid trailing whitespace.

## Testing Guidelines
- No automated tests are present.
- Validate changes by running `mdbook build .` and spot-checking output in `book/index.html`.

## Commit & Pull Request Guidelines
- Commit messages are short and descriptive (examples from history: `Rebuild mdbook`, `updated Makefile`).
- For content changes, include a brief summary and note if `book/` was regenerated.
- Keep pull requests focused; large reorganizations or new content should be discussed first per `README.md`.
