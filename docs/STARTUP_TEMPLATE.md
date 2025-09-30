# Startup Template

This document provides a template and guidelines for adding new startups to the OpenStartup platform.

## JSON Template

Create a new file in `public/data/startups/` with the filename `{your-startup-slug}.json`. Use the following template:

```json
{
  "id": "your-startup-slug",
  "name": {
    "en": "Your Startup Name",
    "pt": "Nome da Sua Startup",
    "es": "Nombre de Tu Startup"
  },
  "description": {
    "en": "Detailed description of your startup in English. Explain what your company does, its value proposition, and key benefits. This should be 2-3 sentences.",
    "pt": "Descrição detalhada da sua startup em português. Explique o que sua empresa faz, sua proposta de valor e principais benefícios. Deve ter 2-3 frases.",
    "es": "Descripción detallada de tu startup en español. Explica qué hace tu empresa, su propuesta de valor y beneficios clave. Debe tener 2-3 oraciones."
  },
  "shortDescription": {
    "en": "Brief one-line description",
    "pt": "Breve descrição de uma linha",
    "es": "Breve descripción de una línea"
  },
  "logo": "/images/default-logo.svg",
  "website": "https://your-startup.com",
  "founded": "2024",
  "category": {
    "en": "Technology Category",
    "pt": "Categoria de Tecnologia",
    "es": "Categoría de Tecnología"
  },
  "tags": {
    "en": ["Tag1", "Tag2", "Tag3", "Tag4"],
    "pt": ["Tag1", "Tag2", "Tag3", "Tag4"],
    "es": ["Tag1", "Tag2", "Tag3", "Tag4"]
  },
  "location": "City, Country",
  "employees": "1-10",
  "funding": "$100K Pre-seed",
  "revenue": "$50K ARR",
  "socialMedia": {
    "twitter": "https://twitter.com/yourstartup",
    "linkedin": "https://linkedin.com/company/your-startup",
    "github": "https://github.com/your-startup"
  },
  "metrics": {
    "users": "1,000+",
    "revenue": "$50K ARR",
    "growth": "100% YoY"
  },
  "contact": {
    "email": "hello@your-startup.com",
    "phone": "+1 (555) 123-4567"
  },
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

## Field Descriptions

### Required Fields

- **`id`** (string): Unique identifier for your startup. Use lowercase with hyphens (e.g., "my-startup-name").
- **`name`** (object): Startup name in multiple languages (en, pt, es required).
- **`description`** (object): Detailed description in multiple languages. 2-3 sentences explaining what your startup does.
- **`shortDescription`** (object): Brief one-line description in multiple languages.

### Optional Fields

- **`logo`** (string): Path to logo image. Use `/images/default-logo.svg` if you don't have a custom logo.
- **`website`** (string): Your startup's website URL.
- **`founded`** (string): Year your startup was founded.
- **`category`** (object): Technology category in multiple languages.
- **`tags`** (object): Array of relevant tags in multiple languages (max 4 tags).
- **`location`** (string): City and country where your startup is based.
- **`employees`** (string): Employee count range (e.g., "1-10", "11-50", "51-200").
- **`funding`** (string): Latest funding round and amount.
- **`revenue`** (string): Annual Recurring Revenue (ARR) or revenue metric.
- **`socialMedia`** (object): Social media links (twitter, linkedin, github).
- **`metrics`** (object): Key business metrics (users, revenue, growth).
- **`contact`** (object): Contact information (email, phone).
- **`lastUpdated`** (string): ISO date string of when the data was last updated.

## Validation Rules

1. **ID Format**: Must be lowercase with hyphens only (no spaces, underscores, or special characters).
2. **Required Languages**: English (en), Portuguese (pt), and Spanish (es) are required for name, description, shortDescription, category, and tags.
3. **Logo**: If you don't provide a custom logo, use the default: `/images/default-logo.svg`.
4. **URLs**: All URLs must be valid and start with `https://`.
5. **Dates**: Use ISO 8601 format for lastUpdated field.
6. **Tags**: Maximum of 4 tags per language.

## Category Examples

Common categories include:
- Artificial Intelligence
- FinTech
- HealthTech
- EdTech
- GreenTech
- Blockchain
- E-commerce
- SaaS
- Mobile Apps
- IoT

## Adding Your Startup

### Method 1: Pull Request (Recommended)

1. Fork the repository
2. Create your startup JSON file in `public/data/startups/{your-slug}.json`
3. Add your startup slug to the `STARTUP_SLUGS` array in `src/utils/data.js`
4. Test locally with `npm run dev`
5. Submit a pull request

### Method 2: GitHub Issue

1. Open a new issue in the repository
2. Use the "Add New Startup" template
3. Fill in all the required information
4. The maintainers will create the JSON file for you

## Logo Guidelines

- **Format**: SVG, PNG, or JPG
- **Size**: Recommended 150x100px or similar aspect ratio
- **Quality**: High resolution, clean design
- **Background**: Transparent or white background preferred
- **File size**: Keep under 50KB

If you don't have a logo ready, you can start with the default logo and update it later.

## Need Help?

- Check existing startup files in `public/data/startups/` for examples
- Run `npm run validate-startup {your-slug}` to check your JSON format
- Open an issue if you have questions about the format
- Contact the maintainers for assistance

## Translation Guidelines

When providing translations:
- **Portuguese (pt)**: Use Brazilian Portuguese
- **Spanish (es)**: Use international Spanish
- Keep the meaning consistent across all languages
- If unsure about translations, provide English only and note in your PR that you need translation help