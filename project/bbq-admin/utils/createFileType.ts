import { IFileTypes } from '@/app/components/FileInput';

export const createFileType = (file: File): IFileTypes => ({
  id: Number(`${file.name}-${file.size}-${file.lastModified}`),
  object: file,
});
