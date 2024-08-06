import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, RefObject, forwardRef, useCallback, useState } from 'react';

interface ImageFileInputProps {
  imageSrc: string;
  division: string;
  className: string;
  onDeleteImage: () => void;
  encodeFileToBase64: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default forwardRef<HTMLInputElement, ImageFileInputProps>(function ImageFileInput(
  { imageSrc, division, className, onDeleteImage, encodeFileToBase64 },
  ref,
) {
  return (
    <div>
      <input
        type="file"
        id={`file-${division}`}
        name={`image-${imageSrc}`}
        className="hidden"
        ref={ref}
        accept="image/png, image/jpeg, image/jpg"
        onChange={e => encodeFileToBase64(e)}
      />

      <label htmlFor={`file-${division}`} className={`block ${className}`}>
        <div
          className={`bg-[#F6F7FB] border-dashed relative ${className} ${!imageSrc && 'border-2'}`}
        >
          {imageSrc && (
            <div
              className="cursor-pointer hover:opacity-70 p-1 absolute -top-3 -right-3 bg-white rounded-full"
              onClick={onDeleteImage}
            >
              <XMarkIcon width={15} />
            </div>
          )}
          {!imageSrc && (
            <div className="w-[34px] border-2 border-[#CDCED2] rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cursor-pointer">
              <PlusIcon width={30} className="mx-auto text-gray-500" />
            </div>
          )}

          <div
            className={`${className} bg-center bg-[length:100%_100%] bg-no-repeat cursor-pointer`}
            style={{
              backgroundImage: `url(${imageSrc && imageSrc})`,
            }}
          ></div>
        </div>
      </label>
    </div>
  );
});
