// Helper function to resolve asset paths for both development and production
export function getAssetPath(path) {
  const basePath = import.meta.env.PROD ? '/openstartup' : '';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}