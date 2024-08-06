import { CameraIcon, MagnifyingGlassIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Flex, Text } from '@tremor/react';
import { ChangeEvent, Ref, useCallback, useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { v4 as uuidv4 } from 'uuid';

import ImageDetail from '../menu/Modal/ImageDetail';
import CustomButton from './CustomButton';
import { useModalContext } from './Modal';

interface FileInputTypes {
  fileInputRef?: Ref<HTMLInputElement>;
  type: 'image' | 'file';
  multiple?: boolean | false;
  className?: string;
  zoom?: boolean;
  value?: IFileTypes[];
  onChange?: (files: IFileTypes[]) => void;
}
export interface IFileTypes {
  id: number;
  object: File;
}

export default function FileInput({
  fileInputRef,
  type,
  multiple,
  className,
  zoom,
  value,
  onChange,
}: FileInputTypes) {
  const { openModal } = useModalContext();
  const [isDragging, setIsDragging] = useState(false);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef(0);
  const id = uuidv4();

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      let selectFiles = [];

      let tempFiles = value ? [...value] : [];

      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      for (const file of selectFiles) {
        if (type === 'image' && !validTypes.includes(file.type)) {
          alert('jpg, jpeg, png 형식의 이미지만 등록됩니다.');
          return;
        }
        tempFiles = [
          ...(multiple ? [...tempFiles] : []),
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }

      if (typeof onChange === 'function') {
        onChange(tempFiles);
      }
    },
    [id, multiple, onChange, value],
  );

  const handleFilterFile = useCallback(
    (e: any, fileId: number) => {
      e.preventDefault();

      const updatedFiles = value ? value.filter(file => file.id !== fileId) : [];

      if (typeof onChange === 'function') {
        onChange(updatedFiles);
      }
    },
    [id, onChange, value],
  );

  const zoomFile = useCallback(
    (e: any, fileId: number) => {
      e.preventDefault();
      const object = value ? value.filter(file => file.id === fileId)[0].object : null;
      if (object) {
        openModal('', '', <ImageDetail src={URL.createObjectURL(object)} />);
      }
    },
    [openModal, value],
  );

  const handleDragIn = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className={`flex flex-col ${className ? className : ''}`}>
      <input
        ref={fileInputRef}
        type="file"
        id={`fileUpload-${id}`}
        className="hidden"
        multiple={multiple}
        onChange={onChangeFiles}
      />
      {type == 'image' ? (
        <label
          className={`cursor-pointer transition duration-150 ease-in ${
            isDragging ? 'bg-black text-white' : ''
          }`}
          htmlFor={`fileUpload-${id}`}
          ref={dragRef}
        >
          {value && value.length == 0 && (
            <Flex className="border-2 border-gray-300 border-dashed bg-gray-200 w-[200px] h-[200px]">
              <CameraIcon width={50} className="mx-auto text-gray-500" />
            </Flex>
          )}
          <Flex className="gap-10">
            {value &&
              value.length > 0 &&
              Array.isArray(value) &&
              value.map((file, key) => {
                const { id: fileId, object } = file;

                return (
                  <div className="relative" key={key}>
                    <Image
                      alt={'file-' + key}
                      src={URL.createObjectURL(object)}
                      width={200}
                      height={200}
                    />
                    <div
                      className="cursor-pointer hover:opacity-70 p-1 absolute -top-3 -right-3 bg-white rounded-full"
                      onClick={e => handleFilterFile(e, fileId)}
                    >
                      <XMarkIcon width={15} />
                    </div>
                    {zoom && (
                      <div
                        className="cursor-pointer hover:opacity-70 p-1 absolute -top-3 right-3 bg-white rounded-full"
                        onClick={e => zoomFile(e, fileId)}
                      >
                        <MagnifyingGlassIcon width={15} />
                      </div>
                    )}
                  </div>
                );
              })}
            {value && value.length > 0 && multiple && (
              <Flex className="border border-gray-300 border-dashed bg-gray-200 w-[200px] h-[200px]">
                <PlusIcon width={50} className="mx-auto text-gray-500" />
              </Flex>
            )}
          </Flex>
        </label>
      ) : (
        <label htmlFor={`fileUpload-${id}`} ref={dragRef}>
          <CustomButton onClick={() => dragRef.current?.click()} type="tertiary">
            파일 첨부
          </CustomButton>
        </label>
      )}
      {type == 'file' && (
        <div className="mt-4">
          {value &&
            value.map(file => {
              const { id: fileId, object } = file;

              return (
                <div key={fileId} className="flex align-center justify-between w-80 py-2 border-b">
                  <Text>{object.name}</Text>
                  <div
                    className="cursor-pointer hover:opacity-70"
                    onClick={e => handleFilterFile(e, fileId)}
                  >
                    <XMarkIcon width={15} />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
