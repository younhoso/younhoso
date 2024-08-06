import { FC } from 'react';

import Link from 'next/link';

import classNames from 'classnames';
import styled from 'styled-components';

import { PLANCK } from '@/constants';
import { dayjs } from '@/libs';

import { Flex } from '../Flex';
import { Icon } from '../Icon';
import { PostTableComponentProps } from './PostTable';

export const PostTableMobile: FC<PostTableComponentProps> = ({ items, className, ...rest }) => {
  return (
    <Table className={classNames(className)} {...rest}>
      <thead>
        <tr>
          <th>&nbsp;</th>
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
                  <Icon src="post-pin.png" size={12} />
                </Flex.RCC>
              ) : null}
            </td>
            <td style={{ textAlign: 'left' }}>
              <Link href={`${item.href}`}>
                {item.title}
                {item.new ? (
                  <>
                    &nbsp;
                    <Icon inline={true} src="new.png" size={10} />
                  </>
                ) : null}
              </Link>
            </td>
            <td>{dayjs(item.publishedAt).format('YYYY.MM.DD')}</td>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1em;
  border-collapse: collapse;
  border-spacing: 0;

  & td,
  & th {
    text-align: center;
    padding: ${PLANCK * 2}px 0;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    font-weight: 600;

    &:nth-child(1) {
      width: 10%;
      padding-right: ${PLANCK * 2}px;
    }

    &:nth-child(2) {
      width: 65%;
      padding-right: ${PLANCK * 2}px;
    }

    &:nth-child(3) {
      width: 15%;
      padding-right: ${PLANCK * 2}px;
    }

    &:nth-child(4) {
      width: 10%;
    }
  }

  & th {
    border-top: 2px solid #8288a2;
    border-bottom: 1px solid #8288a2;
  }

  & td {
    &:nth-child(1) {
      font-size: 11px;
    }

    &:nth-child(2) {
      font-size: 12px;
    }

    &:nth-child(3) {
      font-size: 10px;
    }

    &:nth-child(4) {
      font-size: 10px;
    }
  }
`;

const TableRow = styled.tr`
  background-color: white;
`;
