import { MOBILE_SCREEN_MAX_WIDTH } from '../constants';
import { useScreenWidth } from './useScreenWidth';

const useMobile = () => {
  const width = useScreenWidth();
  return width <= MOBILE_SCREEN_MAX_WIDTH;
};

export { useMobile };
