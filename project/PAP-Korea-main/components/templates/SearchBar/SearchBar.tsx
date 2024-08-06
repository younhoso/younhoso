import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSpring, animated, config, easings } from 'react-spring';

import { useRouter } from 'next/router';

import { useGet } from '~/apis';
import search from '~/assets/icon/search.svg';
import Svg from '~/components/atoms/Svg';
import { numberToRem } from '~/utils/rem';

import { SearchBarStyled } from './styled';

import clsx from 'clsx';
import { useFormik } from 'formik';

interface SearchBarProps {
  className?: string;
  ChangeSearchOpen: Function;
  searchON: any;
}

const SearchBar = ({
  className,
  ChangeSearchOpen,
  searchON,
}: SearchBarProps) => {
  const router = useRouter();
  const { data: hashTagDatas, isLoading } = useGet(`/post/getAllHashTag`);
  // console.log(hashTagDatas);

  const searchForm = useFormik({
    initialValues: {
      search: '',
    },
    async onSubmit(e: any) {
      if (searchForm.values.search.trim() === '') {
        return;
      }
      ChangeSearchOpen(false);

      router.push(`/search/${searchForm.values.search.replace(/#/g, '')}`);
    },
  });

  const clickGoResult = (val: string) => {
    ChangeSearchOpen(false);

    router.push(`/search/${val}`);
  };

  const testInputProps = useSpring({
    delay: 200,
    reset: useMemo(() => !searchON, [searchON]),
    from: {
      opacity: 0,
      x: 150,
    },

    to: {
      opacity: 1,
      x: 0,
    },

    config: {
      duration: 400,
      easing: easings.easeOutBack,
    },
  });

  const testSearchProps = useSpring({
    reset: useMemo(() => !searchON, [searchON]),
    from: {
      opacity: 0,
      x: 150,
    },
    to: {
      opacity: 1,
      x: 0,
    },

    config: {
      duration: 400,
      easing: easings.easeOutBack,
    },
  });

  const testDivProps = useSpring({
    reset: useMemo(() => !searchON, [searchON]),
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },

    config: {
      duration: 350,
    },
  });

  const testCloseProps = useSpring({
    delay: 500,
    reset: useMemo(() => !searchON, [searchON]),
    from: {
      x: 75,
      opacity: 0,
    },
    to: {
      x: 0,
      opacity: 1,
    },

    config: {
      duration: 300,
      easing: easings.easeOutBack,
    },
  });

  const searchValue = searchForm.values.search.toLocaleUpperCase();

  const searchData = useMemo(() => {
    if (!hashTagDatas?.length || searchValue === '') {
      return [];
    }

    return hashTagDatas
      .filter((x: any) => {
        return x.indexOf(searchValue) != -1;
      })
      .sort(
        (a: any, b: any) => a.indexOf(searchValue) - b.indexOf(searchValue),
      );
  }, [searchForm.values.search, hashTagDatas]);

  const splitWord = '꿹쀍쀍퀡쩕꿹뗅꿹쀍쀍뛝쀍뛝퀡뛝쀍뛝'; // ඞ 문자 구분을 위해 절대로 안쓸만한 단어를 넣었습니다.

  return (
    <SearchBarStyled className={clsx('searchBar', className, 'SearchOn')}>
      <animated.form onSubmit={searchForm.handleSubmit} style={testDivProps}>
        <animated.div style={testSearchProps}>
          <Svg
            icon={search}
            color="black"
            width={numberToRem(27, 1)}
            height={numberToRem(27, 1)}
          />
        </animated.div>
        <animated.input
          onInput={searchForm.handleChange}
          name="search"
          style={testInputProps}
          type="text"
          placeholder="SEARCH..."
          autoComplete="off"
          autoFocus={true}
        />
        <animated.div
          style={testCloseProps}
          className="SearchClose"
          onClick={() => ChangeSearchOpen()}
        >
          <div></div>
          <div></div>
        </animated.div>
      </animated.form>
      {searchData?.length ? (
        <div className="autocomplete">
          <div>
            {searchData?.slice(0, 7)?.map((x: any, i: number) => (
              <div key={i} onClick={() => clickGoResult(x)}>
                {/* {() => {
                  if (
                    searchForm.values.search.toLocaleUpperCase().indexOf(x) == 0
                  ) {
                    return <span className="bold">{x}</span>;
                  }
                  return <>{}</>;
                }} */}
                {/* {x.replace(/([0-9])/g, "$1 asdasd")} */}
                {x
                  .replace(
                    searchValue,
                    `${splitWord}${searchValue}${splitWord}`,
                  )
                  .split(splitWord)
                  .map((v: any) =>
                    v === searchValue ? (
                      <span className="bold">{searchValue}</span>
                    ) : (
                      <>{v}</>
                    ),
                  )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </SearchBarStyled>
  );
};

export default SearchBar;
