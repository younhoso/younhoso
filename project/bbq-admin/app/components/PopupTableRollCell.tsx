import { Flex, TableCell, TableRow, Text } from '@tremor/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';


import CustomButton from './CustomButton';
import { Popup } from '@/pages/api/content/popup';


function StatusIndicator(status: boolean) {
  return (
    <p className={status ? 'text-[#00C9B5]' : 'text-[#E52143]'}>{status ? '활성화' : '비활성화'}</p>
  );
}

export default function PopupTableRollCell({
  id,
  imageUrl,
  startDate,
  endDate,
  isActive,
  createdAt,
}: Popup) {
  const router = useRouter();
  return (
    <TableRow className="border hover:bg-gray-100">
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{id}</Text>
        </Flex>
      </TableCell>
      <TableCell className="!text-center ">
        <Image
          quality={100}
          alt="menu image"
          src={imageUrl ? imageUrl : '/images/no-image.png'}
          width={100}
          height={100}
          className="inline border"
        />
      </TableCell>
      <TableCell className="!text-center">{StatusIndicator(isActive)}</TableCell>
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{startDate}</Text>
        </Flex>
      </TableCell>
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{endDate}</Text>
        </Flex>
      </TableCell>
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{createdAt}</Text>
        </Flex>
      </TableCell>
      <TableCell>
        <CustomButton
          className="!bg-[#fff] !text-[#46477A] !border-[#DCDDE2] !rounded-none"
          type={'secondary'}
          onClick={() => router.push(`/content/popup/register?id=${id}`)}
        >
          수정
        </CustomButton>
      </TableCell>
    </TableRow>
  );
}
