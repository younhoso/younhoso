import { useEffect, useState } from 'react';
import { AvatarImages } from '../assets/avatar';

const PROPERTY_VALUES = {
  skin: Object.keys(AvatarImages.skin),
  hairType: Object.keys(AvatarImages.hair),
  hairColor: Object.keys(AvatarImages.hair.none),
  clothes: Object.keys(AvatarImages.clothes),
  accessories: Object.keys(AvatarImages.accessories),
};

function generateRandomAvatar() {
  const avatar = {};
  for (const property in PROPERTY_VALUES) {
    const values = PROPERTY_VALUES[property];
    avatar[property] = values[Math.floor(Math.random() * values.length)];
  }
  return avatar;
}

function useRandomAvatarAnimation() {
  const [avatar, setAvatar] = useState({
    skin: 'tone100',
    hairType: 'short1',
    hairColor: 'black',
    clothes: 'tshirtBasic',
    accessories: 'none',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setAvatar(generateRandomAvatar());
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return avatar;
}

export default useRandomAvatarAnimation;
