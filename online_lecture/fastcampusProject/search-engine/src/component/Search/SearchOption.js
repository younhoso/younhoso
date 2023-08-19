import { useContext } from 'react';
import styled from 'styled-components';
import { QueryContext } from '../../context/DataContext';

const SearchOptionContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;

const SearchOptionUl = styled.ul`
    padding: 0;
`;

const SearchOptionLi = styled.li`
    list-style: none;
    margin: 16px 0;
`;

const SearchOptionLabel = styled.p`
    border: 1px solid #4cabff;
    color: #4cabff;
    padding: 4px;
    border-radius: 16px;
`;

const SearchOption = () => {
    const { setOrder, setPerPage } = useContext(QueryContext);

    return (
        <SearchOptionContainer>
            <SearchOptionUl>
                <SearchOptionLi>
                    <SearchOptionLabel>정렬</SearchOptionLabel>
                    <form id="order" onChange={(e) => setOrder(e.target.value)}>
                        <input
                            type="radio"
                            name="order"
                            id="latest"
                            value="latest"
                        />
                        <label htmlFor="latest">최신순</label>
                        <input
                            type="radio"
                            name="order"
                            id="popular"
                            value="popular"
                            defaultChecked={true}
                        />
                        <label htmlFor="popular">인기순</label>
                    </form>
                </SearchOptionLi>
                <SearchOptionLi>
                    <SearchOptionLabel>사진 방향</SearchOptionLabel>
                    <form
                        id="orientation"
                        onChange={(e) => setOrder(e.target.value)}
                    >
                        <input
                            type="radio"
                            name="orientation"
                            id="all"
                            value="all"
                            defaultChecked={true}
                        />
                        <label htmlFor="all">모두</label>
                        <input
                            type="radio"
                            name="orientation"
                            id="horizontal"
                            value="horizontal"
                        />
                        <label htmlFor="horizontal">가로</label>
                        <input
                            type="radio"
                            name="orientation"
                            id="vertical"
                            value="vertical"
                        />
                        <label htmlFor="vertical">세로</label>
                    </form>
                </SearchOptionLi>
                <SearchOptionLi>
                    <SearchOptionLabel>페이지 당 갯수</SearchOptionLabel>
                    <form
                        id="per_page"
                        onChange={(e) => setPerPage(e.target.value)}
                    >
                        <input
                            type="radio"
                            name="per_page"
                            id="10"
                            value={10}
                        />
                        <label htmlFor="10">10</label>
                        <input
                            type="radio"
                            name="per_page"
                            id="20"
                            value={20}
                            defaultChecked={true}
                        />
                        <label htmlFor="20">20</label>
                        <input
                            type="radio"
                            name="per_page"
                            id="30"
                            value={30}
                        />
                        <label htmlFor="10">30</label>
                    </form>
                </SearchOptionLi>
            </SearchOptionUl>
        </SearchOptionContainer>
    );
};

export default SearchOption;
