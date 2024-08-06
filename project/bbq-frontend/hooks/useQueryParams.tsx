import { ReactNode, createContext, useContext } from 'react';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';
import { Url } from 'url';

const keepParams = (
  url: string,
  query: ParsedUrlQuery,
  extra?: { [key: string]: string | null | undefined },
): Url => {
  // tweak 1: ecoupon actions
  const ecouponActionAvailable = url.startsWith('/products') || url.startsWith('/categories');

  // tweak 2: mc(manual cart) actions
  const mcAvailable = url.startsWith('/checkout');

  // combined query
  let combinedQuery = {
    ...(query.mealType ? { mealType: query.mealType } : {}),
    ...(query.branchId ? { branchId: query.branchId } : {}),
    ...(query.ecoupons ? { ecoupons: query.ecoupons } : {}),
    ...(query.ignoreEcoupons ? { ignoreEcoupons: query.ignoreEcoupons } : {}),
    ...(ecouponActionAvailable
      ? {
          ...(query.ecouponAction ? { ecouponAction: query.ecouponAction } : {}),
          ...(query.ecouponActionValue ? { ecouponActionValue: query.ecouponActionValue } : {}),
        }
      : {}),
    ...(mcAvailable
      ? {
          ...(query.mc ? { mc: query.mc } : {}),
        }
      : {}),
    ...(extra ? extra : {}),
  };

  // remove undefined/null values
  for (let key of Object.keys(combinedQuery)) {
    if (
      typeof (combinedQuery as any)[key] === 'undefined' ||
      (combinedQuery as any)[key] === null
    ) {
      delete (combinedQuery as any)[key];
    }
  }

  return {
    pathname: url,
    query: combinedQuery,
  } as Url;
};

export interface QueryParamsContextType {
  keepParams: (url: string, extra?: { [key: string]: string | null | undefined }) => Url;
}

export const QueryParamsContext = createContext<QueryParamsContextType>({
  keepParams: (url: string, extra?: { [key: string]: string | null | undefined }) => {
    return { pathname: url, query: { ...(extra || {}) } } as Url;
  },
});

export const useQueryParams = () => {
  const context = useContext(QueryParamsContext);

  if (!context) {
    throw new Error('useQueryParams must be used within a QueryParamsProvider');
  }
  return context;
};

export const QueryParamsProvider = ({ children }: { children?: ReactNode | ReactNode[] }) => {
  const router = useRouter();

  return (
    <QueryParamsContext.Provider
      value={{
        keepParams: (url: string, extra?: { [key: string]: string | null | undefined }) => {
          return keepParams(url, router.query, extra);
        },
      }}
    >
      {children}
    </QueryParamsContext.Provider>
  );
};
