import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { PLATFORMLIST, VERSION1, VersionList } from '@/constant/axiosRelated';
import { Platform, customAxios } from '@/libs/customAxios';

async function fetchData<T>(
  { queryKey }: QueryFunctionContext,
  platform: Platform,
  params?: Record<string, unknown>,
  customQuery?: string,
  version?: VersionList,
) {
  const queryString = customQuery || (queryKey[0] as string);
  const response = await customAxios(platform, version).get<T>(queryString, { params });
  return response.data;
}

export function useCustomQuery<T>({
  queryKey,
  platform = PLATFORMLIST.PC,
  params,
  customQuery,
  enabled = true,
  version = VERSION1,
}: {
  queryKey: QueryFunctionContext['queryKey'];
  params?: Record<string, unknown>;
  customQuery?: string;
  enabled?: boolean;
  platform: Platform;
  version?: VersionList;
}) {
  return useQuery({
    queryKey,
    queryFn: (context: QueryFunctionContext) =>
      fetchData<T>(context, platform, params, customQuery, version),
    enabled,
  });
}
