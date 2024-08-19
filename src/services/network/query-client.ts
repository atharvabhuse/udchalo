import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  QueryFunctionContext,
} from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from './api-client';
import { GetInfinitePagesInterface } from './models';

type QueryKeyT = [string, object | undefined];

export const fetcher = <T>({ queryKey, pageParam }: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return apiClient.get<T>(url, { params: { ...params, pageParam } }).then(res => res.data);
};

export const useLoadMore = <T>(url: string, params?: object) => {
  const context = useInfiniteQuery<GetInfinitePagesInterface<T>, Error, GetInfinitePagesInterface<T>, QueryKeyT>(
    [url, params],
    ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam, meta: undefined }),
    {
      getPreviousPageParam: firstPage => firstPage.previousId ?? false,
      getNextPageParam: lastPage => lastPage.nextId ?? false,
    }
  );

  return context;
};

export const usePrefetch = <T>(url: string, params?: object) => {
  const queryClient = useQueryClient();

  return async() => {
    if (!url) {
      return;
    }

    await queryClient.prefetchQuery<T, Error, T, QueryKeyT>([url, params], ({ queryKey }) =>
      fetcher({ queryKey, meta: undefined })
    );
  };
};

export const useFetch = <T>(url: string, params?: object, config?: UseQueryOptions<T, Error, T, QueryKeyT>) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey, meta: undefined }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async data => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);

      queryClient.setQueryData<T>([url, params], oldData => (updater ? updater(oldData, data as S) : (data as T)));

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSettled: async() => {
      await queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = <T>(url: string, params?: object, updater?: (oldData: T, id: string | number) => T) =>
  useGenericMutation<T, string | number>(id => apiClient.delete(`${url}/${String(id)}`), url, params, updater);

export const usePost = <T, S>(url: string, params?: object, updater?: (oldData: T, newData: S) => T) =>
  useGenericMutation<T, S>(data => apiClient.post<S>(url, data), url, params, updater);

export const useUpdate = <T, S>(url: string, params?: object, updater?: (oldData: T, newData: S) => T) =>
  useGenericMutation<T, S>(data => apiClient.patch<S>(url, data), url, params, updater);
