import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';
import { Flex, Text } from '@tremor/react';

export type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';

interface ComparedTextProps {
  direction: FlexDirection;
  up: boolean;
  value: string;
  text: string;
  className?: string;
}
export default function ComparedText(props: ComparedTextProps) {
  const { direction, up, value, text, className } = props;
  return (
    <Flex
      flexDirection={direction}
      className={className}
      alignItems="start"
      justifyContent="center"
    >
      <Text className="text-[#8e93ad] mr-1 whitespace-nowrap inline-block">{text}</Text>
      <Flex justifyContent="start" className="w-auto">
        {up ? (
          <>
            <ArrowTrendingUpIcon width={15} className="text-emerald-500 mr-1" />
            <Text className="text-emerald-500 font-bold">{value}</Text>
          </>
        ) : (
          <>
            <ArrowTrendingDownIcon width={15} className="text-red-500" />
            <Text className="text-red-500 font-bold">{value}</Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}
