import { redirect } from "next/navigation";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";

interface ShortUrlPageProps {
  params: { shortUrl: string };
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortUrl } = params;
  await dbConnect();
  const shortLink = await ShortLink.findOne({ shortUrl });
  if (shortLink) {
    redirect(shortLink.url);
  }
  redirect("/not-found");
}
