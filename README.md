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

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

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

## 🚀 Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

## 🧪 Testing

The project includes:
- Unit tests for components and utilities
- Integration tests for user interactions
- End-to-end tests with Cypress
- Coverage reporting with 80%+ target

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Live Demo

Visit the live application at: [https://dwildt.github.io/openstartup](https://dwildt.github.io/openstartup)

## 💖 Support

If you find this project helpful, consider [sponsoring the development](https://github.com/sponsors/dwildt) to support continued improvements and new features.