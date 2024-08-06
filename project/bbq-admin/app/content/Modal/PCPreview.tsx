import { Flex } from '@tremor/react';

import Image from 'next/image';

interface PCPreviewProps {
  type: string;
}

export default function PCPreview({ type }: PCPreviewProps) {
  if (type == 'app') {
    return (
      <Flex flexDirection="col">
        <Image
          alt="header"
          src="/images/ic_content_modal_app_pc_background.png"
          width={760}
          height={412}
        />
        <div className="w-[525px] h-[240px] bg-red-500 absolute top-[108px] right-[225px]" />
      </Flex>
    );
  } else if (type == 'mall') {
    return (
      <Flex flexDirection="col">
        <Image
          alt="header"
          src="/images/ic_content_modal_mall_pc_background.png"
          width={760}
          height={412}
        />
        <div className="w-[525px] h-[240px] bg-red-500 absolute top-[108px] right-[225px]" />
      </Flex>
    );
  }
}
