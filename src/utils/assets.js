// Helper function to resolve asset paths for both development and production
export function getAssetPath(path) {
  // Use process.env which works in both Vite and Jest
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/openstartup' : '';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}