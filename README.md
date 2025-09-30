# OpenStartup

A modern, responsive web application showcasing innovative startups with detailed information and insights. Built with React, following atomic design principles, and featuring internationalization support.

## 🚀 Features

- **Responsive Design**: Mobile-first approach that works on all devices
- **Atomic Design**: Clean, scalable component architecture
- **Internationalization**: Support for English, Portuguese, and Spanish
- **Dark/Light Theme**: Toggle between themes with persistent user preference
- **Search & Filter**: Find startups by name, description, or category
- **Detailed Views**: Comprehensive startup information pages
- **Performance Optimized**: Built with Vite for fast development and production builds

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables for theming
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks (Button, Input, Typography)
│   ├── molecules/      # Simple components (SearchBar, StartupCard)
│   ├── organisms/      # Complex components (Header, StartupGrid)
│   └── templates/      # Page layouts
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and contexts
├── styles/             # Global styles and variables
└── translations/       # i18n translation files
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/dwildt/openstartup.git
   cd openstartup
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:3001/` (or next available port)
   - Supports hot-reload for development
   - No deployment setup needed for local development

### Local-Only Development

If you only want to run the project locally without deployment capabilities:

1. Follow steps 1-3 above
2. You can ignore all GitHub CLI setup
3. Development server works independently
4. All features work locally (themes, i18n, routing, etc.)

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Generate static production build in `dist/` folder
- `npm run preview` - Preview production build locally at `http://localhost:4175/openstartup/`

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Testing
- `npm run test` - Run unit tests with Jest
- `npm run test:unit` - Same as above
- `npm run test:e2e` - Run end-to-end tests with Cypress
- `npm run test:e2e:open` - Open Cypress interactive mode

### Deployment
- `npm run predeploy` - Automatically runs before deploy (builds the project)
- `npm run deploy` - Deploy to GitHub Pages (requires GitHub CLI setup)

## 🏗️ Build & Static Generation

### Creating Static Build

To generate static files for production:

```bash
npm run build
```

This creates a `dist/` folder with:
- Optimized HTML, CSS, and JavaScript files
- Compressed assets and images
- Source maps for debugging
- All files ready for static hosting

### Preview Static Build

To test the static build locally:

```bash
npm run preview
```

This serves the `dist/` folder at `http://localhost:4175/openstartup/` exactly as it will appear on GitHub Pages.

## 🚀 Deployment Setup

### Prerequisites for Deployment

1. **GitHub CLI** (recommended for professional workflows)
   ```bash
   # macOS
   brew install gh

   # Windows (Chocolatey)
   choco install gh

   # Windows (Scoop)
   scoop install gh
   ```

2. **Authentication**
   ```bash
   gh auth login
   ```
   - Choose GitHub.com
   - Select HTTPS protocol
   - Authenticate via web browser

### Deploy to GitHub Pages

```bash
npm run deploy
```

This command:
1. Runs `npm run build` automatically
2. Pushes the `dist/` folder to `gh-pages` branch
3. GitHub Pages serves from this branch
4. Site available at: https://dwildt.github.io/openstartup/

### Manual Deployment (Alternative)

If you prefer not to use GitHub CLI:

1. Build the project: `npm run build`
2. Copy `dist/` folder contents to your hosting provider
3. Ensure the hosting supports single-page applications (SPA)

### GitHub Pages Configuration

Make sure your repository settings are configured:
1. Go to repository Settings > Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `/ (root)`
4. Save

### Deployment Troubleshooting

**Common Issues:**

1. **"Permission denied (publickey)" error**
   - Solution: Use GitHub CLI with `gh auth login`
   - Alternative: Use Personal Access Token

2. **"Password authentication is not supported" error**
   - Solution: Configure git credential helper:
     ```bash
     git config --global credential.helper "!gh auth git-credential"
     ```

3. **"Branch 'gh-pages' already exists" error**
   - Solution: Clear cache and retry:
     ```bash
     rm -rf node_modules/.cache/gh-pages
     npm run deploy
     ```

4. **404 Page Not Found on GitHub Pages**
   - Wait 1-5 minutes for GitHub Pages to update
   - Check repository Settings > Pages configuration
   - Verify the `gh-pages` branch exists

## 🔧 Development vs Production

### Key Differences

| Environment | Base Path | URL | Hot Reload | Optimized |
|-------------|-----------|-----|------------|-----------|
| Development | `/` | `localhost:3001/` | ✅ Yes | ❌ No |
| Preview | `/openstartup/` | `localhost:4175/openstartup/` | ❌ No | ✅ Yes |
| Production | `/openstartup/` | `dwildt.github.io/openstartup/` | ❌ No | ✅ Yes |

### Environment-Specific Features

The application automatically detects the environment and adjusts:
- **Asset paths**: Automatically prefixed for GitHub Pages
- **Router basename**: Configured for subdirectory deployment
- **API endpoints**: Relative paths work in all environments

## 🌐 Internationalization

The application supports three languages:
- English (default)
- Portuguese
- Spanish

Language preferences are persisted in localStorage and can be changed via the header dropdown.

## 🎨 Theming

The app features a comprehensive theming system with:
- Light and dark themes
- CSS variables for consistent styling
- System preference detection
- Persistent user preference

## 📊 Data Schema

Startups are defined with the following structure:

```json
{
  "id": "unique-identifier",
  "name": {
    "en": "English Name",
    "pt": "Portuguese Name",
    "es": "Spanish Name"
  },
  "description": { "en": "...", "pt": "...", "es": "..." },
  "shortDescription": { "en": "...", "pt": "...", "es": "..." },
  "category": { "en": "...", "pt": "...", "es": "..." },
  "tags": { "en": ["..."], "pt": ["..."], "es": ["..."] },
  "logo": "URL to logo image",
  "website": "https://startup-website.com",
  "founded": "2022",
  "location": "City, Country",
  "employees": "10-50",
  "funding": "$1M Seed",
  "revenue": "$500K ARR",
  "socialMedia": {
    "twitter": "https://twitter.com/startup",
    "linkedin": "https://linkedin.com/company/startup"
  },
  "metrics": {
    "users": "10,000+",
    "revenue": "$500K ARR",
    "growth": "150% YoY"
  },
  "contact": {
    "email": "hello@startup.com",
    "phone": "+1 (555) 123-4567"
  },
  "lastUpdated": "2024-01-15T00:00:00.000Z"
}
```

## 📦 Production Deployment

The application is deployed to GitHub Pages using local deployment with the `gh-pages` package. See the [Deployment Setup](#-deployment-setup) section above for detailed instructions.

## 🧪 Testing

The project includes:
- Unit tests for components and utilities
- Integration tests for user interactions
- End-to-end tests with Cypress
- Coverage reporting with 80%+ target

## 🤝 Contributing

We welcome contributions to OpenStartup! Whether you want to add your startup to the platform or improve the codebase, here's how you can contribute.

### 🏢 Adding Your Startup

We've made it super easy to add new startups to the platform! Each startup is now stored as an individual JSON file, making contributions clean and conflict-free.

#### Method 1: Pull Request (Recommended)

1. **Fork the repository** and clone it locally
2. **Create your startup data file**:
   - Create a new file: `public/data/startups/{your-startup-slug}.json`
   - Use the template from [`docs/STARTUP_TEMPLATE.md`](docs/STARTUP_TEMPLATE.md)
   - Follow the naming convention: lowercase with hyphens (e.g., `my-awesome-startup.json`)

3. **Register your startup**:
   - Add your startup slug to the `STARTUP_SLUGS` array in `src/utils/data.js`
   - Example: `'my-awesome-startup'`

4. **Validate your data**:
   ```bash
   npm run validate-startup my-awesome-startup
   ```

5. **Test locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3001` to see your startup listed

6. **Submit a Pull Request**:
   - Use title: "Add [Your Startup Name] to startup directory"
   - Include a brief description of your startup in the PR description

#### Method 2: GitHub Issue

If you're not comfortable with Git/GitHub:

1. **Open a new issue** with the title "Add New Startup: [Your Startup Name]"
2. **Use the issue template** to provide all required information
3. **Include all startup details** following the format in [`docs/STARTUP_TEMPLATE.md`](docs/STARTUP_TEMPLATE.md)
4. **Our maintainers will create the JSON file** and add your startup to the platform

### 📋 Startup Data Requirements

#### Required Information
- **Basic Info**: Name, description, short description
- **Translations**: English, Portuguese, and Spanish for all text fields
- **Contact**: At least an email address
- **Category**: Technology category (AI, FinTech, HealthTech, etc.)

#### Optional Information
- Logo (use default if not available)
- Website, social media links
- Funding information, employee count
- Key metrics (users, revenue, growth)
- Founded year, location

#### Validation Rules
- **Slug format**: Lowercase with hyphens only (`my-startup-name`)
- **Required languages**: English (en), Portuguese (pt), Spanish (es)
- **URLs**: Must be valid and use HTTPS
- **Tags**: Maximum 4 tags per language
- **Logo**: SVG preferred, under 50KB

### 🔧 Code Contributions

#### For Developers

1. **Fork and clone** the repository
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Make your changes** following our coding standards:
   - Follow the atomic design pattern
   - Add tests for new features
   - Update documentation as needed
   - Follow ESLint and Prettier rules

5. **Test your changes**:
   ```bash
   npm run test          # Run unit tests
   npm run lint          # Check code quality
   npm run build         # Ensure builds successfully
   ```

6. **Submit a Pull Request**:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes

#### Development Standards
- **Components**: Follow atomic design (atoms → molecules → organisms → templates → pages)
- **Styling**: Use CSS variables for theming, mobile-first responsive design
- **Internationalization**: Support EN, PT, ES languages
- **Testing**: 80%+ test coverage, unit and integration tests
- **Accessibility**: WCAG 2.1 AA compliance

### 🐛 Bug Reports & Feature Requests

1. **Search existing issues** first to avoid duplicates
2. **Use issue templates** for consistency
3. **Provide detailed information**:
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

### 📚 Documentation

Help improve our documentation:
- Fix typos or unclear instructions
- Add examples or use cases
- Translate content to other languages
- Update outdated information

### 🎯 Good First Issues

New contributors can look for issues labeled:
- `good first issue` - Perfect for beginners
- `help wanted` - Community contributions welcome
- `documentation` - Documentation improvements needed

### 📞 Getting Help

- **Questions**: Open a GitHub discussion
- **Template help**: Check [`docs/STARTUP_TEMPLATE.md`](docs/STARTUP_TEMPLATE.md)
- **Validation issues**: Run `npm run validate-startup {slug}`
- **General support**: Create an issue with the "question" label

### 🏆 Recognition

All contributors are acknowledged in our contributors list. Startup submissions help build a valuable resource for the entrepreneurship community!

## 📄 License

This project is licensed under the MIT License.

## 🔗 Live Demo

Visit the live application at: [https://dwildt.github.io/openstartup](https://dwildt.github.io/openstartup)

## 💖 Support

If you find this project helpful, consider [sponsoring the development](https://github.com/sponsors/dwildt) to support continued improvements and new features.