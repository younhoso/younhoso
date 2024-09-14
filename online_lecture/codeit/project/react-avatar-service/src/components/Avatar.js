import { AvatarImages } from '../assets/avatar';
import AvatarBorderImage from '../assets/avatar-border.svg';
import styles from './Avatar.module.css';

function Avatar({
  className = '',
  value: {
    hairType = 'none',
    hairColor = 'black',
    accessories = 'none',
    skin = 'tone100',
    clothes = 'tshirtBasic',
  } = {},
  withBorder = false,
}) {
  const backgroundImage = `
    ${withBorder ? `url("${AvatarBorderImage}"),` : ''}
    url("${AvatarImages.accessories[accessories]}"),
    url("${AvatarImages.hair[hairType][hairColor]}"),
    url("${AvatarImages.clothes[clothes]}"),
    url("${AvatarImages.skin[skin]}")
  `;

  const backgroundSize = `
    ${withBorder ? `100%,` : ''}
    100%,
    100%,
    100%,
    100%
  `;

  const backgroundPosition = `
  ${withBorder ? `center center,` : ''}
    center center,
    center center,
    center center,
    center center
  `;

  return (
    <div
      className={className || styles.Avatar}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundImage,
        backgroundSize,
        backgroundPosition,
      }}
    ></div>
  );
}

export default Avatar;
