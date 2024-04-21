"use client";
import axios from "axios";
import clsx from "clsx";
import { ShortLinksPageStyled } from "@/styles/pageStyled/ShortLinksPageStyled";
import ShortLinkForm from "@/components/ShortLinkForm/ShortLinkForm";
import { useRouter } from "next/navigation";

interface SubmitValues {
  title: string;
  url: string;
}

export default function shortLinksCreatePage() {
  const router = useRouter();
  async function handleSubmit(values: SubmitValues) {
    axios.post("/api/short-links/", values);
    router.push("/short-links/");
  }

  return (
    <ShortLinksPageStyled className={clsx("page")}>
      short-links list
    </ShortLinksPageStyled>
  );
}
