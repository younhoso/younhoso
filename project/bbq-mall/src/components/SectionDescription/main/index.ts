import SectionDescriptionMobile from './mobile/SectionDescriptionMobile';
import _SectionDescription from './pc/SectionDescription';

type SectionDescriptionP = typeof _SectionDescription;

interface SectionDescriptionType extends SectionDescriptionP {
  Mobile: typeof SectionDescriptionMobile;
}

const SectionDescription = _SectionDescription as SectionDescriptionType;

SectionDescription.Mobile = SectionDescriptionMobile;

export default SectionDescription;
