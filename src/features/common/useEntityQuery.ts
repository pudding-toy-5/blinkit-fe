import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

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
      const res = await axios.get(baseUrl);
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
      const res = await axios.get(`${baseUrl}/${uid}`);
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
      const res = await axios.post(baseUrl, { entity });
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

      const res = await axios.patch(`${baseUrl}/${entity.uid}`, { entity });
      return res.data as T;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`앤티티 업데이트 실패: ${error.message}`);
      }
      throw error;
    }
  };

  const deleteEntity = async (uid: string): Promise<string> => {
    try {
      await axios.delete(`${baseUrl}/${uid}`);
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
      onSuccess: (newEntity) => {
        queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
          return oldData ? [...oldData, newEntity] : [newEntity];
        });
      },
      onError: (error) => {
        console.error(`엔티티 추가 실패:`, error);
      },
    });
  };

  const useUpdateEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (entity: Partial<T>) => updateEntity(entity),
      onSuccess: (updatedEntity) => {
        queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
          return oldData?.map((entity) =>
            entity.uid === updatedEntity.uid ? updatedEntity : entity
          );
        });
      },
      onError: (error) => {
        console.error(`엔티티 업데이트 실패:`, error);
      },
    });
  };

  const useDeleteEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (uid: string) => deleteEntity(uid),
      onSuccess: (uid) => {
        queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
          return oldData?.filter((entity) => entity.uid !== uid);
        });
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
