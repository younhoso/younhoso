import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';

import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();
  console.log(data);

  return (
    <>
      <div className="navbar">
        <Link href={'/'} className="navbar__logo">
          nextmap
        </Link>
        <div className="navbar__list">
          <Link href={'/stores'} className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href={'/stores/new'} className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href={'/users/likes'} className="navbar__list--item">
            찜한 가게
          </Link>
          <Link href={'/users/mypage'} className="navbar__list--item">
            마이페이지
          </Link>
          {status === 'authenticated' ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href={'/api/auth/signin'} className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        {/* mobile button */}
        <div className="navbar__button" onClick={() => setIsOpen(v => !v)}>
          {isOpen ? <AiOutlineClose /> : <BiMenu />}
        </div>
      </div>

      {/* mobile navbar */}
      {isOpen && (
        <div className="navbar--mobile">
          <div className="navbar__list--mobile">
            <Link href={'/stores'} className="navbar__list--item--mobile">
              맛집 목록
            </Link>
            <Link href={'/stores/new'} className="navbar__list--item--mobile">
              맛집 등록
            </Link>
            <Link href={'/users/likes'} className="navbar__list--item--mobile">
              찜한 가게
            </Link>
            <Link href={'/users/mypage'} className="navbar__list--item--mobile">
              마이페이지
            </Link>
            {status === 'authenticated' ? (
              <button
                type="button"
                onClick={() => signOut()}
                className="navbar__list--item--mobile"
              >
                로그아웃
              </button>
            ) : (
              <Link href={'/api/auth/signin'} className="navbar__list--item--mobile">
                로그인
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
