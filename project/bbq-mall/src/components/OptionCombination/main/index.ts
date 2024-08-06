import OptionCombinationMobile from './mobile/OptionCombinationMobile';
import _OptionCombination from './pc/OptionCombination';

type OptionCombinationP = typeof _OptionCombination;

interface OptionCombinationType extends OptionCombinationP {
  Mobile: typeof OptionCombinationMobile;
}

const OptionCombination = _OptionCombination as OptionCombinationType;

OptionCombination.Mobile = OptionCombinationMobile;

export default OptionCombination;
