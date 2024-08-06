import { NextApiRequest, NextApiResponse } from 'next';
import { decode, getToken } from 'next-auth/jwt';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';
import formidable from 'formidable';
import fs from 'fs';

export const parseForm = async (
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    try {
      form.parse(req, function (err, fields, files) {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET!,
    raw: true,
  });
  const session = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!session?.accessToken) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST' || req.method === 'PATCH') {
    try {
      const { fields, files } = await parseForm(req);

      const id = req.method === 'PATCH' && fields?.id ? fields?.id[0] : undefined;
      const name = fields?.name ? fields?.name[0] : undefined;
      const phoneNumber = fields?.phoneNumber ? fields?.phoneNumber[0] : undefined;
      const email = fields?.email ? fields?.email[0] : undefined;
      const address = fields?.address ? fields?.address[0] : undefined;
      const title = fields?.title ? fields?.title[0] : undefined;
      const content = fields?.content ? fields?.content[0] : undefined;

      const contentFile1FilePath = files?.contentFile1
        ? files?.contentFile1[0].filepath
        : fields?.contentFile1 && fields?.contentFile1[0] === 'DELETE'
          ? null
          : undefined;
      const contentFile2FilePath = files?.contentFile2
        ? files?.contentFile2[0].filepath
        : fields?.contentFile2 && fields?.contentFile2[0] === 'DELETE'
          ? null
          : undefined;
      const contentFile3FilePath = files?.contentFile3
        ? files?.contentFile3[0].filepath
        : fields?.contentFile3 && fields?.contentFile3[0] === 'DELETE'
          ? null
          : undefined;

      if (!name || !phoneNumber || !email || !address || !title || !content) {
        return res.status(400).json({ error: 'Wrong Parameters' });
      }

      const formData = new FormData();
      formData.append(
        'req',
        JSON.stringify({
          name,
          phoneNumber,
          email,
          address,
          title,
          content,
          ...(contentFile1FilePath === null
            ? { isDeleteContentFile1: true }
            : { isDeleteContentFile1: false }),
          ...(contentFile2FilePath === null
            ? { isDeleteContentFile2: true }
            : { isDeleteContentFile2: false }),
          ...(contentFile3FilePath === null
            ? { isDeleteContentFile3: true }
            : { isDeleteContentFile3: false }),
        }),
        {
          contentType: 'application/json',
        },
      );

      if (contentFile1FilePath) {
        formData.append(
          'contentFile1',
          fs.createReadStream(contentFile1FilePath),
          files?.contentFile1![0].originalFilename ?? undefined,
        );
      }

      if (contentFile2FilePath) {
        formData.append(
          'contentFile2',
          fs.createReadStream(contentFile2FilePath),
          files?.contentFile2![0].originalFilename ?? undefined,
        );
      }

      if (contentFile3FilePath) {
        formData.append(
          'contentFile3',
          fs.createReadStream(contentFile3FilePath),
          files?.contentFile3![0].originalFilename ?? undefined,
        );
      }

      // call
      if (id && req.method === 'PATCH') {
        const result = await axios.patch<{
          id: string;
          memberId: string;
          memberType: string;
          name: string;
          phoneNumber: string;
          email: string;
          address: string;
          title: string;
          content: string;
          createdAt: string;
        }>(`${process.env.DELIVERY_API_URL}/content/relay/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary(),
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (result.status == 200) {
          return res.status(200).send(result.data);
        } else {
          return res.status(result.status).send(result.data);
        }
      } else {
        const result = await axios.post<{
          id: string;
          memberId: string;
          memberType: string;
          name: string;
          phoneNumber: string;
          email: string;
          address: string;
          title: string;
          content: string;
          createdAt: string;
        }>(`${process.env.DELIVERY_API_URL}/content/relay`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data; boundary=' + formData.getBoundary(),
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (result.status == 200) {
          return res.status(200).send(result.data);
        } else {
          return res.status(result.status).send(result.data);
        }
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response) {
        return res.status(error?.response.status).send(error.response.data);
      } else {
        return res.status(500).send((error as any).message);
      }
    }
  }
}
