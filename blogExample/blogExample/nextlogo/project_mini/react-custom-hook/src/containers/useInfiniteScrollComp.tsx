import { useEffect, useState } from 'react';
import { api } from './api/request';
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const UseInfiniteScrollComp = () => {
  const [data, setData] = useState({ total: 0, totalHits: 0, hits: [] });
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState('popular');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

  const { lastItemRef } = useInfiniteScroll(() => {
      setPage((prev) => prev + 1);
  });

  useEffect(() => {
    const fetch = async () => {
        const data = await api.getProductData({
            q: query,
            orientation: orientation,
            order: order,
            page: page,
            per_page: perPage,
        });
        if (page === 1) {
            setData(data);
        } else {
            setData((prev) => ({
                //기존 값이 누적.
                ...prev,
                hits: [...prev.hits, ...data.hits], //data.hits의 실제 데이터 fetch로 불러올때 타입 호환성 문제가 사라집니다.
            }));
        }
    };
    fetch();
  }, [query, orientation, order, page, perPage]);

  return(
    <div>
    {page !== numOfPages && (
      <div ref={lastItemRef}>
          {/* <EmptyResult isLoading={data.totalHits} /> */}
          {data.totalHits ? (
                <>
                    <h2>로딩중...</h2> 잠시만 기다려주세요.
                </>
            ) : (
                <>
                    <h2>저런! 😔</h2>
                    검색 결과가 없습니다.
                    <br />
                    다른 키워드로 다시 검색해주세요.
                </>
            )}
      </div>
    )}
    </div>
  )
}

export default UseInfiniteScrollComp;