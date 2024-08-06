import { Flex, TableCell, TableRow, Text, TextInput } from '@tremor/react';
import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { returnMenuType } from '@/app/utils/changeValueType';
import { TableRollCellProps } from '@/pages/api/menu/list';

import CustomButton from './CustomButton';

interface StatusIndicatorProps {
  status: boolean;
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <p className={status ? 'text-[#00C9B5]' : 'text-[#E52143]'}>{status ? '활성화' : '비활성화'}</p>
  );
}

export default function TableRollCell({
  id,
  isEcouponOnlyMenu,
  menuType,
  categories,
  menuImageUrl,
  menuName,
  menuPrice,
  isActive,
  isDisplay,
  showPriority,
  updatePriority,
  menuGroup,
  thisCategory,
}: TableRollCellProps) {
  const [priorityUpdateVlue, setPriorityUpdateVlue] = useState(thisCategory?.priority);
  const router = useRouter();

  const statusList = [
    { key: 'isActive', value: isActive },
    { key: 'isDisplay', value: isDisplay },
  ];

  const handleValueChange = (value: number) => {
    if (isNaN(Number(value))) {
      alert('숫자만 입력 가능합니다.');
    }

    setPriorityUpdateVlue(value);
  };

  return (
    <TableRow className="border hover:bg-gray-100">
      <TableCell className="border-r">
        <Flex justifyContent="center" className="w-auto">
          <Text>{id}</Text>
        </Flex>
      </TableCell>

      {showPriority && (
        <TableCell className="border-r">
          <Flex justifyContent="center" className="w-auto">
            <Flex justifyContent="start" className="w-auto ml-5">
              <TextInput
                className="min-w-[100px] w-[100px] m-0 !rounded-r-none"
                placeholder="우선 순위"
                onChange={e => handleValueChange(Number(e.target.value))}
                value={`${priorityUpdateVlue}`}
              />
              <CustomButton
                type="tertiary"
                className="!rounded-l-none"
                onClick={() => {
                  if (categories) {
                    if (!menuGroup.length) {
                      return;
                    }

                    if (!thisCategory) {
                      return;
                    }

                    updatePriority(thisCategory.id, Number(priorityUpdateVlue), id);
                  }
                }}
              >
                저장
              </CustomButton>
            </Flex>
          </Flex>
        </TableCell>
      )}

      <TableCell className="border-r">
        {isEcouponOnlyMenu === true ? 'E-쿠폰' : returnMenuType(menuType)}
      </TableCell>
      <TableCell className="border-r">
        {categories && categories.length > 0
          ? categories
              ?.map((category: { categoryName: string }) => {
                return category.categoryName;
              })
              .join(' / ')
          : '-'}
      </TableCell>
      <TableCell className="!text-left border-r">
        <Image
          quality={100}
          alt="menu image"
          src={menuImageUrl ? menuImageUrl : '/images/no-image.png'}
          width={100}
          height={100}
          className="inline border"
        />
        <Text className="inline ml-3">{menuName}</Text>
      </TableCell>
      <TableCell className="border-r">{menuPrice.toLocaleString()}원</TableCell>
      {statusList.map(statusItem => (
        <TableCell key={statusItem.key} className="border-r !text-center">
          <StatusIndicator status={statusItem.value} />
        </TableCell>
      ))}
      {/* <TableCell className="border-r !text-center">
        {isActive ? <p className='text-[#00C9B5]'>활성화</p> : <p className='text-[#E52143]'>비활성화</p>}
      </TableCell>
      <TableCell className="border-r !text-center">
        {isDisplay ? <p className='text-[#00C9B5]'>활성화</p> : <p className='text-[#E52143]'>비활성화</p>}
      </TableCell> */}
      <TableCell>
        <CustomButton
          className="!bg-[#fff] !text-[#46477A] !border-[#DCDDE2] !rounded-none"
          onClick={
            isEcouponOnlyMenu
              ? () => router.push(`/menu/e-coupon-menu/edit?id=${id}`)
              : () => router.push(`/menu/register/edit?id=${id}`)
          }
          type={'secondary'}
        >
          수정
        </CustomButton>
      </TableCell>
    </TableRow>
  );
}
