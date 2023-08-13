import { useEffect } from 'react';
import useTitle from '../hooks/useTitle';

const UseTitleComp = () => {
  const titleUpdator = useTitle('Loading...');

  useEffect(() => {
    const updateTitle = setTimeout(() => titleUpdator('Home'), 3000);

    return () => clearTimeout(updateTitle);
  }, [titleUpdator]);

  return <div>see the web-page's title. it will change the title.</div>;
};

export default UseTitleComp;
