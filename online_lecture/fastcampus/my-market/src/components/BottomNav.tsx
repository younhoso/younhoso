import Link from "next/link";
import { Home, Search, Cart, User } from "iconoir-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="btm-nav btm-nav-sm bg-base-100 border-t shadow-lg">
        <div className="w-full flex justify-around items-center">
          <Link
            href="/"
            className="text-base-content hover:text-primary active:text-primary flex flex-col items-center justify-center gap-1"
          >
            <Home width={24} height={24} />
            <span className="btm-nav-label text-xs">홈</span>
          </Link>
          <Link
            href="/search"
            className="text-base-content hover:text-primary active:text-primary flex flex-col items-center justify-center gap-1"
          >
            <Search width={24} height={24} />
            <span className="btm-nav-label text-xs">검색</span>
          </Link>
          <Link
            href="/cart"
            className="text-base-content hover:text-primary active:text-primary flex flex-col items-center justify-center gap-1"
          >
            <Cart width={24} height={24} />
            <span className="btm-nav-label text-xs">장바구니</span>
          </Link>
          <Link
            href="/profile"
            className="text-base-content hover:text-primary active:text-primary flex flex-col items-center justify-center gap-1"
          >
            <User width={24} height={24} />
            <span className="btm-nav-label text-xs">프로필</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
