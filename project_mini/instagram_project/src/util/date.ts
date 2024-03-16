import {format} from 'timeago.js';

export function parseDate(date: string) {
  return format(date);
}