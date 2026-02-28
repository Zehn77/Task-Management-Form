# Task Management Form

A task management form built with React 19 and TypeScript, supporting task creation with assignees, deadlines, topics, tags, routine scheduling, and dark/light mode.

## Prerequisites

- **Node.js** >= 22.0.0
- **pnpm** >= 9.0.0

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

## Available Scripts

| Script              | Description                                   |
| ------------------- | --------------------------------------------- |
| `pnpm dev`          | Start development server with HMR             |
| `pnpm build`        | Type-check and build for production           |
| `pnpm preview`      | Preview the production build locally          |
| `pnpm lint`         | Run ESLint                                    |
| `pnpm check-types`  | Run TypeScript type checking without emitting |
| `pnpm format:check` | Check code formatting with Prettier           |
| `pnpm format:fix`   | Auto-fix formatting with Prettier             |

## Tech Stack

### Core

| Package                                      | Version | Purpose                   |
| -------------------------------------------- | ------- | ------------------------- |
| [React](https://react.dev)                   | ^19.2.0 | UI library                |
| [TypeScript](https://www.typescriptlang.org) | ~5.9.3  | Type safety               |
| [Vite](https://vite.dev)                     | ^7.3.1  | Build tool and dev server |

### UI & Styling

| Package                                                   | Version  | Purpose                        |
| --------------------------------------------------------- | -------- | ------------------------------ |
| [Chakra UI](https://chakra-ui.com)                        | ^3.33.0  | Component library              |
| [@emotion/react](https://emotion.sh)                      | ^11.14.0 | CSS-in-JS (Chakra UI peer dep) |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4.6   | Dark/light mode                |
| [react-icons](https://react-icons.github.io/react-icons)  | ^5.5.0   | Icon library                   |
| [react-day-picker](https://daypicker.dev)                 | ^9.14.0  | Date picker                    |

### Form & Data

| Package                                        | Version  | Purpose                                  |
| ---------------------------------------------- | -------- | ---------------------------------------- |
| [React Hook Form](https://react-hook-form.com) | ^7.71.2  | Form state management and validation     |
| [TanStack Query](https://tanstack.com/query)   | ^5.90.21 | Async state management and data fetching |

### Dev Tools

| Package                                                                          | Purpose                   |
| -------------------------------------------------------------------------------- | ------------------------- |
| [ESLint](https://eslint.org) + [typescript-eslint](https://typescript-eslint.io) | Linting                   |
| [Prettier](https://prettier.io)                                                  | Code formatting           |
| [Husky](https://typicode.github.io/husky)                                        | Git pre-commit hooks      |
| [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)         | Path alias support (`@/`) |

## Project Structure

```
src/
├── api/
│   └── assignees.ts              # Assignee search API (mock data)
├── components/
│   ├── task-form/
│   │   ├── fields/
│   │   │   ├── RoutineTaskFields.tsx    # Routine task name, periodicity, description
│   │   │   ├── TaskAssigneeField.tsx    # Searchable assignee/team selector
│   │   │   ├── TaskContextField.tsx     # Task context textarea
│   │   │   ├── TaskDeadlineField.tsx    # Date picker for deadlines
│   │   │   ├── TaskFilesField.tsx       # File attachment field
│   │   │   ├── TaskOptions.tsx          # Routine & team toggle switches
│   │   │   ├── TaskTagsField.tsx        # Tag selector
│   │   │   └── TaskTopicField.tsx       # Topic selector
│   │   ├── layout/
│   │   │   ├── TaskFormHeader.tsx       # Form header with icon and title
│   │   │   └── TaskFormTabs.tsx         # Tab navigation
│   │   ├── types/
│   │   │   └── formTypes.ts             # TypeScript interfaces for form data
│   │   ├── index.tsx                    # Main TaskForm component
│   │   ├── TaskCreationContent.tsx      # Task creation tab
│   │   └── ReminderCreationContent.tsx  # Reminder creation tab
│   └── ui/
│       ├── color-mode.tsx               # Color mode toggle button
│       └── provider.tsx                 # Chakra UI provider wrapper
├── data/
│   ├── periodicity.ts            # Periodicity options (daily, weekly, etc.)
│   ├── tags.ts                   # Available tags
│   ├── topics.ts                 # Available topics
│   └── users.ts                  # Mock users and teams data
├── hooks/
│   ├── useClickOutside.ts        # Detects clicks outside an element
│   ├── useDebounce.ts            # Debounces a value for search inputs
│   └── useSearchAssignees.ts     # TanStack Query hook for assignee search
├── App.tsx
└── main.tsx
```

## Features

- **Task creation** with context, assignees, deadline, topics, tags, and file attachments
- **Routine tasks** — mark a task as recurring with a name, periodicity, and description
- **Team assignment** — assign tasks to individual users or entire teams
- **Searchable assignee picker** — debounced search powered by TanStack Query
- **Form validation** — powered by React Hook Form with character limits and required fields
- **Dark / light mode** — toggle via the button in the top-right corner
- **Tab navigation** — separate tabs for task creation and reminder creation
