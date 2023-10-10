'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import SnsLogoBtn from "./ul/SnsLogoBtn";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";


export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user)

  return (
    <div>
      <Link href="/">
        <h1>Instantgram</h1>
      </Link>
      <nav>
        <ul>
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} />
              </Link>
            </li>
          )}
          {session ? (
            <SnsLogoBtn text="Sign out" onClick={() => signOut()} />
          ) : (
            <SnsLogoBtn text="Sign in" onClick={() => signIn()} />
          )}
        </ul>  
      </nav>
    </div>
  );
} 