import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { formatDate } from 'date-fns';

import { apiUrl } from '@/features/common/consts';
import {
  Retrospective,
  ServerRetrospective,
} from '@/features/retrospective/model/Retrospective';
import userAxios from '@/shared/api/userAxios';

import { fromServerRetrospective } from '../model/utils';

export const useRetrospectivesByStartEnd = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  return useQuery<Retrospective[]>({
    queryKey: ['retrospective'],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerRetrospective[]>(
          apiUrl + '/expense/expenses/consumption-retrospective',
          {
            params: {
              start_date: formatDate(start, 'yyyy-MM-dd'),
              end_date: formatDate(end, 'yyyy-MM-dd'),
            },
          }
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
