"use client";
import clsx from "clsx";
import { ShortLinkListStyled } from "./styled";
// import calendarIcon from "@/public/calendar.svg";
// import linkIcon from "@/public/link.svg";
// import replyIcon from "@/public/reply.svg";
import Card from "../Card/Card";
import Image from "next/image";
import Button from "../Button/Button";
import Link from "../Link/Link";
import axios from "axios";
import { useState } from "react";

interface ShortLink {
  _id: string;
  title: string;
  url: string;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ShortLinkItemsProps {
  items: ShortLink[];
}

interface ShortLinkItemProps {
  item: ShortLink;
  onDelete: (v: string) => void;
}

function ShortLinkItem({ item, onDelete }: ShortLinkItemProps) {
  return (
    <Card>
      <div>
        <div>
          <div>{item.title}</div>
          <div>
            {/* <Image src={calendarIcon} alt="calendar" /> */}
            {/* {formatDate(item.createdAt)} */}
          </div>
        </div>
        <div>
          <Link
            variant="outline"
            type="button"
            href={`/short-links/${item._id}`}
          >
            수정
          </Link>
          <Button
            variant="minimal"
            type="button"
            onClick={() => onDelete(item._id)}
          >
            삭제
          </Button>
        </div>
      </div>
      <Card.Footer>
        <div>
          {/* <Image src={linkIcon} alt="link" /> */}
          <Link variant="primary" href={`/${item.shortUrl}`} target="_blank">
            {process.env.NEXT_PUBLIC_BASE_URL}/{item.shortUrl}
          </Link>
        </div>
        <div>
          {/* <Image src={replyIcon} alt="reply" /> */}
          <Link variant="secondary" href={item.url} target="_blank">
            {item.url}
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default function ShortLinkList({
  items: initialShortLinks,
}: ShortLinkItemsProps) {
  const [shortLinks, setShortLinks] = useState(initialShortLinks);

  const onDelete = (id: string) => {
    axios.delete(`/api/short-links/${id}`);
    setShortLinks((prev) => prev.filter((v) => v._id !== id));
  };

  return (
    <ShortLinkListStyled className={clsx("ShortLinkListStyled")}>
      <ul>
        {shortLinks.map((url) => (
          <li key={url._id}>
            <ShortLinkItem item={url} onDelete={() => onDelete(url._id)} />
          </li>
        ))}
      </ul>
    </ShortLinkListStyled>
  );
}
