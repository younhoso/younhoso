import clsx from 'clsx';
import { SearchPageStyled } from '@/styles/pageStyled/SearchPageStyled';
import UserSearch from '@/components/UserSearch/UserSearch';

export default function SearchPage() {
 
 return (
   <SearchPageStyled className={clsx('Searchpage')}>
    <UserSearch />
   </SearchPageStyled>
 );
};