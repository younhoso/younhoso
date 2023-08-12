import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { api } from './api/request';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
import { DataContext, QueryContext } from './context/DataContext';
import './App.css';

const Container = styled.div`
    position: relative;
    background-color: var(--primary);
    min-height: 100vh;
`;

function App() {
    const [data, setData] = useState({});
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetch = async () => {
            const data = await api.getProductData({ q: query });
            setData(data);
        };
        fetch();
    }, [query]);

    return (
        <>
            <Container>
                <QueryContext.Provider value={{ query, setQuery }}>
                    <Hero />
                </QueryContext.Provider>
                <DataContext.Provider value={{ data }}>
                    <ResultContainer />
                </DataContext.Provider>
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
