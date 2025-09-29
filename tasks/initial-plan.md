# OpenStartup Project Specification

## Project Overview

OpenStartup is a web application that showcases a curated list of startups with detailed information. The project follows atomic design principles and provides a clean, accessible interface with multi-language support.

## Technical Requirements

### Platform & Deployment
- **Hosting**: GitHub Pages
- **Framework**: Static site (HTML/CSS/JS or React/Next.js static export)
- **Build Tool**: Vite or Create React App (if using React)
- **Domain**: Custom domain through GitHub Pages

### Design System
- **Architecture**: Atomic Design methodology
  - Atoms: Buttons, inputs, icons, typography
  - Molecules: Cards, navigation items, search bars
  - Organisms: Header, startup grid, footer
  - Templates: Page layouts
  - Pages: Main page, startup detail page
- **Themes**: Light and dark mode support
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliance

### Internationalization
- **Languages**: English (default), Portuguese, Spanish
- **Implementation**: i18n library or JSON-based translation files
- **Language Selection**: Persistent user preference

## Functional Requirements

### Core Features

#### 1. Main Page (Startup List)
- Display grid/list of startups
- Search functionality
- Filter by categories/tags
- Sorting options (name, date added, category)
- Pagination or infinite scroll
- Language switcher
- Theme toggle (light/dark)

#### 2. Startup Detail Page
- Comprehensive startup information
- Navigation back to main page
- Social sharing capabilities
- Related startups section

#### 3. Data Management
- JSON-based data storage
- Schema validation for startup data
- Easy content management workflow

### User Stories

1. **As a visitor**, I want to see a list of startups so I can discover new companies
2. **As a visitor**, I want to search for specific startups so I can find relevant companies quickly
3. **As a visitor**, I want to view detailed information about a startup so I can learn more about their business
4. **As a visitor**, I want to switch between languages so I can read content in my preferred language
5. **As a visitor**, I want to toggle between light and dark modes so I can use the app comfortably
6. **As a mobile user**, I want the site to work well on my device so I can browse startups on the go

## Data Schema

### Startup JSON Structure
```json
{
  "id": "string (unique identifier)",
  "name": {
    "en": "string",
    "pt": "string", 
    "es": "string"
  },
  "description": {
    "en": "string",
    "pt": "string",
    "es": "string"
  },
  "shortDescription": {
    "en": "string",
    "pt": "string",
    "es": "string"
  },
  "logo": "string (URL or path)",
  "website": "string (URL)",
  "founded": "string (YYYY)",
  "category": {
    "en": "string",
    "pt": "string",
    "es": "string"
  },
  "tags": {
    "en": ["string"],
    "pt": ["string"],
    "es": ["string"]
  },
  "location": "string",
  "employees": "string",
  "funding": "string",
  "revenue": "string (optional)",
  "socialMedia": {
    "twitter": "string (optional)",
    "linkedin": "string (optional)",
    "github": "string (optional)"
  },
  "metrics": {
    "users": "string (optional)",
    "revenue": "string (optional)",
    "growth": "string (optional)"
  },
  "contact": {
    "email": "string (optional)",
    "phone": "string (optional)"
  },
  "lastUpdated": "string (ISO date)"
}
```

## File Structure

```
openstartup/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── data/
│       └── startups.json
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Icon/
│   │   │   └── Typography/
│   │   ├── molecules/
│   │   │   ├── StartupCard/
│   │   │   ├── SearchBar/
│   │   │   └── Navigation/
│   │   ├── organisms/
│   │   │   ├── Header/
│   │   │   ├── StartupGrid/
│   │   │   └── Footer/
│   │   └── templates/
│   │       ├── MainLayout/
│   │       └── StartupLayout/
│   ├── pages/
│   │   ├── MainPage/
│   │   └── StartupPage/
│   ├── hooks/
│   │   ├── useTheme.js
│   │   ├── useLanguage.js
│   │   └── useStartups.js
│   ├── utils/
│   │   ├── i18n.js
│   │   ├── theme.js
│   │   └── data.js
│   ├── styles/
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── components/
│   └── translations/
│       ├── en.json
│       ├── pt.json
│       └── es.json
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── cypress/
│   ├── fixtures/
│   ├── integration/
│   └── support/
├── .eslintrc.js
├── .prettierrc
├── jest.config.js
├── cypress.config.js
├── package.json
└── README.md
```

## Quality Assurance

### Linting
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Stylelint**: CSS/SCSS linting
- **Pre-commit hooks**: Automated checks before commits

### Testing Strategy

#### Unit Tests (Jest)
- Component rendering tests
- Utility function tests
- Hook functionality tests
- Data validation tests
- Coverage target: 80%+

#### Integration Tests (Jest + Testing Library)
- User interaction flows
- API integration tests
- Theme switching tests
- Language switching tests

#### End-to-End Tests (Cypress)
- Complete user journeys
- Cross-browser testing
- Mobile responsive tests
- Performance testing

### Test Requirements
- All new features must include tests
- All tests must pass before merging
- Continuous Integration setup with GitHub Actions
- Automated deployment on test success

## Development Workflow

### Git Strategy
- **Main branch**: Production-ready code
- **Develop branch**: Integration branch
- **Feature branches**: Individual features
- **Pull Request**: Required for all changes

### Continuous Integration
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run linter
        run: npm run lint
      - name: Run unit tests
        run: npm run test:unit
      - name: Run e2e tests
        run: npm run test:e2e
      - name: Build
        run: npm run build
```

## Performance Requirements
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 90+ for all categories

## Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Requirements
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management
- Alternative text for images

## SEO Requirements
- Meta tags for each page
- Open Graph tags
- Twitter Card tags
- Structured data markup
- Sitemap generation
- Robots.txt

## Security Considerations
- Input validation and sanitization
- XSS protection
- Content Security Policy headers
- HTTPS enforcement
- No sensitive data exposure

## Future Enhancements
- Admin panel for content management
- User accounts and favorites
- Startup submission form
- Analytics and metrics dashboard
- Email notifications
- Advanced filtering options
- Startup comparison feature

## Definition of Done
- [ ] Feature implemented according to requirements
- [ ] Code reviewed and approved
- [ ] All linting rules pass
- [ ] Unit tests written and passing (80% coverage)
- [ ] Integration tests written and passing
- [ ] E2E tests written and passing
- [ ] Accessibility tested and compliant
- [ ] Mobile responsive verified
- [ ] Cross-browser testing completed
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] Product owner approval received
