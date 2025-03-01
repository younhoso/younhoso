import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { api } from './api/request';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/Image/ImageContainer';
import Footer from './component/Footer';
import { DataContext, QueryContext } from './context/DataContext';
import './App.css';
import EmptyResult from './component/EmptyResult';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import { IGetPapersResponse, Order, Orientation } from 'types';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState<IGetPapersResponse>({
        total: 0,
        totalHits: 0,
        hits: [],
    });
    const [query, setQuery] = useState('');
    const [order, setOrder] = useState<Order>('popular');
    const [orientation, setOrientation] = useState<Orientation>('all');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [currentImageDetail, setCurrentImageDetail] = useState(false);
    const { lastItemRef } = useInfiniteScroll(() => {
        setPage((prev) => prev + 1);
    });

    const numOfPages = data.totalHits ? Math.ceil(data.totalHits / perPage) : 0;

    useEffect(() => {
        const fetch = async () => {
            const data = await api.getProductData({
                q: query,
                orientation: orientation,
                order: order,
                page: page.toString(),
                per_page: perPage.toString(),
            });
            if (page === 1) {
                setData(data);
            } else {
                setData((prev) => ({
                    //기존 값이 누적.
                    ...prev,
                    hits: [...prev.hits, ...data.hits],
                }));
            }
        };
        fetch();
    }, [query, orientation, order, page, perPage]);

    useEffect(() => {
        setPage(1);
    }, [query, orientation, order, perPage]);

    return (
        <>
            <Container>
                <QueryContext.Provider
                    value={{
                        query,
                        setQuery,
                        setOrder,
                        setOrientation,
                        setPerPage,
                    }}
                >
                    <Hero />
                </QueryContext.Provider>
                <DataContext.Provider
                    value={{
                        data,
                        page,
                        setPage,
                        numOfPages,
                        currentImageDetail,
                        setCurrentImageDetail,
                    }}
                >
                    <ResultContainer />
                </DataContext.Provider>
                {page !== numOfPages && (
                    <div ref={lastItemRef}>
                        <EmptyResult isLoading={data.totalHits} />
                    </div>
                )}
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
