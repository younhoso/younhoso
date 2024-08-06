import React from 'react';

import { createBody } from '~/utils/strapi';

import { dev, pro } from './config';

import axios, { AxiosResponse } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';
import escapeStringRegexp from 'escape-string-regexp';
import Cookies from 'js-cookie';
import qs from 'qs';
import useSWR, { Key, mutate } from 'swr';
import { SWRConfiguration } from 'swr';
import { MutatorCallback } from 'swr/dist/types';

export interface IUseGetReturn<Data> {
  data: Data;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  key: string;
  reload: (
    data?: any | Promise<any> | MutatorCallback<any>,
    shouldRevalidate?: boolean,
  ) => Promise<any | undefined>;
}

export interface UseGetReturn {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  key: string;
  reload: (
    data?: any | Promise<any> | MutatorCallback<any>,
    shouldRevalidate?: boolean,
  ) => Promise<any | undefined>;
}

export interface UseGetOptions extends SWRConfiguration {
  enabled?: boolean;
  qs?: Record<string, any>;
}

export interface UseGetAPIOptions extends UseGetOptions {
  id?: number;
  count?: boolean;
}

export type Method = 'get' | 'post' | 'put' | 'delete';
export type ActionKey = 'status' | 'actionBefore' | 'actionAfter';

export interface ActionState {
  status: 'idle' | 'loading' | 'error' | 'success';
  data: any;
  error: any;
}

export interface Action {
  key: ActionKey;
  value?: any;
}

export interface UseActionReturn {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: any;
  error: any;
  action: (...data: any) => Promise<any>;
}

interface UseActionAPIOptions {
  disableAutoMutation?: boolean;
  mutateKeys?: string[];
}

const isDev = process.env.NODE_ENV === 'development';
export const API_HOST_DEV = dev.api.host || window.location.host;
export const API_HOST_PRO = pro.api.host || window.location.host;
export const API_HOST = isDev ? API_HOST_DEV : API_HOST_PRO;

export const API_PATH_PREFIX_DEV = dev.api.prefix || '';
export const API_PATH_PREFIX_PRO = pro.api.prefix || '';
export const API_PATH_PREFIX = isDev
  ? API_PATH_PREFIX_DEV
  : API_PATH_PREFIX_PRO;

/*
 * axios 인스턴스 생성
 */
const strapiAxios = axios.create({
  baseURL: API_HOST + API_PATH_PREFIX,
  withCredentials: false,
  // adapter: cacheAdapterEnhancer(axios.defaults.adapter as any, {
  //   enabledByDefault: true,
  // }),
});

/*
 * axios 요청 전 인터셉터
 */
strapiAxios.interceptors.request.use(
  (config: any) => {
    if (typeof window === 'undefined') {
      return config;
    }

    if (
      new RegExp(`^${escapeStringRegexp(API_HOST)}`).test(config.baseURL || '')
    ) {
      const token =
        window.localStorage['token'] ||
        window.sessionStorage['token'] ||
        Cookies.get('token');

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export const APIFetcher = async (url: string) => {
  try {
    const res = await strapiAxios.get(url);
    return res.data;
  } catch (error: any) {
    throw error.response;
  }
};

const keys = new Set<string>();

/*
 * useSWR 레퍼 함수
 */
export const useGet = (key: Key, options: UseGetOptions = {}): UseGetReturn => {
  let url = key as string;

  if (options.qs) {
    if (typeof options.qs === 'string') {
      if (String(options.qs).trim().length) {
        url += `?${options.qs}`;
      }
    } else {
      if (Object.keys(options.qs as Record<string, unknown>).length) {
        url += `?${qs.stringify(options.qs)}`;
      }
    }
  }

  keys.add(url);

  const {
    data,
    error,
    isValidating,
    mutate: reload,
  } = useSWR(
    options.enabled === false ? null : url,
    options.fetcher || APIFetcher,
    options,
  );

  const isLoading = data === undefined && isValidating;

  return {
    data,
    isLoading,
    isFetching: isValidating || false,
    error,
    key: url as string,
    reload,
  };
};

/*
 * useSWR 레퍼 함수 + Strapi 관련 함수
 */
export const useGetAPI = (table: string, options: UseGetAPIOptions = {}) => {
  let url = `/${table}`;

  if (options.id) {
    url += `/${options.id}`;
  } else if (options.count) {
    url += `/count`;
  }

  const returnValue = useGet(url, options);

  return returnValue;
};

const actionInitState: ActionState = {
  status: 'idle',
  data: undefined,
  error: undefined,
};

const actionStateReducer = (
  state: ActionState,
  action: Action,
): ActionState => {
  const { key, value } = action;

  switch (key) {
    case 'status': {
      state.status = value;
      break;
    }

    case 'actionBefore': {
      state.status = 'loading';
      state.data = undefined;
      state.error = undefined;
      break;
    }

    case 'actionAfter': {
      state.status = value.error ? 'error' : 'success';
      state.data = value.data || null;
      state.error = value.error || false;
      break;
    }
  }

  return {
    ...state,
  };
};

/*
 * 정규식으로 mutate
 */
export const regexMutate = (regex: RegExp) => {
  keys.forEach(key => {
    regex.test(key) && mutate(key);
  });
};

/*
 * react-query의 useMutation 함수와 같이 만든 함수
 */
export const useAction = (
  asyncFn: (...data: any) => Promise<any>,
  mutateKeys: any[] = [],
): UseActionReturn => {
  const [state, dispatch] = React.useReducer(
    actionStateReducer,
    actionInitState,
  );

  const action = async (...data: any) => {
    dispatch({ key: 'actionBefore' });

    try {
      const res = await asyncFn(...data);

      for (const mutateKey of mutateKeys) {
        if (mutateKey instanceof RegExp) {
          regexMutate(mutateKey);
        } else {
          mutate(mutateKey);
        }
      }

      dispatch({ key: 'actionAfter', value: { data: res } });
      return res;
    } catch (err: any) {
      const error: AxiosResponse = err.response;
      dispatch({ key: 'actionAfter', value: { error } });
      // onError && onError(error);
      throw error;
    }
  };

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    data: state.data,
    error: state.error,
    action,
  };
};

export const useActionAPI = (table: string, options?: UseActionAPIOptions) => {
  const [methodState, setMethodState] = React.useState<Method | null>(null);

  const { action: originAction, ...originStates } = useAction(
    async (method: Method, data: any, id?: number) => {
      const url = `/${table}${id === undefined ? '' : `/${id}`}`;
      const res = await strapiAxios[method](url, data);
      return res.data;
    },
    options?.disableAutoMutation || options?.mutateKeys
      ? options.mutateKeys || []
      : [new RegExp(`^\\/${table}(\\/.*)?(\\?.*)?`)],
  );

  const action = async (method: Method, data: any, id?: number) => {
    setMethodState(method);
    return await originAction(method, createBody(data), id);
  };

  return { ...originStates, method: methodState, action };
};

export default strapiAxios;
