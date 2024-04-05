export default function getCoordsFromString(str: string): {
  latitude: number;
  longitude: number;
} | null {
  const regex = /latitude:\s*(-?\d+\.\d+),\s*longitude:\s*(-?\d+\.\d+)/i;
  const match = str.match(regex);

  if (match) {
    const latitude = parseFloat(match[1]);
    const longitude = parseFloat(match[2]);
    return { latitude, longitude };
  }
  return null;
}
