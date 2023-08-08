import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { api } from './api/request';
import ToggleThemeButton from './component/ToggleThemeButton';
import Hero from './component/Hero';
import ResultContainer from './component/ResultContainer';
import Footer from './component/Footer';
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
                <Hero query={query} setQuery={setQuery} />
                <ResultContainer data={data} />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
