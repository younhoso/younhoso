import dayjs from 'dayjs';

import { MembershipInfo } from '@/pages/api/customer/dashboard';

const WELCOME = 'WELCOME';
const grades = ['치빡이', 'BIP', 'BBIP'];

export const pipeline = (dataList: MembershipInfo[]) => {
  const { lastMonthMember: lastMonthTotalMember, totalMember: thisMonthTotalMember } = dataList[0];
  let lastMonthMember = lastMonthTotalMember;
  let totalMember = thisMonthTotalMember;

  const array = grades.map(v => {
    const res = dataList.filter(k => k.membershipName === v);

    if (!res.length) {
      return {
        lastMonthMember: 0,
        thisMonthMember: 0,
        membershipName: v,
      };
    }

    if (res.length === 1) {
      const [data] = dataList;
      const isThisMonth = dayjs(data.membershipUpdateDate)
        .startOf('month')
        .isSame(dayjs().startOf('month'));

      if (isThisMonth) {
        totalMember -= data.membershipCount;
        return {
          lastMonthMember: 0,
          thisMonthMember: data.membershipCount,
          membershipName: v,
        };
      }

      lastMonthMember -= data.membershipCount;
      return {
        thisMonthMember: 0,
        lastMonthMember: data.membershipCount,
        membershipName: v,
      };
    }

    const sameData = res.sort(
      (a, b) =>
        new Date(a.membershipUpdateDate).getTime() - new Date(b.membershipUpdateDate).getTime(),
    );

    const [data1, data2] = sameData;
    lastMonthMember -= data1.membershipCount;
    totalMember -= data2.membershipCount;

    return {
      lastMonthMember: data1.membershipCount,
      thisMonthMember: data2.membershipCount,
      membershipName: v,
    };
  });

  return {
    thisMonthTotalMember,
    lastMonthTotalMember,
    data: [
      {
        lastMonthMember,
        thisMonthMember: totalMember,
        membershipName: WELCOME,
      },
      ...array,
    ],
  };
};
