import clsx from "clsx";
import { ShortLinksPageStyled } from "@/styles/pageStyled/ShortLinksPageStyled";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import ShortLinkList from "@/components/ShortLinkList/ShortLinkList";

interface SubmitValues {
  title: string;
  url: string;
}

export default async function shortLinksCreatePage() {
  await dbConnect();
  const shortLinks = JSON.parse(JSON.stringify(await ShortLink.find()));

  return (
    <ShortLinksPageStyled className={clsx("page")}>
      <ShortLinkList items={shortLinks} />
    </ShortLinksPageStyled>
  );
}
