// src/features/common/useEntityQuery.ts
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

type Entity = { id: string; [key: string]: any };
type EntityStore<T> = { setEntities: (entities: T[]) => void };

export default function fakeApiCall<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, delay)
  );
}

export const createEntityHooks = <T extends Entity>(
  queryKey: string[],
  fetchFn: () => Promise<T[]>,
  setEntities: (entities: T[]) => void
) => {
  const useFetchEntities = () => {
    const { data, error, isLoading } = useQuery({
      queryKey: [queryKey],
      queryFn: fetchFn,
    });

    useEffect(() => {
      if (data) {
        setEntities(data);
      }
    }, [data, setEntities]);

    return { data, error, isLoading };
  };

  const useAddEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (entity: Omit<T, 'id'>) => {
        return fakeApiCall<T>({
          id: nanoid(),
          ...entity,
        } as T);
      },
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
      mutationFn: (entity: T) => {
        return fakeApiCall<T>(entity as T);
      },
      onSuccess: (updatedEntity) => {
        queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
          return oldData?.map((entity) =>
            entity.id === updatedEntity.id ? updatedEntity : entity
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
      mutationFn: (id: string) => {
        return fakeApiCall<string>(id);
      },
      onSuccess: (id) => {
        queryClient.setQueryData(queryKey, (oldData: T[] | undefined) => {
          return oldData?.filter((entity) => entity.id !== id);
        });
      },
      onError: (error) => {
        console.error(`엔티티 제거 실패:`, error);
      },
    });
  };

  return {
    useFetchEntities,
    useAddEntity,
    useUpdateEntity,
    useDeleteEntity,
  };
};
