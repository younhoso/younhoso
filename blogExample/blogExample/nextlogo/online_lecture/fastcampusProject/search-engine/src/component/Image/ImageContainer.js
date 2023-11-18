import styled from 'styled-components';
import DummyData from '../../asset/dummyData';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';
// import Pagination from './Pagination';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const Container = styled.div`
    max-width: 1830px;
    margin: 8px auto;
    padding-right: 8px;
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const ResultContainer = () => {
    const { data, currentImageDetail, setCurrentImageDetail } =
        useContext(DataContext);

    return (
        <Container>
            {/* ImgCard 클릭 시 해당 이미지의 정보로 ImageModal이 나타나야 합니다. */}
            {currentImageDetail && (
                <ImageModal
                    currentImageDetail={currentImageDetail}
                    setCurrentImageDetail={setCurrentImageDetail}
                />
            )}
            {/* {data.hits?.length > 0 && <Pagination />} */}
            <ResultsWrapper>
                {data.hits?.length > 0 &&
                    data.hits?.map((imgData) => (
                        <ImageCard
                            key={imgData.id}
                            imgData={imgData}
                            onClick={() => setCurrentImageDetail(imgData)}
                        />
                    ))}
            </ResultsWrapper>
        </Container>
    );
};

export default ResultContainer;
