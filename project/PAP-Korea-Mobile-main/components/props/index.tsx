import { numberToRem } from '~/utils/rem';

export interface newsSlideProps {
  heightSize:
  | 'newsSlide'
  | 'default'
  | 'ediLarge'
  | 'ediNormal'
  | 'full'
  | 'newsSlideBottom'
  | 'ediBottom';
}

export interface heightObjProps {
  newsSlide: string;
  default: string;
  ediLarge: string;
  ediNormal: string;
  full: string;
  newsSlideBottom: string;
  ediBottom: string;
}

export const heightObjectNumbers = {
  default: 100,
  full: 100,
  newsSlide: 350,
  ediLarge: 740,
  ediNormal: 440,
  newsSlideBottom: 310,
  ediBottom: 660,
};

export const heightObjRems = {
  newsSlide: numberToRem(heightObjectNumbers.newsSlide, 1),
  default: 'auto',
  full: '100%',
  ediLarge: numberToRem(heightObjectNumbers.ediLarge, 1),
  ediNormal: numberToRem(heightObjectNumbers.ediNormal, 1),
  newsSlideBottom: numberToRem(heightObjectNumbers.newsSlideBottom, 1),
  ediBottom: numberToRem(heightObjectNumbers.ediBottom, 1),
};

export default interface defaultInterface { }
