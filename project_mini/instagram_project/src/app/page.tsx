import FollowingBar from "@/components/FollowingBar/FollowingBar";
import PostList from "@/components/PostList/PostList";
import SideBar from "@/components/SideBar/SideBar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { HomePageStyled } from '@/styles/pageStyled/HomePageStyled';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if(!session) return
  const user = session?.user;

  return (
    <HomePageStyled className="homePage">
      <div>
        <FollowingBar />
        <PostList />
      </div>
      <div className="sidebar-inner">
        <SideBar user={user}/>
      </div>
    </HomePageStyled>
  );
}
