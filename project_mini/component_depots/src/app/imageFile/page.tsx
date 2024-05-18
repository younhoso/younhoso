'use client';

import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import ImageFile from '@/components/ImageFile/ImageFile';

import { ImageFilePageStyled } from '../../styles/pageStyled/ImageFileStyled';

export type IFileTypes = {
  object: File;
};

type FormState = {
  thumbnailImageFile: IFileTypes[];
};

export default function ImageFilePage() {
  const inputEl = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    thumbnailImageFile: [],
  });

  const [imageSrc, setImageSrc] = useState('');

  const handleChange = useCallback((name: string, value: File | []) => {
    setForm(prveform => ({
      ...prveform,
      [name]: value ? [{ object: value }] : [],
    }));
  }, []);

  // 이미지 미리보기 삭제하는 함수
  const onDeleteImage = useCallback(() => {
    // form에서 해당 이미지 정보 삭제
    handleChange('thumbnailImageFile', []);
    // 이미지 미리보기 삭제
    setImageSrc('');
    // input file value 초기화
    if (inputEl.current) {
      inputEl.current.value = '';
    }
  }, [handleChange]);

  // 이미지 미리보기 보여주는 함수
  const encodeFileToBase64 = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // 파일 타입 검사
      const validTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('jpg, jpeg, png 형식의 이미지만 등록됩니다.');
        return;
      }

      // 파일 크기 검사 (2MB 이하)
      if (file.size > 2 * 1024 * 1024) {
        alert('파일 크기는 2MB 이하이어야 합니다.');
        return;
      }

      const nextPreview = URL.createObjectURL(file);
      setImageSrc(nextPreview);
      handleChange('thumbnailImageFile', file);
    }
  };

  return (
    <ImageFilePageStyled className={clsx('page')}>
      <ImageFile
        className={'w-[125px] h-[270px]'}
        ref={inputEl}
        imageSrc={imageSrc}
        onDeleteImage={onDeleteImage}
        encodeFileToBase64={encodeFileToBase64}
      />
    </ImageFilePageStyled>
  );
}
