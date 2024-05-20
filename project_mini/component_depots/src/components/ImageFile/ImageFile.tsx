import { ChangeEvent, forwardRef } from 'react';

import clsx from 'clsx';

import { ImageFileStyled } from './styled';

type ImageFileProps = {
  imageSrc: string;
  className: string;
  onDeleteImage: () => void;
  encodeFileToBase64: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default forwardRef<HTMLInputElement, ImageFileProps>(function ImageFile(
  { imageSrc, className, onDeleteImage, encodeFileToBase64 },
  ref,
) {
  return (
    <ImageFileStyled>
      <input
        type="file"
        id="file"
        name="petImage"
        className="hidden"
        ref={ref}
        accept="image/jpg, image/png, image/jpeg, image/gif"
        onChange={e => encodeFileToBase64(e)}
      />

      {imageSrc && <div onClick={onDeleteImage}>닫기</div>}
      <label htmlFor="file" className={clsx(`label ${className}`)}>
        <div className={`${className} ${!imageSrc && 'border-2'}`}>
          {!imageSrc && (
            <div>
              {/* <PlusIcon width={30} className="mx-auto text-gray-500" /> */}
              플러스 아이콘
            </div>
          )}
        </div>

        {imageSrc && <img src={imageSrc} alt="이미지 미리보기" />}
      </label>
    </ImageFileStyled>
  );
});
