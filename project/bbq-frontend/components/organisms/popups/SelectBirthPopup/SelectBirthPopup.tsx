import { ReactNode, useMemo, useState } from 'react';

import { Flex, Select, Space, Text } from '@/components/atoms';
import { Button, useModal } from '@/components/molecules';
import { DAYS, FONTSIZE_18, MONTHS, PLANCK, YEARS } from '@/constants';

export const SelectBirthPopup = ({
  birth,
  setBirth,
  title,
}: {
  birth?: string;
  setBirth: (birth: string) => void;
  title?: string | ReactNode | ReactNode[];
}) => {
  const { closeModal } = useModal();

  const [year, setYear] = useState<string | undefined>(birth ? birth.split('-')[0] : undefined);
  const [month, setMonth] = useState<string | undefined>(birth ? birth.split('-')[1] : undefined);
  const [day, setDay] = useState<string | undefined>(birth ? birth.split('-')[2] : undefined);

  const yearOptions = useMemo(() => {
    return [
      { value: '', label: '(선택해 주세요)' },
      ...[...YEARS]
        .sort((a, b) => b - a)
        .map(year => ({
          value: `${year}`,
          label: `${year}년`,
        })),
    ];
  }, []);

  const monthOptions = useMemo(() => {
    return [
      { value: '', label: '(선택해 주세요)' },
      ...[...MONTHS]
        .sort((a, b) => a - b)
        .map(month => ({
          value: `00${month}`.slice(-2),
          label: `${month}월`,
        })),
    ];
  }, []);

  const dayOptions = useMemo(() => {
    const maxDays = year && month ? new Date(Number(year), Number(month), 0).getDate() : 31;

    return [
      { value: '', label: '(선택해 주세요)' },
      ...[...DAYS]
        .filter(day => day <= maxDays)
        .sort((a, b) => a - b)
        .map(day => ({
          value: `00${day}`.slice(-2),
          label: `${day}일`,
        })),
    ];
  }, [year, month]);

  return (
    <Flex.CCC full padding={PLANCK * 2}>
      {title ? (
        <Text size={FONTSIZE_18} lineHeight={'1.3em'} align="center">
          {title}
        </Text>
      ) : null}
      <Space.H6 />
      <Flex.RSC full={true} layout="1.2 1 1" gap={PLANCK}>
        <Select
          shadow={true}
          value={year}
          placeholder={'연도'}
          options={yearOptions}
          onChange={value => setYear(value)}
        />
        <Select
          shadow={true}
          value={month}
          placeholder={'월'}
          options={monthOptions}
          onChange={value => setMonth(value)}
        />
        <Select
          shadow={true}
          value={day}
          placeholder={'일'}
          options={dayOptions}
          onChange={value => setDay(value)}
        />
      </Flex.RSC>
      <Space.H3 />
      <Button
        disabled={!year || !month || !day}
        full
        color="red"
        shape="round"
        text="확인"
        onClick={() => {
          closeModal();
          setBirth(`${year}-${month}-${day}`);
        }}
        style={{ height: 50 }}
      />
    </Flex.CCC>
  );
};
