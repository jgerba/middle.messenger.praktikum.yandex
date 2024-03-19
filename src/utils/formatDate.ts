export default function formatDate(dateStr: string) {
  const now = new Date() as unknown;
  const date = new Date(dateStr) as unknown;

  // sec difference
  const diff = (now as number) - (date as number);

  // days difference
  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  // if in 1 day
  if (daysDiff === 0) {
    return (date as Date).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // if in 1 week
  if (daysDiff >= 1 && daysDiff <= 7) {
    return (date as Date).toLocaleDateString('ru-RU', { weekday: 'long' });
  }

  // if more then 1 week
  return (date as Date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
