import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import axios, { isAxiosError } from 'axios';
import FormData from 'form-data';

async function streamToUint8ArrayArray(stream: ReadableStream<Uint8Array>): Promise<Uint8Array[]> {
  const reader = stream.getReader();
  const result: Uint8Array[] = [];

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      if (value) {
        result.push(value);
      }
    }

    return result;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      // secureCookie: process.env.NODE_ENV == 'production' ? true : false,
    });

    if (token?.accessToken == undefined)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const fd = await req.formData();

    const file = fd.get('familyImage');

    if (file instanceof Blob) {
      const stream = file.stream();

      const chunks = await streamToUint8ArrayArray(stream);

      const buffer = Buffer.concat(chunks);

      const directusFormData = new FormData();
      directusFormData.append('familyImage', buffer, file.name);

      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_DELIVERY_API_URL}/family-admin/info/image`,
        directusFormData,
        {
          headers: {
            'Content-Type':
              'image/png; multipart/form-data; boundary=' + directusFormData.getBoundary(),
            Authorization: `Bearer ${token?.accessToken} `,
          },
        },
      );
      if (result.status == 200) {
        return NextResponse.json(result.data, { status: 200 });
      } else {
        return null;
      }
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      return NextResponse.json(error, { status: 500 });
    }
  }
}
