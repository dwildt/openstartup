#!/usr/bin/env node

/**
 * Startup Validation Script
 * Validates individual startup JSON files for compliance with the OpenStartup schema
 */

/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Required fields for a valid startup
const REQUIRED_FIELDS = [
  'id',
  'name',
  'description',
  'shortDescription'
];

// Required languages
const REQUIRED_LANGUAGES = ['en', 'pt', 'es'];

// Optional fields that should be objects with language keys
const MULTILINGUAL_FIELDS = [
  'name',
  'description',
  'shortDescription',
  'category',
  'tags'
];

// URL fields that should be validated
const URL_FIELDS = [
  'website',
  'socialMedia.twitter',
  'socialMedia.linkedin',
  'socialMedia.github'
];

/**
 * Validates a startup JSON object
 * @param {Object} startup - The startup data to validate
 * @param {string} slug - The startup slug (filename without .json)
 * @returns {Object} Validation result with isValid boolean and errors array
 */
function validateStartup(startup, slug) {
  const errors = [];
  const warnings = [];

  // Check if startup is an object
  if (!startup || typeof startup !== 'object') {
    return {
      isValid: false,
      errors: ['Invalid JSON: Startup data must be an object'],
      warnings: []
    };
  }

  // Validate required fields
  for (const field of REQUIRED_FIELDS) {
    if (!startup[field]) {
      errors.push(`Missing required field: ${field}`);
      continue;
    }

    // For multilingual fields, check language requirements
    if (MULTILINGUAL_FIELDS.includes(field)) {
      if (typeof startup[field] !== 'object') {
        errors.push(`Field '${field}' must be an object with language keys`);
        continue;
      }

      for (const lang of REQUIRED_LANGUAGES) {
        if (!startup[field][lang]) {
          errors.push(`Missing ${lang} translation for field: ${field}`);
        }
      }

      // Special validation for tags
      if (field === 'tags') {
        for (const lang of REQUIRED_LANGUAGES) {
          if (startup[field][lang] && Array.isArray(startup[field][lang])) {
            if (startup[field][lang].length > 4) {
              warnings.push(`Too many tags for ${lang} (max 4): ${startup[field][lang].length}`);
            }
          }
        }
      }
    }
  }

  // Validate ID matches filename
  if (startup.id && startup.id !== slug) {
    errors.push(`ID '${startup.id}' does not match filename '${slug}'`);
  }

  // Validate ID format (lowercase with hyphens only)
  if (startup.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(startup.id)) {
    errors.push(`Invalid ID format: '${startup.id}'. Use lowercase letters, numbers, and hyphens only`);
  }

  // Validate URLs
  for (const urlField of URL_FIELDS) {
    const value = getNestedProperty(startup, urlField);
    if (value && !isValidUrl(value)) {
      errors.push(`Invalid URL for ${urlField}: ${value}`);
    }
  }

  // Validate email
  if (startup.contact?.email && !isValidEmail(startup.contact.email)) {
    errors.push(`Invalid email format: ${startup.contact.email}`);
  }

  // Validate date format
  if (startup.lastUpdated && !isValidDate(startup.lastUpdated)) {
    errors.push(`Invalid date format for lastUpdated: ${startup.lastUpdated}. Use ISO 8601 format`);
  }

  // Validate founded year
  if (startup.founded) {
    const year = parseInt(startup.founded);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear + 5) {
      warnings.push(`Unusual founded year: ${startup.founded}`);
    }
  }

  // Check for recommended fields
  const recommendedFields = ['category', 'website', 'founded', 'location'];
  for (const field of recommendedFields) {
    if (!startup[field]) {
      warnings.push(`Missing recommended field: ${field}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Gets a nested property from an object using dot notation
 * @param {Object} obj - The object to search
 * @param {string} path - The path to the property (e.g., 'socialMedia.twitter')
 * @returns {*} The property value or undefined
 */
function getNestedProperty(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Validates if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid URL
 */
function isValidUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid ISO 8601 date
 * @param {string} dateString - The date string to validate
 * @returns {boolean} True if valid date
 */
function isValidDate(dateString) {
  try {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) && dateString === date.toISOString();
  } catch {
    return false;
  }
}

/**
 * Reads and validates a startup JSON file
 * @param {string} slug - The startup slug (filename without .json)
 * @returns {Object} Validation result
 */
function validateStartupFile(slug) {
  const filePath = path.join(__dirname, '../public/data/startups', `${slug}.json`);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return {
        isValid: false,
        errors: [`File not found: ${filePath}`],
        warnings: []
      };
    }

    // Read and parse JSON
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let startup;

    try {
      startup = JSON.parse(fileContent);
    } catch (parseError) {
      return {
        isValid: false,
        errors: [`Invalid JSON syntax: ${parseError.message}`],
        warnings: []
      };
    }

    // Validate the startup data
    return validateStartup(startup, slug);

  } catch (error) {
    return {
      isValid: false,
      errors: [`Error reading file: ${error.message}`],
      warnings: []
    };
  }
}

/**
 * Main function to run the validation
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: npm run validate-startup <startup-slug>');
    console.log('Example: npm run validate-startup acme-ai');
    process.exit(1);
  }

  const slug = args[0];
  console.log(`🔍 Validating startup: ${slug}`);
  console.log('─'.repeat(50));

  const result = validateStartupFile(slug);

  if (result.isValid) {
    console.log('✅ Validation passed! Your startup data is valid.');

    if (result.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      result.warnings.forEach(warning => {
        console.log(`   • ${warning}`);
      });
    }

    console.log('\n🎉 Your startup is ready to be added to the platform!');
    process.exit(0);
  } else {
    console.log('❌ Validation failed! Please fix the following errors:');
    console.log('');
    result.errors.forEach(error => {
      console.log(`   • ${error}`);
    });

    if (result.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      result.warnings.forEach(warning => {
        console.log(`   • ${warning}`);
      });
    }

    console.log('\n📖 For help, check the template: docs/STARTUP_TEMPLATE.md');
    process.exit(1);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { validateStartup, validateStartupFile };