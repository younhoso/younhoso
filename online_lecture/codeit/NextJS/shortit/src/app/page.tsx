"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { HomePageStyled } from "@/styles/pageStyled/HomePageStyled";
import copyToClipboard from "@/utils/copyToClipboard";
import axios from "@/libs/axios";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
  }

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await axios.post("/api/short-links/", {
      title: url,
      url,
    });
    const newShortUrl = res.data.shortUrl;
    setShortUrl(newShortUrl);
  }

  async function handleCopy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.select();
      const text = inputRef.current.value;
      await copyToClipboard(text);
      alert("복사했습니다. ctrl + v로 붙여넣으세요");
    }
  }

  return (
    <HomePageStyled>
      <div className="title-inner">
        <div>긴 주소를 짧은 주소로 줄이세요!</div>
        <form onSubmit={handleCreate}>
          <Input className={"input"} value={url} onChange={handleChange} />
          <Button className={"test"} disabled={!url}>
            줄이기
          </Button>
        </form>
        {shortUrl && (
          <form onSubmit={handleCopy}>
            <Input
              readOnly
              value={`${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`}
              ref={inputRef}
            />
            <Button variant="secondary">복사하기</Button>
          </form>
        )}
      </div>
    </HomePageStyled>
  );
}
