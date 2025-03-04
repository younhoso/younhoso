"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  const handleLogout = () => {
    console.log("로그아웃");
  };

  if (!session) {
    return <div>로그인되지 않았습니다.</div>;
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>사용자</AvatarFallback>
      </Avatar>
      <div>
        <p>{session.user?.name}</p>
        <p>{session.user?.email}</p>
      </div>
      <Button variant="outline" onClick={handleLogout} className="ml-4">
        로그아웃
      </Button>
    </div>
  );
}
