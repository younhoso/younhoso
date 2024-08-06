import { Flex, Subtitle } from '@tremor/react';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-[20px] pt-[10px] pb-[30px] flex center">
      <Subtitle className="mx-auto">Copyright 2019 © GENESIS BBQ</Subtitle>
    </footer>
  );
}
