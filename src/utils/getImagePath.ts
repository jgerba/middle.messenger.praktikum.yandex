import { MSG_KEYS } from '../core/const.ts';

export default function getImagePath(str: string): string | null {
  const regex = new RegExp(
    `${MSG_KEYS.IMAGE_KEY}/([^\r\n]+.(jpg|jpeg|png|gif|webp))`,
    'i',
  );

  const match = str.match(regex);

  if (match) {
    return match[1];
  }
  return null;
}
