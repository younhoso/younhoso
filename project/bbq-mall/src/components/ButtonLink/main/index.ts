import ButtonLinkMobile from './mobile/ButtonLinkMobile';
import _ButtonLink from './pc/ButtonLink';

type ButtonLinkP = typeof _ButtonLink;

interface ButtonLinkType extends ButtonLinkP {
  Mobile: typeof ButtonLinkMobile;
}

const ButtonLink = _ButtonLink as ButtonLinkType;

ButtonLink.Mobile = ButtonLinkMobile;

export default ButtonLink;
