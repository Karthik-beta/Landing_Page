# Project: Pivotr Landing Page

## Project Overview

This is a modern, responsive landing page for Pivotr, built with React, TypeScript, and Tailwind CSS. It leverages the shadcn/ui component library for a clean and consistent look and feel. The project is set up with Vite for a fast development experience and optimized builds. The codebase is well-structured, with a focus on performance, utilizing techniques like code splitting, lazy loading, and asset compression.

**Key Technologies:**

*   **Framework:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **Build Tool:** Vite
*   **Linting:** ESLint
*   **Package Manager:** pnpm

## Building and Running

### Development

To run the project in development mode:

```bash
pnpm install
pnpm dev
```

This will start a development server on `http://localhost:5173`.

### Production Build

To build the project for production:

```bash
pnpm build
```

This will create an optimized build in the `dist` directory.

### Linting

To lint the codebase:

```bash
pnpm lint
```

### Preview Production Build

To preview the production build locally:

```bash
pnpm preview
```

## Development Conventions

*   **Component-Based Architecture:** The project follows a component-based architecture, with components located in the `src/components` directory.
*   **Styling:** Tailwind CSS is used for styling. Utility classes are preferred over custom CSS.
*   **UI Components:** The shadcn/ui component library is used for UI components. These components are located in the `src/components/ui` directory.
*   **Performance:** The project is optimized for performance. Components are lazy-loaded using `React.lazy` and `Suspense`. The Vite configuration is tuned for optimal chunking and compression.
*   **Path Aliases:** The project uses path aliases to simplify imports. The `@` alias is configured to point to the `src` directory.
*   **Coding Style:** The project uses ESLint to enforce a consistent coding style.
