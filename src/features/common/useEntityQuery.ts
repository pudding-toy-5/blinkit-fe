import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Entity {
  uid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const createEntityHooks = <T extends Entity>(
  queryKey: string[],
  baseUrl: string
) => {
  const fetchEntities = async (): Promise<Entity[]> => {
    const res = await axios.get(baseUrl);

    if (res.status !== 200) {
      throw new Error('error on fetch entities');
    }

    return res.data as Entity[];
  };

  const fetchEntityByUid = async (uid: string): Promise<Entity> => {
    const res = await axios.get(baseUrl + uid);

    if (res.status !== 200) {
      throw new Error('error on fetch entity by uid:' + uid);
    }

    return res.data as Entity;
  };

  const addEntity = async (entity: Omit<Entity, 'uid'>): Promise<Entity> => {
    const res = await axios.post(baseUrl, { entity });

    if (res.status !== 201) {
      throw new Error('error on add entity');
    }

    return res.data as Entity;
  };

  const updateEntity = async (entity: Partial<Entity>): Promise<Entity> => {
    if (!entity.uid) {
      throw new Error('error on update entity: no uid');
    }

    const res = await axios.patch(`${baseUrl}/${entity.uid}`, { entity });

    if (res.status !== 200) {
      throw new Error('error on update entity' + res.statusText);
    }

    return res.data as Entity;
  };

  const deleteEntity = async (uid: string) => {
    const res = await axios.delete(baseUrl + uid);

    if (res.status !== 204) {
      throw new Error('error on delete entity - uid:' + uid);
    }

    return uid;
  };

  const useEntities = () => {
    return useQuery<Entity[]>({
      queryKey,
      queryFn: fetchEntities,
    });
  };

  const useEntityByUid = (uid: string) => {
    return useQuery<Entity>({
      queryKey: [...queryKey, uid],
      queryFn: () => fetchEntityByUid(uid),
      enabled: Boolean(uid),
    });
  };

  const useAddEntity = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (entity: Omit<Entity, 'uid'>) => addEntity({ ...entity }),
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
      mutationFn: (entity: Partial<Entity>) => updateEntity(entity),
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
