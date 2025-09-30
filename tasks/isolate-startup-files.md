# Isolate JSON files for each startup + Contribution Documentation

## Current State
- Single `public/data/startups.json` file contains array of all startup data
- Each startup has an `id` field (e.g., "acme-ai", "fintech-pro")
- Data is fetched via `fetchStartups()` in `src/utils/data.js`

## Proposed Changes

### 1. Create individual JSON files
- Create `public/data/startups/` directory
- Split current data into individual files: `{slug}.json` (e.g., `acme-ai.json`)
- Each file contains single startup object (not array)

### 2. Update data loading logic
- Modify `fetchStartups()` to:
  - Fetch list of available startup files from directory
  - Load each startup file individually
  - Combine into array for existing functionality
- Maintain backward compatibility with current API

### 3. Create startup template
- Add `docs/STARTUP_TEMPLATE.md` with:
  - JSON schema documentation
  - Field descriptions and examples
  - Validation requirements
  - Contribution guidelines

### 4. Update README with contribution section
- Add "Contributing" section explaining how to add new startups
- Document two contribution methods:
  - **GitHub Issue**: Submit startup data via issue template
  - **Pull Request**: Add new JSON file directly
- Include links to startup template and validation requirements

### 5. Save plan to tasks folder
- Save this plan to `tasks/isolate-startup-files.md` for future reference

### 6. Add validation script
- Create `scripts/validate-startup.js` to:
  - Validate individual startup JSON files
  - Check required fields and format
  - Ensure slug matches filename

### 7. Update build process
- Modify build to automatically discover startup files
- Generate index of available startups
- Maintain existing static site generation

## Benefits
- **Easy contributions**: Add new startup = new JSON file or GitHub issue
- **Clean PRs**: Each startup addition is isolated
- **Clear guidelines**: Contributors know exactly what data is needed
- **Better maintainability**: Easier to review individual changes
- **Scalability**: No merge conflicts on single large file

## Files to create/modify
- `tasks/isolate-startup-files.md` - Save this plan
- `src/utils/data.js` - Update data fetching logic
- `public/data/startups/` - New directory structure
- `docs/STARTUP_TEMPLATE.md` - New template documentation
- `README.md` - Add contribution section
- `scripts/validate-startup.js` - New validation script
- `package.json` - Add validation script command

## Commit Message
"Easier way to add new companies. One JSON file for each company."

## Implementation Steps
1. Save this plan to tasks folder ✓
2. Create startups directory structure
3. Split existing data into individual files
4. Update data fetching logic
5. Create documentation and templates
6. Add validation scripts
7. Update README with contribution guidelines
8. Test everything works
9. Commit with specified message