import { Flex } from '@tremor/react';

import Image from 'next/image';

interface MobilePreviewProps {
  type: string;
}
export default function MobilePreview({ type }: MobilePreviewProps) {
  if (type == 'app') {
    return (
      <Flex flexDirection="col">
        <Image
          alt="header"
          src="/images/ic_content_modal_app_mobile_header.png"
          width={320}
          height={123}
        />
        <div className="w-[320px] h-[213px]" />
        <Image
          alt="bottom"
          src="/images/ic_content_modal_app_mobile_bottom.png"
          width={320}
          height={344}
        />
      </Flex>
    );
  } else if (type == 'mall') {
    return (
      <Flex flexDirection="col">
        <Image
          alt="header"
          src="/images/ic_content_modal_mall_mobile_header.png"
          width={320}
          height={123}
        />
        <div className="w-[320px] h-[213px]" />
        <Image
          alt="bottom"
          src="/images/ic_content_modal_mall_mobile_bottom.png"
          width={320}
          height={344}
        />
      </Flex>
    );
  }
}
