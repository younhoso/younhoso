import strapiAxios, { useAction } from './index';

// 업로드
export const useUpload = () => {
  return useAction(async (files, options) => {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach(file => formData.append('files', file));
    } else {
      formData.append('files', files);
    }

    if (options.table) {
      formData.append('ref', options.table);
      formData.append('refId', options.id);
      formData.append('field', options.field);
    }

    if (options.deleteIds) {
      await Promise.all(
        options.deleteIds.map((fileId: string) => {
          return strapiAxios.delete(`/upload/files/${fileId}`);
        }),
      );
    }

    if ((Array.isArray(files) && files.length > 0) || files instanceof File) {
      const res = await strapiAxios.post('/upload', formData);
      return res;
    } else {
      return false;
    }
  });
};
