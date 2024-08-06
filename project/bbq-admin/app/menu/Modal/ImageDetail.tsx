import { Flex } from '@tremor/react';

import Image from 'next/image';

export default function ImageDetail({ src }: { src: string }) {
  return (
    <Flex justifyContent="center" className="w-[500px] h-[500px]">
      <Image alt="modal-image-detail" src={src} width={500} height={500} className="mx-auto" />
    </Flex>
  );
}
