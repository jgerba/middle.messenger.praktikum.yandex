// switched off because of the mixed content http/https
// only for local-server use
export default function checkIP(): Promise<boolean> {
  return fetch('http://ip-api.com/json/')
    .then((response) => response.json())
    .then((data) => {
      const country = data.countryCode as string;

      if (country === 'RU' || country === 'BY') {
        return false;
      }
      return true;
    });
}
