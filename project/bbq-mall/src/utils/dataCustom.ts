import dayjs from 'dayjs';

import { MultiLevelCategory } from '@/types';
import { Event } from '@/types/Event';
import { Categories, CategoryNo } from '@/types/categorymenu';
import { Banner, BannerSections } from '@/types/mainBnner';
import { OptionRecord } from '@/types/productDetail';
import { Option } from '@/types/productOption';

const flatten: (a?: MultiLevelCategory[]) => MultiLevelCategory[] = (
  arr: MultiLevelCategory[] = [],
) => {
  return arr.reduce((acc: MultiLevelCategory[], cur) => {
    return [...acc, cur, ...flatten(cur.children)];
  }, []);
};

export const getFlattenData = (
  arr: MultiLevelCategory[] | undefined = [],
  categoryNumber: number,
  isAllPage?: boolean,
) => {
  const _flattenData = flatten(arr);
  const thisCategory = _flattenData.find(v => v.categoryNo === categoryNumber);

  return (thisCategory?.depth ?? 0) < (isAllPage ? 2 : 3)
    ? thisCategory
    : _flattenData.find(v => v.children.some(k => k.categoryNo === categoryNumber));
};

// 이벤트 페이지에서 data를 기준으로 종료된 이벤트, 진행중 이벤트를 구분합니다.
export const eventsDivision = (data: Event[], currentTime: string): [Event[], Event[]] => {
  const ongoingEvents: Event[] = [];
  const endedEvents: Event[] = [];

  data.forEach((item: Event) => {
    const eventEndTime = dayjs(item.endYmdt, 'YYYY-MM-DD HH:mm:ss');

    if (eventEndTime.isAfter(currentTime)) {
      ongoingEvents.unshift(item);
    } else {
      endedEvents.unshift(item);
    }
  });

  return [ongoingEvents, endedEvents];
};

// 메인 페이지에서 최상단 배너의 데이터를 평탄화하여 꺼내오는 함수
export function flattenBanners(
  bannerSections: BannerSections,
): (Banner & { height: number; width: number })[] {
  return bannerSections.flatMap(section =>
    section.accounts.flatMap(account =>
      account.banners.map(banner => ({ ...banner, height: account.height, width: account.width })),
    ),
  );
}

/* 
  상세페이지 상품 옵션 선택 영역 입니다. 
  5뎁스까지 순회하고 label기준으로 객체를 만들어서 리턴합니다.
*/
export function getCustomMultiLevelOptions(multiLevelOptions: Option[] = []): OptionRecord {
  const flattenOptions = (options: Option[], depth = 0): OptionRecord => {
    if (depth > 5) return {};

    return options.reduce(
      (
        acc: Record<
          string,
          {
            value: string;
            buyPrice: number;
            optionNo: number;
            orderCnt: number;
            addPrice: number;
            stockCnt: number;
          }[]
        >,
        option: Option,
      ) => {
        const { label, value, children, buyPrice, optionNo, addPrice, stockCnt } = option;
        const newOption = { value, buyPrice, optionNo, orderCnt: 1, addPrice, stockCnt };

        if (!acc[label]) {
          acc[label] = [];
        }

        const optionExists = acc[label].some(
          existing => JSON.stringify(existing) === JSON.stringify(newOption),
        );
        if (!optionExists) {
          acc[label].push(newOption);
        }

        if (children) {
          const childOptions = flattenOptions(children, depth + 1);
          for (let childLabel in childOptions) {
            if (!acc[childLabel]) {
              acc[childLabel] = [];
            }
            acc[childLabel] = acc[childLabel].concat(childOptions[childLabel]);
          }
        }

        return acc;
      },
      {},
    );
  };

  return flattenOptions(multiLevelOptions);
}

/* 
  카테고리 데이터에서 "전체상품"의 하위 children의 데이터들중 원하는 뎁스의 데이터를 평탄화하여 꺼내오는 함수
*/
export const flattenData = (data?: Categories[], targetDepth: number = 1) => {
  // 결과를 담을 배열
  let result: Categories[] = [];

  // 재귀적으로 데이터를 탐색하고 평탄화하는 함수
  function traverse(currentData: Categories, currentDepth: number) {
    // 현재 데이터의 depth가 목표 depth와 일치할 경우 결과 배열에 추가
    if (currentDepth === targetDepth) {
      result.push(currentData);
    } else if (currentData.children && currentData.children.length > 0) {
      // 자식 노드가 있고 아직 목표 depth에 도달하지 않았다면
      // 자식 노드들에 대해 재귀 호출
      currentData.children.forEach(child => traverse(child, currentDepth + 1));
    }
  }

  // 초기 데이터 배열에 대해 함수를 호출하여 탐색 시작
  data?.forEach(item => traverse(item, 1)); // 최상위 depth는 1로 시작

  // 결과 반환
  return result;
};
