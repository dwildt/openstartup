# GitHub Copilot Instructions for OpenStartup

## Project Overview

OpenStartup is a modern, responsive web application showcasing innovative startups with detailed information and insights. The project uses React with atomic design principles and features internationalization support for English, Portuguese, and Spanish.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables (no CSS-in-JS or styled-components)
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier

## Architecture & Design Patterns

### Atomic Design

Follow the atomic design pattern strictly:

- **atoms/**: Basic building blocks (Button, Input, Typography)
- **molecules/**: Simple components composed of atoms (SearchBar, StartupCard)
- **organisms/**: Complex components (Header, StartupGrid)
- **templates/**: Page layouts
- **pages/**: Route components

### Component Structure

Each component should be in its own directory with:

```
ComponentName/
├── ComponentName.jsx       # Component implementation
├── ComponentName.css       # Component styles
└── ComponentName.test.jsx  # Component tests
```

### Naming Conventions

- **Components**: PascalCase (e.g., `StartupCard.jsx`)
- **Files**: Match component name
- **CSS classes**: kebab-case with component prefix (e.g., `.startup-card`, `.startup-card__title`)
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Internationalization (i18n)

All user-facing text MUST support three languages:

- English (en) - Primary language
- Portuguese (pt)
- Spanish (es)

### Translation Files

- Located in `src/translations/`
- Structure: `{ en: {...}, pt: {...}, es: {...} }`
- Use the `useTranslation` hook from react-i18next

### Example

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t('components.myComponent.title')}</h1>;
}
```

## Styling Guidelines

### CSS Variables

Use CSS variables defined in `src/styles/variables.css`:

- Colors: `--color-primary`, `--color-background`, etc.
- Spacing: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, etc.
- Typography: `--font-family-primary`, `--font-size-base`, etc.

### Theme Support

The app supports light and dark themes:

- Use semantic color variables (e.g., `--color-background`, `--color-text`)
- Avoid hardcoded colors
- Test components in both themes

### Responsive Design

Follow mobile-first approach:

- Base styles for mobile (< 768px)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`

## Code Quality Standards

### ESLint Rules

- No unused variables (warnings allowed)
- No console statements (warnings allowed)
- React prop-types disabled (using JSDoc for type hints)
- Follow react-hooks rules

### Prettier Configuration

- Semi-colons: Yes
- Single quotes: Yes
- Print width: 80 characters
- Tab width: 2 spaces
- Trailing commas: ES5
- Arrow parens: avoid

### Testing

- Write tests for all new components
- Use React Testing Library
- Target 80%+ code coverage
- Test user interactions, not implementation details

Example test pattern:

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Startup Data Management

### Data Structure

Startups are stored as individual JSON files in `public/data/startups/`:

- One file per startup: `{startup-slug}.json`
- Registered in `src/utils/data.js` in the `STARTUP_SLUGS` array

### Required Fields

- `id`: Unique identifier (lowercase with hyphens)
- `name`: Object with en, pt, es translations
- `description`: Object with en, pt, es translations
- `shortDescription`: Object with en, pt, es translations
- `category`: Object with en, pt, es translations
- `tags`: Object with arrays for en, pt, es (max 4 tags each)

### Optional Fields

- `logo`, `website`, `founded`, `location`, `employees`, `funding`, `revenue`
- `socialMedia`: { twitter, linkedin }
- `metrics`: { users, revenue, growth }
- `contact`: { email, phone }

## Common Patterns

### Routing

Use React Router v6 with basename for GitHub Pages:

```jsx
<BrowserRouter basename="/openstartup">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/startup/:id" element={<StartupDetail />} />
  </Routes>
</BrowserRouter>
```

### Custom Hooks

Located in `src/hooks/`:

- `useTheme`: Theme management (light/dark)
- `useLanguage`: Language preference management

### Context Usage

Located in `src/utils/`:

- `ThemeContext`: Theme state and toggle
- Import from `src/utils/ThemeContext.js`

## File Organization

```
src/
├── components/
│   ├── atoms/          # Basic UI elements
│   ├── molecules/      # Composed components
│   └── organisms/      # Complex sections
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utilities and contexts
├── styles/             # Global styles
└── translations/       # i18n files
```

## Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Reuse atoms and molecules** - Build from bottom up
3. **Always add translations** - Never hardcode user-facing strings
4. **Use semantic HTML** - For accessibility (a11y)
5. **Mobile-first CSS** - Start with mobile, enhance for desktop
6. **Write tests** - For all new components and features
7. **Follow existing patterns** - Check similar components for consistency
8. **Document complex logic** - Add JSDoc comments where needed
9. **Avoid inline styles** - Use CSS classes and variables
10. **Optimize images** - Prefer SVG for logos, optimize PNGs/JPGs

## Development Workflow

1. Run `npm run dev` - Start development server
2. Run `npm run lint` - Check code quality
3. Run `npm run test` - Run unit tests
4. Run `npm run build` - Build for production
5. Run `npm run format` - Format code with Prettier

## Deployment

- Production: GitHub Pages at `https://dwildt.github.io/openstartup/`
- Base path: `/openstartup/`
- Deploy with: `npm run deploy`

## Accessibility

- Use semantic HTML elements
- Add `alt` attributes to images
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG 2.1 AA)
- Use ARIA labels where needed

## Performance

- Lazy load routes with React.lazy()
- Optimize images (use appropriate formats)
- Minimize bundle size
- Use React.memo() for expensive components sparingly

## Questions or Clarifications

When generating code:

1. Follow atomic design structure strictly
2. Always include all three language translations
3. Use existing CSS variables and patterns
4. Write corresponding tests
5. Keep accessibility in mind
6. Follow the project's ESLint and Prettier configuration
