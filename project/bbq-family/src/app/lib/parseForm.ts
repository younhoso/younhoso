import type { NextRequest } from 'next/server';

import formidable from 'formidable';

export const parseForm = async (
  req: any,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  console.log(req);
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
