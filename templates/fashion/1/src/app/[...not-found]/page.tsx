import clsx from "clsx";
import { NotFoundPageStyled } from '@/styles/pageStyled/NotFoundPageStyled';
import Link from "next/link";

export default function NotFoundPage() {
 
 return (
   <NotFoundPageStyled className={clsx('NotFound')}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
   </NotFoundPageStyled>
 );
};