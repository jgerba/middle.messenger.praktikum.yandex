export default function checkGeo(message: string) {
  // regular expression to match 'latitude' followed by 'longitude'
  // (in any order) case-insensitively
  const regex = /latitude.*longitude|longitude.*latitude/gi;

  return regex.test(message);
}
