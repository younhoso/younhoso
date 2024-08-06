// @ts-ignore
import { lookup as mimeLookup } from 'mime-types';

export type Format = 'original' | 'large' | 'medium' | 'small' | 'thumbnail';

/*
 * Strapi에서 반환하는 미디어 파일 URL을 가져오는 함수
 *
 * - mediaItem: strapi media item
 *
 * - format: 미디어 파일이 이미지일 경우 가져올 포맷 이름
 *   허용 값) 'original', 'large', 'medium', 'small', 'thumbnail'
 */
export const getFileURL = (
  mediaItem: any,
  format: Format = 'original',
): string => {
  // 미디어가 없다면 아래 메시지 반환
  if (!mediaItem) {
    return 'data not found';
  }

  // 미디어가 포맷이 없거나 입력받은 포맷이 'original'이라면
  if (
    !mediaItem.formats ||
    format === 'original' ||
    !Object.keys(mediaItem.formats).includes(format)
  ) {
    return mediaItem.url;
  }

  // 입력받은 포맷에 맞는 포맷이 있다면 그 포맷으로 반환
  return mediaItem.formats[format].url;
};

/*
 * Strapi에서 반환하는 미디어 파일을 File객체로 변환
 * - mediaItem: strapi media item
 */
export const getFile = async (mediaItem: any) => {
  const res = await fetch(getFileURL(mediaItem));
  const blob = await res.blob();
  const nFile = new File([blob], mediaItem.name, {
    type: mimeLookup(mediaItem.ext as string) as string,
  });

  return nFile;
};

/*
 * Strapi REST API 요청하는데 사용하는 body를 생성하는 함수
 * - data: 요청 보낼때 사용하는 body 데이터 (파일이 있을 경우에도 객체로 보내주세요)
 */
export const createBody = (data: Record<string, any>) => {
  const hasFile = Object.values(data).some(fieldValue =>
    Array.isArray(fieldValue)
      ? fieldValue[0] instanceof Blob
      : fieldValue instanceof Blob,
  );
  let body = data;

  if (!hasFile) {
    return body;
  }

  const dataJSON: any = {};

  body = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      if (value[0] instanceof Blob) {
        value.forEach((v: any, i: number) => {
          body.append(`files.${key}`, v);
        });

        continue;
      }
    }

    if (value instanceof Blob) {
      body.append(`files.${key}`, value);
    } else {
      dataJSON[key] = value;
    }
  }

  body.append('data', JSON.stringify(dataJSON));

  return body;
};

/*
 * 오류 메시지
 *
 * {
 *   [errorID]: 'errorMessage'
 * }
 */
export const errorMessages: { [key: string]: string } = {
  // strapi
  'Auth.form.error.email.provide': '아이디(이메일)를 입력해주세요',
  'Auth.form.error.password.provide': '비밀번호를 입력해주세요',
  'Auth.form.error.invalid': '아이디 또는 비밀번호가 올바르지 않습니다',
  'Auth.form.error.confirmed': '이메일 인증이 완료되지 않았습니다',
  'Auth.form.error.blocked': '차단된 계정입니다',
  'Auth.form.error.password.local':
    '간편 로그인으로 생성된 계정입니다\n계정 생성시 사용한 간편 로그인을 사용해주세요',
  'provider.disabled':
    '해당 간편 로그인은 비활성화된 상태입니다\n관리자에게 문의해주세요',
  'Auth.form.error.code.provide': '코드가 올바르지 않습니다',
  'Auth.form.error.password.matching': '비밀번호가 일치하지 않습니다',
  'Auth.form.error.params.provide': '올바르지 않은 데이터를 전달받았습니다',
  'Auth.form.error.email.format': '이메일 형식이 올바르지 않습니다',
  'Auth.advanced.allow_register':
    '회원가입은 현재 비활성화된 상태입니다\n관리자에게 문의해주세요',
  'Auth.form.error.password.format':
    "비밀번호는 '$'기호를 3개 이상 포함 할 수 없습니다",
  'Auth.form.error.role.notFound':
    '기본 역할을 찾을 수 없습니다\n관리자에게 문의해주세요',
  'Auth.form.error.email.taken': '이미 사용중인 이메일입니다',
  'Auth.form.error.username.taken': '이미 사용중인 이름입니다',
  'Auth.form.error.user.not-exist': '해당 이메일은 존재하지 않습니다',
  'password.notNull': '비밀번호는 Null값이 될 수 없습니다',
};

export const getErrorMessage = (messageID: string, orReturnFalse = false) => {
  return (
    errorMessages[messageID] ||
    (orReturnFalse ? false : '알수없는 오류가 발생했습니다')
  );
};

export const coverToFileFormat = (file: any) => {
  if (!file) {
    return null;
  }

  return Array.isArray(file)
    ? file.map(_file => ({
        uid: _file.id,
        name: _file.name,
        status: 'done',
        url: getFileURL(_file),
        thumbUrl: getFileURL(_file),
      }))
    : {
        uid: file.id,
        name: file.name,
        status: 'done',
        url: getFileURL(file),
        thumbUrl: getFileURL(file),
      };
};
