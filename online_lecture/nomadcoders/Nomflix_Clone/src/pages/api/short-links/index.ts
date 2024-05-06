import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';
import createShortURL from '@/utils/createShortURL';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const shortLinks = await ShortLink.find()
      res.status(200).send(shortLinks);
      break;

    case 'POST':
      const {title, url} = req.body;
      const shortUrl = createShortURL(url);
      const newShortLink = await ShortLink.create({
        title,
        url,
        shortUrl
      });
      res.status(201).send(newShortLink);
      break;

    default:
      res.status(404).send(null);
  }
}