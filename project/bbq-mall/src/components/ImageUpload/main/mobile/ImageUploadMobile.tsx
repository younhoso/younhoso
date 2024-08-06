'use client';

import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useRef, useState } from 'react';

import Image from 'next/image';

import clsx from 'clsx';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import camera from '@/assets/images/components/camera.svg';
import closeWhite from '@/assets/images/components/close-white.svg';
import { PLATFORMLIST } from '@/constant/axiosRelated';
import { customAxios } from '@/libs/customAxios';
import { confirmModalOpenStore } from '@/stores/confirmModalOpen';

import { ImageProps, ImageUploadProps, descriptionList } from '../pc/ImageUpload';
import { ImageUploadMobileStyled } from './styled';

const ImageUploadMobile = ({
  className,
  maxLength = 3,
  defaultImageList,
  onChangeImage,
  additionalMent,
}: ImageUploadProps) => {
  const [fileList, setFileList] = useState<string[]>(defaultImageList ?? []);
  const setOpenConfirm = useSetRecoilState(confirmModalOpenStore);
  const resetOpenConfirm = useResetRecoilState(confirmModalOpenStore);
  const { mutateAsync } = useMutation({
    mutationFn: (body: FormData) =>
      customAxios(PLATFORMLIST.PC).post<ImageProps>('/files/images', body),
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (fileList.length >= maxLength) {
      return setOpenConfirm({
        open: true,
        content: `최대 ${maxLength}개까지 올릴 수 있습니다.`,
        onOk: resetOpenConfirm,
      });
    }
    const formData = new FormData();
    formData.append('file', e.target.files?.[0] as Blob);
    const res = await mutateAsync(formData);
    const array = [...fileList, res.data.imageUrl];
    setFileList(array);
    onChangeImage?.(array);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <ImageUploadMobileStyled className={clsx('ImageUploadMobile', className)}>
      <div className="image-content-wrapper">
        <label>
          <input
            type="file"
            onChange={handleFileChange}
            ref={inputRef}
            accept="image/jpg, image/png, image/jpeg"
          />
          <Image src={camera} width={36} height={36} alt="image-upload" />
          <div>
            {fileList.length} / {maxLength}
          </div>
        </label>
        {fileList.map((v, i) => (
          <div key={v} className="image-upload-image-wrapper">
            <Image src={'https:' + v} width={72} height={72} alt="image" />
            <div
              className="image-close-wrapper"
              onClick={() => {
                const _fileList = [...fileList];
                _fileList.splice(i, 1);
                setFileList(_fileList);
                onChangeImage?.(_fileList);
              }}
            >
              <Image src={closeWhite} width={14} height={14} alt="close" />
            </div>
          </div>
        ))}
      </div>
      <div className="image-content-info">
        {descriptionList(maxLength, additionalMent).map(v => (
          <p key={v}>{v}</p>
        ))}
      </div>
    </ImageUploadMobileStyled>
  );
};

export default ImageUploadMobile;
