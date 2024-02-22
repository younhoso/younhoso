import FollowingBar from "@/components/FollowingBar/FollowingBar";
import PostList from "@/components/PostList/PostList";
import SideBar from "@/components/SideBar/SideBar";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  return (
    <section>
      <FollowingBar />
      <PostList />
      {/* <SideBar user={user}/> */}
    </section>
  );
}
