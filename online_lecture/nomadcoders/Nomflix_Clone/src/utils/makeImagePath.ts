export function makeImagePath(path: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}${path}`;
}
