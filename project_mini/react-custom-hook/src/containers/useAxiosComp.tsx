import { LIST_MOVIES_URL } from '../constants';
import useAxios from '../hooks/useAxios';

const UseAxiosComp = () => {
  const { loading, error, data, refetch } = useAxios({ url: LIST_MOVIES_URL });

  return (
    <>
      <h1>
        {loading
          ? 'loading...'
          : data
          ? `status : ${data.status}`
          : error
          ? 'Error'
          : null}
      </h1>
      {!loading && <button onClick={refetch}>Refetch</button>}
    </>
  );
};

export default UseAxiosComp;
