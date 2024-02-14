import HomeIcon from "@/components/ui/icons/HomeIcon";
import HomeFillIcon from "@/components/ui/icons/HomeFillIcon"
import SearchIcon from "@/components/ui/icons/SearchIcon";
import SearchFillIcon from "@/components/ui/icons/SearchFillIcon";
import NewIcon from "@/components/ui/icons/NewIcon";
import NewFillIcon from "@/components/ui/icons/NewFillIcon";

export const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />
  },
  
];