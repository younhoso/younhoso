import { FC, ReactNode } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';
import { dayjs } from '@/libs';

import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { PostTableMobile } from './mobile';

type Post = {
  id: number;
  title: string;
  publishedAt: string;
  href: string;
  fixed?: boolean;
  new?: boolean;
};

export interface PostTableProps {
  items: Post[];
}

export interface PostTableComponentProps extends PostTableProps {
  labelNumber?: string;
  className?: string;
  children?: ReactNode | ReactNode[];
  [x: string]: any;
}

export const PostTable: FC<PostTableComponentProps> & {
  Mobile: FC<PostTableComponentProps>;
} = ({ labelNumber, items, className, ...rest }) => {
  return (
    <Table className={classNames(className)} {...rest}>
      <thead>
        <tr>
          <th>{labelNumber ? labelNumber : ' '}</th>
          <th>제목</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <TableRow key={item.id}>
            <td>
              {item.fixed ? (
                <Flex.RCC>
                  <Icon src="post-pin.png" size={14} />
                </Flex.RCC>
              ) : item.id ? (
                <Text>{item.id}</Text>
              ) : null}
            </td>
            <td style={{ textAlign: 'left' }}>
              <Link href={`${item.href}`}>
                {item.title}
                {item.new ? (
                  <>
                    &nbsp;
                    <Icon inline={true} src="new.png" size={12} />
                  </>
                ) : null}
              </Link>
            </td>
            <td>
              <Text>{dayjs(item.publishedAt).format('YYYY.MM.DD')}</Text>
            </td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};
PostTable.Mobile = PostTableMobile;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;
  border-collapse: collapse;
  border-spacing: 0;

  & td,
  & th {
    text-align: center;
    padding: ${PLANCK * 3}px 0;
    border-bottom: 1px solid #ddd;

    font-size: 16px;
    font-weight: 600;

    &:nth-child(1) {
      width: 7.5%;
    }

    &:nth-child(2) {
      width: 65%;
    }

    &:nth-child(3) {
      width: 15%;
    }

    &:nth-child(4) {
      width: 10%;
    }
  }

  & th {
    border-top: 2px solid #8288a2;
    border-bottom: 1px solid #8288a2;
  }
`;

const TableRow = styled.tr`
  background-color: white;
`;
