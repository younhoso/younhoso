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
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET!, raw: true });
  const session = await decode({ token: token, secret: process.env.NEXTAUTH_SECRET! });

  if (!session?.accessToken) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      const branchId = fields?.branchId ? fields?.branchId[0] : undefined;
      const name = fields?.name ? fields?.name[0] : undefined;
      const phoneNumber = fields?.phoneNumber ? fields?.phoneNumber[0] : undefined;
      const title = fields?.title ? fields?.title[0] : undefined;
      const content = fields?.content ? fields?.content[0] : undefined;
      const contentImage1FilePath = files?.contentImage1
        ? files?.contentImage1[0].filepath
        : undefined;
      const contentImage2FilePath = files?.contentImage2
        ? files?.contentImage2[0].filepath
        : undefined;
      const contentImage3FilePath = files?.contentImage3
        ? files?.contentImage3[0].filepath
        : undefined;

      if (!name || !phoneNumber || !title || !content) {
        return res.status(400).json({ error: 'Wrong Parameters' });
      }

      const formData = new FormData();
      formData.append(
        'req',
        JSON.stringify({
          ...(branchId ? { branchId } : {}),
          name,
          phoneNumber,
          title,
          content,
        }),
        {
          contentType: 'application/json',
        },
      );

      if (contentImage1FilePath) {
        formData.append('contentImage1', fs.createReadStream(contentImage1FilePath));
      }
      if (contentImage2FilePath) {
        formData.append('contentImage2', fs.createReadStream(contentImage2FilePath));
      }
      if (contentImage3FilePath) {
        formData.append('contentImage3', fs.createReadStream(contentImage3FilePath));
      }

      // call
      const result = await axios.post<{
        id: number;
        memberId: string;
        memberType: string;
        name: string;
        phoneNumber: string;
        title: string;
        content: string;
        branchId?: string;
        familyName: string;
        familyAddress: string;
        familyTel: string;
        createdAt: string;
      }>(`${process.env.DELIVERY_API_URL}/content/qna`, formData, {
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
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return res.status(error?.response.status).send(error.response.data);
      } else {
        return error;
      }
    }
  }
}
