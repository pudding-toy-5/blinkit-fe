import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import userAxios from '@/shared/api/userAxios';

interface Entity {
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const createEntityHooks = <T extends Entity>(
  queryKey: string[],
  baseUrl: string
) => {
  const fetchEntities = async (): Promise<T[]> => {
    try {
      const res = await userAxios.get(baseUrl);
      return res.data as T[];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`엔티티 목록 조회 실패:  ${error.message}`);
      }
      throw error;
    }
  };

  const fetchEntityByUid = async (uid: string): Promise<T> => {
    try {
      const res = await userAxios.get(`${baseUrl}/${uid}`);
      return res.data as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`엔티티 - ${uid} 목록 조회 실패: ${error.message}`);
      }
      throw error;
    }
  };

  const addEntity = async (entity: Omit<T, 'uid'>): Promise<T> => {
    try {
      const res = await userAxios.post(baseUrl, entity);
      return res.data as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`엔티티 추가 실패: ${error.message}`);
      }
      throw error;
    }
  };

  const updateEntity = async (entity: Partial<T>): Promise<T> => {
    try {
      if (entity.uid === undefined) {
        throw new Error('error on update entity - no uid in entity');
      }

      const res = await userAxios.patch(`${baseUrl}/${entity.uid}`, entity);
      return res.data as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`엔티티 업데이트 실패: ${error.message}`);
      }
      throw error;
    }
  };

  const deleteEntity = async (uid: string): Promise<string> => {
    try {
      await userAxios.delete(`${baseUrl}/${uid}`);
      return uid;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`엔티티 - ${uid} 삭제 실패: ${error.message}`);
      }
      throw error;
    }
  };

  const useEntities = () => {
    return useQuery<T[]>({
      queryKey,
      queryFn: fetchEntities,
    });
  };

  const useEntityByUid = (uid: string) => {
    return useQuery<T>({
      queryKey: [...queryKey, uid],
      queryFn: () => fetchEntityByUid(uid),
      enabled: Boolean(uid),
    });
  };

  const useAddEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (entity: Omit<T, 'uid'>) => addEntity({ ...entity }),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey });
      },
      onError: (error) => {
        console.error(`엔티티 추가 실패:`, error);
      },
    });
  };

  const useUpdateEntity = (
    options?: UseMutationOptions<T, Error, Partial<T>>
  ) => {
    const queryClient = useQueryClient();

    return useMutation<T, Error, Partial<T>>({
      mutationFn: (entity: Partial<T>) => updateEntity(entity),
      onSuccess: (data, variables, context) => {
        void queryClient.invalidateQueries({ queryKey });
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error) => {
        console.error(`엔티티 업데이트 실패:`, error);
      },
      ...options,
    });
  };

  const useDeleteEntity = (
    options?: UseMutationOptions<string, Error, string>
  ) => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, string>({
      mutationFn: (uid: string) => deleteEntity(uid),
      onSuccess: (data, variables, context) => {
        void queryClient.invalidateQueries({ queryKey });
        options?.onSuccess?.(data, variables, context);
      },
      onError: (error) => {
        console.error(`엔티티 제거 실패:`, error);
      },
    });
  };

  return {
    useEntities,
    useEntityByUid,
    useAddEntity,
    useUpdateEntity,
    useDeleteEntity,
  };
};
