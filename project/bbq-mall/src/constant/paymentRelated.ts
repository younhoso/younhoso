import { ArrayElement } from '@/types/arrayElement';

export const KCP = 'KCP';
export const PAYCO = 'PAYCO';
export const KAKAO_PAY = 'KAKAO_PAY';

export const externalPay = [PAYCO, KAKAO_PAY] as const;

export type PgTypes = ArrayElement<typeof externalPay> | typeof KCP;
