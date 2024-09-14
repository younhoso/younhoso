import { useState } from 'react';
import { AvatarImageLabels, PreviewAvatarImages } from '../assets/avatar';
import styles from './AvatarSelector.module.css';

const AVATAR_SELECTOR_PROPERTY_MAP = {
  skin: '피부 톤',
  hairType: '머리 종류',
  hairColor: '머리 색',
  clothes: '옷',
  accessories: '액세서리',
};
const PROPERTIES = Object.keys(AVATAR_SELECTOR_PROPERTY_MAP);
const PROPERTY_VALUES = {
  skin: Object.keys(PreviewAvatarImages.skin),
  hairType: Object.keys(PreviewAvatarImages.hairType),
  hairColor: Object.keys(PreviewAvatarImages.hairColor),
  clothes: Object.keys(PreviewAvatarImages.clothes),
  accessories: Object.keys(PreviewAvatarImages.accessories),
};
const PROPERTY_IMAGES = {
  skin: PreviewAvatarImages.skin,
  hairType: PreviewAvatarImages.hairType,
  hairColor: PreviewAvatarImages.hairColor,
  clothes: PreviewAvatarImages.clothes,
  accessories: PreviewAvatarImages.accessories,
};

function AvatarSelector({ avatar, onSelect }) {
  const [currentProperty, setCurrentProperty] = useState('skin');
  return (
    <>
      <ul className={styles.AvatarMenu}>
        {PROPERTIES.map((property) => (
          <li
            key={property}
            className={`${styles.AvatarMenuItem} ${
              property === currentProperty ? styles.active : ''
            }`}
            onClick={() => setCurrentProperty(property)}
          >
            {AVATAR_SELECTOR_PROPERTY_MAP[property]}
          </li>
        ))}
      </ul>
      <div className={styles.AvatarSelectorContainer}>
        <ul className={styles.AvatarSelector}>
          {PROPERTY_VALUES[currentProperty].map((propertyValue) => (
            <li
              key={propertyValue}
              className={`${styles.AvatarSelectorItem} ${
                avatar[currentProperty] === propertyValue ? styles.active : ''
              }`}
              onClick={() => onSelect(currentProperty, propertyValue)}
            >
              <div
                className={styles.AvatarSelectorPreview}
                style={{
                  backgroundImage: `url(${PROPERTY_IMAGES[currentProperty][propertyValue]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className={styles.AvatarSelectorLabel}>
                {AvatarImageLabels[currentProperty][propertyValue]}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AvatarSelector;
