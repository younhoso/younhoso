import { Flex, TableCell, TableRow, Text } from '@tremor/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { returnMenuType } from '@/app/utils/changeValueType';
import { Content } from '@/pages/api/customer/push';
import { ContentEntity } from '@/pages/api/menu/list';

import CustomButton from './CustomButton';

interface StatusIndicatorProps {
  status: boolean;
}

function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <p className={status ? 'text-[#00C9B5]' : 'text-[#E52143]'}>{status ? '활성화' : '비활성화'}</p>
  );
}

export default function TableRollPush({
  batchType,
  afterDays,
  appPushTitle,
  appPushBody,
  isActive,
}: Content) {
  const router = useRouter();

  return (
    <TableRow key={batchType} className="border">
      <TableCell>{batchType}</TableCell>
      <TableCell>{afterDays}일</TableCell>
      <TableCell>{appPushTitle}</TableCell>
      <TableCell>{appPushBody}</TableCell>
      <TableCell>
        {isActive ? (
          <p className="text-[#00C9B5]">활성화</p>
        ) : (
          <p className="text-[#E52143]">비활성화</p>
        )}
      </TableCell>
      <TableCell onClick={() => router.push(`/customer/push/auto?id=${batchType}`)}>
        <div className="border border-[#DCDDE2] p-[8px] cursor-pointer">수정</div>
      </TableCell>
    </TableRow>
  );
}
