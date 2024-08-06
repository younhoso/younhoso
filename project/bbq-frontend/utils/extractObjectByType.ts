// TODO: propperties가 없을때는 전체 키를 모두 전달하도록 해야함.

const extractObjectByType = function <T>(properties: Record<keyof T, true>) {
  return function <TActual extends T>(value: TActual) {
    let result = {} as T;

    for (const property of Object.keys(properties) as Array<keyof T>) {
      result[property] = value[property];
    }
    return result;
  };
};

export { extractObjectByType };
