import moment from 'moment';

export type StrapiImageType = {
  alternativeText: string;
  caption: string;
  created_at: string;
  ext: string;
  formats: any;
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  size: number;
  updated_at: string;
  url: string;
  width: number;
};

/*
 * 테스트용 비동기
 * - ms: millisecond
 */
export const delay = (ms = 1000) =>
  new Promise(res => {
    setTimeout(res, ms);
  });

export const dateDiff = (start: string, end: string, type = 'day') => {
  return moment(end).diff(moment(start), 'day');
};

export const addClass = (target: string, className: string) => {
  const elm: any = document.querySelector(target);

  elm?.classList.add(className);
};

export const removeClass = (target: string, className: string) => {
  const elm: any = document.querySelector(target);

  elm?.classList.remove(className);
};

export const getEndTime = (time: any, minute: any) => {
  const startTime = time.split(':');
  const endMinute = +startTime[1] + +minute;
  const endHour = `${String(
    +startTime[0] + Math.floor(endMinute / 60),
  ).padStart(2, '0')}:${String(endMinute % 60).padStart(2, '0')}:00`;

  return { endHour, startTime };
};

export const textOverFlow = (str: any, max = 23, rep = '...') => {
  return str.length > max ? str.slice(0, max) + rep : str;
};

export const timeZeroPad = (time: string) => {
  const [h, m, s] = time.split(':');

  try {
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  } catch (error) {
    return '-';
  }
};

export const checkObjectEmpty = (data: object, excludes: any = []): any[] => {
  return Object.entries(data)
    .filter(([field, val]: any, i: number) => !excludes.includes(field))
    .filter(([field, val]: any, i: number) => {
      if (Array.isArray(val)) {
        return !val.length;
      }

      if (typeof val === 'string') {
        return val.trim() === '';
      }

      if (typeof val === 'number') {
        return Number.isNaN(val);
      }

      if (typeof val === 'boolean') {
        return false;
      }

      return true;
    })
    .map(([field, val]: any, i: number) => field);
};

export const getSearchQs = (
  keyword: string,
  fields: string[],
  and?: Array<{
    field: string;
    value: string;
  }>,
  req?: any[],
) => {
  const query: any = [];

  fields.forEach(v => {
    const _tmp = {
      [v]: keyword,
    };

    if (and) {
      const ands = and.reduce(
        (acc: any, v: any) => ({
          ...acc,
          ...(v.value !== '' ? { [v.field]: v.value } : {}),
        }),
        {},
      );

      if (Object.values(ands).length) {
        query.push([_tmp, ands]);
      } else {
        query.push(_tmp);
      }
    } else {
      query.push(_tmp);
    }
  });

  return {
    _where: {
      _or: query,
    },
  };
};

export const getSearchQss = (query: any) => {
  const or = query?.or;

  or.sort((a: any, b: any) => b.length - a.length);

  const qs = or.reduce((acc: any, v: any) => {
    return acc;
  }, []);
};

export const checkFileExt = (files: any, allows: string[]) => {
  return {
    errors: files.filter(
      (v: any) => !allows.includes((v?.type || v?.mime).split('/')),
    ),
    allorws: files.filter((v: any) =>
      allows.includes((v?.type || v?.mime).split('/')),
    ),
    images: files.filter((v: any) =>
      ['image/png', 'image/jpg', 'image/jpeg'].includes(v?.type || v?.mime),
    ),
    videos: files.filter((v: any) => (v?.type || v?.mime).includes('video')),
  };
};

export const randomNum = (min: number, max: number) => {
  let randNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randNum;
};
