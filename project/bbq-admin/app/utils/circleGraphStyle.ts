import { CorrectedMembershipData } from '../customer/page';

export const circleGraphStyle = (v: CorrectedMembershipData) => {
  let style;
  switch (v.membershipName) {
    case 'WELCOME':
      style = {
        pathColor: '#00C9B5',
        textColor: '#46477A',
        trailColor: '#dedee7',
      };
      break;

    case '치빡이':
      style = {
        pathColor: '#979636',
        textColor: '#46477A',
        trailColor: '#dedee7',
      };
      break;

    case 'BIP':
      style = {
        pathColor: '#FBB042',
        textColor: '#46477A',
        trailColor: '#dedee7',
      };
      break;

    case 'BBIP':
      style = {
        pathColor: '#E31937',
        textColor: '#46477A',
        trailColor: '#dedee7',
      };
      break;

    default:
      return;
  }

  return style;
};
