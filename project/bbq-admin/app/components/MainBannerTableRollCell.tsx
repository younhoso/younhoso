import { Flex, TableCell, TableRow, Text } from '@tremor/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Banner } from '@/pages/api/content/mainbanner';

import CustomButton from './CustomButton';

function StatusIndicator(status: boolean) {
  return (
    <p className={status ? 'text-[#00C9B5]' : 'text-[#E52143]'}>{status ? '활성화' : '비활성화'}</p>
  );
}

export default function MainBannerTableRollCell({
  id,
  pcImageUrl,
  startsAt,
  endsAt,
  isActive,
  createdAt,
}: Banner) {
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
          src={pcImageUrl ? pcImageUrl : '/images/no-image.png'}
          width={100}
          height={100}
          className="inline border"
        />
      </TableCell>
      <TableCell className="!text-center">{StatusIndicator(isActive)}</TableCell>
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{startsAt}</Text>
        </Flex>
      </TableCell>
      <TableCell>
        <Flex justifyContent="center" className="w-auto">
          <Text>{endsAt}</Text>
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
          onClick={() => router.push(`/content/mainbanner/register?id=${id}`)}
        >
          수정
        </CustomButton>
      </TableCell>
    </TableRow>
  );
}
