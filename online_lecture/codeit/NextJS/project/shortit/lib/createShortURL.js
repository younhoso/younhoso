import { createHmac } from 'crypto';

export default function createShortURL(url) {
  const hash = createHmac('sha256', 'shortit')
    .update(url + Date.now())
    .digest('hex');
  return hash.slice(0, 6);
}
