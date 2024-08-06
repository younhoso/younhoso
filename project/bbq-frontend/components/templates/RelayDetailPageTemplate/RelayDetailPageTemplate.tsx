import { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import { Box, Divider, Flex, Grid, Icon, Space, Text } from '@/components/atoms';
import { Button } from '@/components/molecules';
import { COLOR_BLACK, FONTSIZE_12, FONTSIZE_16, FONTSIZE_20, PLANCK } from '@/constants';
import { useAuth } from '@/hooks';
import { Relay } from '@/types';

export interface RelayDetailPageTemplateProps {
  relay: Relay;
  handleDeleteButtonClick: () => void;
}

export interface RelayDetailPageTemplateComponentProps extends RelayDetailPageTemplateProps {}

export const RelayDetailPageTemplate: FC<RelayDetailPageTemplateComponentProps> = ({
  relay,
  handleDeleteButtonClick,
}) => {
  const { member } = useAuth();
  const router = useRouter();

  return (
    <>
      <Box
        background="#FCFBF7"
        full={true}
        style={{
          boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Flex.RCC full={true}>
          <LinkBox href={'/story/videos'}>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={500}>
              영상 콘텐츠
            </Text>
            <Space.H3 />
          </LinkBox>
          <Space.V3 />
          <Divider.V1 color={COLOR_BLACK} style={{ height: 14 }} />
          <Space.V3 />
          <Box>
            <Space.H3 />
            <Text size={FONTSIZE_16} weight={600}>
              찾아가는 치킨릴레이 사연신청
            </Text>
            <Space.H3 />
            <Divider.H2 color={COLOR_BLACK} style={{ marginTop: -2 }} />
          </Box>
        </Flex.RCC>
      </Box>
      <Flex.CCC
        style={{
          maxWidth: 950,
          width: 'calc(100% - 60px)',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Space.H8 />
        <Flex.RBC full layout="1 auto">
          <Text size={FONTSIZE_20} color={COLOR_BLACK}>
            {relay.title}
          </Text>
          <Text size={FONTSIZE_12} color={'#777777'}>
            {relay.createdAt}
          </Text>
        </Flex.RBC>
        <Space.H4 />
        <Divider.H2 color="#D9D9D9" />
        <Space.H8 />
        <Article dangerouslySetInnerHTML={{ __html: relay.content ?? '' }} />
        <Space.H8 />
        {relay.contentFileUrl1 || relay.contentFileUrl2 || relay.contentFileUrl3 ? (
          <>
            <Grid columnCount={3} gap={PLANCK * 2}>
              {[relay.contentFileUrl1, relay.contentFileUrl2, relay.contentFileUrl3].map(
                (url, index) =>
                  url && url.trim().length ? (
                    <Box
                      shape={'round'}
                      border="#D9D9D9"
                      key={index}
                      style={{
                        overflow: 'hidden',
                        position: 'relative',
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Flex.RSC>
                        <Flex.RSC
                          style={{
                            flex: 1,
                            width: '100%',
                            height: '100%',
                          }}
                        >
                          <Space.V3 />
                          <Icon src={'relay/file.svg'} width={32} height={32} />
                          <Space.V2 />
                          <Flex.RSC style={{ flex: 1 }}>
                            <Text
                              style={{
                                display: 'block',
                                flex: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '130px',
                              }}
                            >
                              {`${url.split('/').slice(-1)[0].split('.').slice(0, -1).join('.')}`}
                            </Text>
                            <Text>{`.${url?.split('.').slice(-1)[0]}`}</Text>
                          </Flex.RSC>
                        </Flex.RSC>
                        <a
                          href={url!}
                          download
                          style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            display: 'block',
                            width: 64,
                            height: 64,
                          }}
                        >
                          <Box
                            background="#F9F6EF"
                            style={{
                              width: 64,
                              height: 64,
                              borderLeft: '1px solid #D9D9D9',
                            }}
                          >
                            <Flex.RCC full style={{ height: '100%' }}>
                              <Icon src={'relay/download.svg'} width={24} height={24} />
                            </Flex.RCC>
                          </Box>
                        </a>
                      </Flex.RSC>
                    </Box>
                  ) : null,
              )}
            </Grid>
            <Space.H4 />
          </>
        ) : null}
        <Divider.H2 color="#D9D9D9" />
        <Space.H4 />
        <Flex.REC full>
          {member?.memberId === relay.memberId ? (
            <>
              <Button
                text="삭제"
                shape={'round'}
                fill={false}
                color="lightgray"
                textColor="black"
                style={{
                  width: 100,
                  height: 50,
                }}
                onClick={() => {
                  handleDeleteButtonClick();
                }}
              />
              <Space.V2 />
              <Button
                text="수정"
                shape={'round'}
                fill={false}
                color="lightgray"
                textColor="black"
                style={{
                  width: 100,
                  height: 50,
                }}
                onClick={() => {
                  router.push(`/story/relay/${relay.id}/edit`);
                }}
              />
              <Space.V2 />
            </>
          ) : null}

          <Button
            text="목록"
            shape={'round'}
            color="black"
            style={{
              width: 200,
              height: 50,
            }}
            onClick={() => {
              router.push('/story/relay');
            }}
          />
        </Flex.REC>
      </Flex.CCC>
      <Space.H16 />
    </>
  );
};

const Article = styled.div`
  width: 100%;
  font-weight: 500;
  color: black;
  line-height: 1.6em;
  font-size: 15px;
  & img {
    width: 100% !important;
  }
`;

const LinkBox = styled(Link)``;
