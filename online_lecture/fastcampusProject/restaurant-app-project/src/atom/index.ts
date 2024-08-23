import { atom } from 'recoil';

import { LocationType, SearchType, StoreTypeCustom } from '@/types';

export const mapState = atom({
  key: 'map',
  default: null,
  dangerouslyAllowMutability: true,
});

export const currentStoreState = atom<StoreTypeCustom | null>({
  key: 'store',
  default: null,
});

export const locationState = atom<LocationType>({
  key: 'location',
  default: {
    lat: '37.497625203',
    lng: '127.03088379',
    zoom: 3,
  },
});

export const searchState = atom<SearchType | null>({
  key: 'search',
  default: null,
});
