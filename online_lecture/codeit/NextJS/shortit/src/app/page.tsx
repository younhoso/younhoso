"use client";
import banner from "@/assets/images/main/main.webp";
import { HomePageStyled } from "@/styles/pageStyled/HomePageStyled";
import useSWR from "swr";

export default function HomePage() {
 // POST 요청을 보내는 함수
 const createShortLink = async () => {
  try {
    const response = await fetch('/api/short-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '새로운 타이틀',
        url: 'https://example.com',
        shortUrl: 'exampleShort',
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();
    console.log("Created ShortLink:", data);
  } catch (error) {
    console.error("Failed to create ShortLink:", error);
  }
};


  return (
    <HomePageStyled>
      <div className="title-inner">
        <h3>boilerplate.</h3>
        <p>triplexstudio</p>
        <button onClick={createShortLink}>Create ShortLink</button>
      </div>
    </HomePageStyled>
  );
}
