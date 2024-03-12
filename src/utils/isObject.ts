export default function isObject(item: unknown): boolean {
  return !!(item && typeof item === 'object' && !Array.isArray(item));
}
