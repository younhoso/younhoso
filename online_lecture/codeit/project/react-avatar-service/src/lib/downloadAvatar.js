import { AvatarImages } from '../assets/avatar';

const SIZE = 640;

export default function downloadAvatar(avatar, name) {
  const { hairType, hairColor, accessories, skin, clothes } = avatar;
  const rawImages = [
    AvatarImages.skin[skin],
    AvatarImages.clothes[clothes],
    AvatarImages.hair[hairType][hairColor],
    AvatarImages.accessories[accessories],
  ];
  const imageSources = rawImages.map((image) => {
    const element = document.createElement('img');
    element.src = image;
    element.width = element.height = SIZE;
    return element;
  });

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const context = canvas.getContext('2d');

  // 배경 그리기
  context.fillStyle = '#F7F7F7';
  context.fillRect(0, 0, SIZE, SIZE);

  // 뒷면에서 앞면으로 imageSources 그리기
  for (const imageSource of imageSources) {
    context.drawImage(imageSource, 0, 0, SIZE, SIZE);
  }

  // 데이터 URL을 사용하여 이미지 다운로드
  const dataURL = canvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = `${name}의 아바타.png`;
  downloadLink.click();
}
