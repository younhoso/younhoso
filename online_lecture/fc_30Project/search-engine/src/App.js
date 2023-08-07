import styled from 'styled-components';
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
    return (
        <>
            <Container>
                <Hero />
                <ResultContainer />
                <Footer />
                <ToggleThemeButton />
            </Container>
        </>
    );
}

export default App;
