export const VERSION1 = '1.0';
export const VERSION1_1 = '1.1';
export const VERSION2_0 = '2.0';

export type VersionList = typeof VERSION1 | typeof VERSION1_1 | typeof VERSION2_0;

export const PLATFORMLIST = {
  PC: 'PC',
  MOBILE_WEB: 'MOBILE_WEB',
} as const;
