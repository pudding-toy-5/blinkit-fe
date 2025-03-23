import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

interface Entity {
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function fakeApiCall<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, delay)
  );
}

export const createEntityHooks = <T extends Entity>(
  queryKey: string[],
  fetchFn: () => Promise<T[]>
) => {
  const useEntities = () => {
    return useQuery({
      queryKey,
      queryFn: fetchFn,
    });
  };

  const useEntityByUid = (uid: string | undefined) => {
    const { data: entities } = useEntities();
    return entities?.find((entity) => uid && entity.uid === uid);
  };

  const useAddEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (entity: Omit<T, 'uid'>) => {
        return fakeApiCall<T>({
          uid: nanoid(),
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
        return fakeApiCall<T>(entity);
      },
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
      mutationFn: (uid: string) => {
        return fakeApiCall<string>(uid);
      },
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
