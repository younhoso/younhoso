'use client';

import { Card, Flex } from '@tremor/react';
import { useState } from 'react';

import { Radiobox, RadioboxGroup } from '@/app/components/Radiobox';

import ContentAppBoardEventWrite from './event';
import ContentAppBoardFaqWrite from './faq';
import ContentAppBoardNoticeWrite from './notice';

export default function ContentAppBoardWritePage() {
  const [currentTab, setCurrentTab] = useState('notice');
  return (
    <main className="mb-5">
      <Card>
        <Flex justifyContent="start" className="gap-10">
          <RadioboxGroup value={currentTab} onChange={value => setCurrentTab(value)}>
            <Radiobox value={'notice'} label="공지사항" />
            <Radiobox value={'faq'} label="FAQ" />
            <Radiobox value={'event'} label="이벤트" />
          </RadioboxGroup>
        </Flex>
      </Card>
      {currentTab === 'notice' ? (
        <ContentAppBoardNoticeWrite />
      ) : currentTab === 'faq' ? (
        <ContentAppBoardFaqWrite />
      ) : currentTab == 'event' ? (
        <ContentAppBoardEventWrite />
      ) : (
        <ContentAppBoardNoticeWrite />
      )}
    </main>
  );
}
