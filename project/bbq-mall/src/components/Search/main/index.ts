import SearchMobile from './mobile/SearchMobile';
import _Search from './pc/Search';

type SearchP = typeof _Search;

interface SearchType extends SearchP {
  Mobile: typeof SearchMobile;
}

const Search = _Search as SearchType;

Search.Mobile = SearchMobile;

export default Search;
