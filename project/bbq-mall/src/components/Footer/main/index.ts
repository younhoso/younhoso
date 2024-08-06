import FooterMobile from './mobile/FooterMobile';
import _Footer from './pc/Footer';

type FooterP = typeof _Footer;

interface FooterType extends FooterP {
  Mobile: typeof FooterMobile;
}

const Footer = _Footer as FooterType;

Footer.Mobile = FooterMobile;

export default Footer;
