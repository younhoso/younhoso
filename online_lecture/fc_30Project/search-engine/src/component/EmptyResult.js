import styled from 'styled-components';

const EmptyResultContainer = styled.div`
    width: 100%;
    text-align: center;
    padding: 16px 0;
    line-height: 1.3;
    color: var(--highlight);
`;

const EmptyResult = () => {
    return (
        <EmptyResultContainer>
            <h2>저런! 😔</h2>
            검색 결과가 없습니다.
            <br />
            다른 키워드로 다시 검색해주세요.
        </EmptyResultContainer>
    );
};

export default EmptyResult;
