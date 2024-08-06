import { FC, useCallback, useState } from 'react';

import styled from 'styled-components';

import { BranchAPI } from '@/apis';
import { Box, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { FONTSIZE_14, FONTSIZE_18, FONTSIZE_20, PLANCK } from '@/constants';
import { Branch } from '@/types';
import { parseApiError } from '@/utils';

export interface SearchBranchFormProps {
  handleSubmit: ({ branch }: { branch: Branch }) => void;
}

export interface SearchBranchFormComponentProps extends SearchBranchFormProps {}

export const SearchBranchForm: FC<SearchBranchFormComponentProps> = ({ handleSubmit }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(undefined);

  const handleSearch = useCallback(async () => {
    try {
      const res = await BranchAPI.search({
        name: searchText,
        page: 1,
        size: 30,
      });
      setBranches(res.content);
      setSelectedBranch(undefined);
    } catch (err) {
      console.error(err);
      alert(parseApiError(err));
    }
  }, [searchText]);

  const handleSubmitButtonClick = useCallback(() => {
    if (!selectedBranch) return;
    handleSubmit({
      branch: selectedBranch,
    });
  }, [selectedBranch]);

  return (
    <div>
      <InputWrapper>
        <Icon src={'reading-glasses-black-line.svg'} size={28} />
        <Input
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
          }}
          onKeyDown={(e: any) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </InputWrapper>
      {!branches.length ? (
        <Box padding={PLANCK * 8}>
          <Text size={FONTSIZE_20}>이렇게 검색해 보세요</Text>
          <Space.H4 />
          <>
            <Flex.RSC>
              <Icon src="pin-red.webp" size={14} />
              <Space.V2 />
              <Text>도로명 + 건물번호</Text>
            </Flex.RSC>
            <Space.H2 />
            <Flex.RSC>
              <Space.V5 />
              <Text color={'#777777'}>예시: 비비로 24번길 1, 판교역로 124</Text>
            </Flex.RSC>
          </>
          <Space.H3 />
          <>
            <Flex.RSC>
              <Icon src="pin-red.webp" size={14} />
              <Space.V2 />
              <Text>지역명 + 번지</Text>
            </Flex.RSC>
            <Space.H2 />
            <Flex.RSC>
              <Space.V5 />
              <Text color={'#777777'}>예시: 비비동 24-1, 서초동 254</Text>
            </Flex.RSC>
          </>
          <Space.H3 />
          <>
            <Flex.RSC>
              <Icon src="pin-red.webp" size={14} />
              <Space.V2 />
              <Text>건물명, 아파트명</Text>
            </Flex.RSC>
            <Space.H2 />
            <Flex.RSC>
              <Space.V5 />
              <Text color={'#777777'}>예시: 분당 주공, 연수동 주공3차</Text>
            </Flex.RSC>
          </>
        </Box>
      ) : (
        <>
          <Space.H4 />
          <div style={{ height: 320, overflowY: 'scroll' }}>
            <Grid columnCount={1} gap={PLANCK * 2}>
              {branches.map((branch, index) => (
                <Box
                  key={index}
                  background="#f9fafb"
                  border={selectedBranch?.branchId === branch.branchId ? 'red' : 'lightgray'}
                  padding={PLANCK * 3}
                  shape={'round'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedBranch(branch);
                  }}
                  shadow="angle"
                >
                  <Text size={FONTSIZE_18}>{branch.familyName}</Text>
                  <Space.H2_5 />
                  <Flex.RSC>
                    <TextWithBackground inline>주소</TextWithBackground>
                    <Text inline size={FONTSIZE_14}>
                      {branch.address}
                    </Text>
                  </Flex.RSC>
                </Box>
              ))}
            </Grid>
            <Space.H3 />
          </div>
        </>
      )}

      <Button
        disabled={!selectedBranch}
        full
        color={'red'}
        shape={'round'}
        text="완료"
        onClick={() => handleSubmitButtonClick()}
      />
    </div>
  );
};

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 54px;
  width: 100%;
  padding: 0 ${PLANCK * 2}px 0 ${PLANCK * 2}px;
  border-bottom: solid 2px #000000;

  & > *:not(:nth-child(1)) {
    margin-left: ${PLANCK * 4}px;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 24px;
  font-weight: 500;

  &:focus {
    outline-width: 0;
    outline: none;
  }

  ::placeholder {
    color: #cccfde;
  }
`;

const TextWithBackground = styled(Text)`
  padding: 5px 10px;
  border-radius: 7px;
  background-color: #e1e6eb;
  font-size: 12px;
  color: #777777;
  margin-right: 5px;
`;
