import dbConnect from '@/db/dbConnect';
import ShortLink from '@/db/models/ShortLink';
import createShortURL from '@/lib/createShortURL';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      const { title, url } = req.body;
      const shortUrl = createShortURL(url);
      const shortLink = await ShortLink.create({
        title,
        url,
        shortUrl
      });
      res.status(201).send(shortLink);
      break;

    case 'GET':
      const shortLinks = await ShortLink.find();
      res.send(shortLinks);
      break;

    default:
      res.status(404).send();
      break;
  }
}
