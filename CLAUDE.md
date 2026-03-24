# CLAUDE.md - AI Assistant Guide

## Project Overview

This is the **Emna Visa Services** (شركة آمنة فيزا سيرفيس) repository — a web application for an international employment services company based in Tunisia that facilitates job placements abroad (primarily Romania).

The project is in early stages. The codebase currently contains a single React component replicated across multiple files.

## Repository Structure

```
.
├── CLAUDE.md                        # This file
├── README.md                        # React component (WorkerList) — misnamed, contains JSX code
├── med                              # React component (WorkerList) — duplicate, no file extension
└── .github/
    └── workflows/
        └── blank.yml                # React component (WorkerList) — misplaced, not a valid workflow
```

### Known Issues

- **README.md** contains a React JSX component instead of project documentation.
- **.github/workflows/blank.yml** contains the same React component instead of a valid GitHub Actions workflow YAML file.
- **med** is a duplicate file with no extension — purpose unclear.
- All three files are identical copies of the same `WorkerList` React component.

## Tech Stack

- **React** (with hooks: `useState`, `useEffect`)
- **shadcn/ui** components (`Card`, `CardContent`, `Button`, `Input`, `Textarea`)
- **lucide-react** for icons (`Search`)
- **Tailwind CSS** for styling (utility classes throughout)
- Path aliases configured (`@/components/ui/*`)

## Key Component: WorkerList

The main (and only) component exports a `WorkerList` that includes:

1. **Company info section** — name, description, address, social media links
2. **Job categories** — 8 categories in Arabic (construction, cleaning, childcare, eldercare, carpentry, plumbing, mechanics, restaurants)
3. **Notifications** — status messages for the visa/employment application pipeline
4. **Worker search** — filterable worker list with name, skill, and location
5. **Contact form** — name, email, message fields (UI only, no submission logic)

## Content Language

- UI labels and section headers: **mixed English and Arabic**
- Company data, job categories, notifications: **Arabic**
- Worker data: **English**

## Development Conventions

- Components use **function declarations** with `export default`
- State management via **React hooks** (no external state library)
- Styling uses **Tailwind CSS utility classes** directly in JSX
- UI primitives from **shadcn/ui** (imported from `@/components/ui/`)
- Data is **hardcoded inline** (no API calls or external data sources yet)

## AI Assistant Guidelines

- When restructuring this repo, prioritize moving the React component to a proper `.jsx` or `.tsx` file path (e.g., `src/components/WorkerList.jsx`).
- The README.md should be replaced with actual project documentation.
- The blank.yml workflow file needs to be either removed or replaced with a valid GitHub Actions workflow.
- Preserve all Arabic content exactly as-is when making changes.
- Any new components should follow the existing pattern: functional components, Tailwind CSS, shadcn/ui primitives.
