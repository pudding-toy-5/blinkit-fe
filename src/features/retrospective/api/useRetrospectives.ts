import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiUrl } from '@/features/common/consts';
import {
  Retrospective,
  ServerRetrospective,
} from '@/features/retrospective/model/Retrospective';
import userAxios from '@/shared/api/userAxios';

import { fromServerRetrospective } from '../model/utils';

export const useRetrospectives = () => {
  return useQuery<Retrospective[]>({
    queryKey: ['retrospective'],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerRetrospective[]>(
          apiUrl + '/expense/expense/consumption-retrospective'
        );

        const retrospectives = res.data.map((serverRetrospective) =>
          fromServerRetrospective(serverRetrospective)
        );
        return retrospectives;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
  });
};
