import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiUrl } from '@/features/common/consts';
import { getDateOnly } from '@/features/expense/model/types/utils';
import {
  Retrospective,
  ServerRetrospective,
} from '@/features/retrospective/model/Retrospective';
import userAxios from '@/shared/api/userAxios';

import { fromServerRetrospective } from '../model/utils';

const useRetrospectivesByPeriod = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  return useQuery<Retrospective[]>({
    queryKey: ['retrospective'],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerRetrospective[]>(
          apiUrl + '/expense/expenses/consumption-retrospective',
          {
            params: {
              start_date: getDateOnly(startDate),
              end_date: getDateOnly(endDate),
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

export default useRetrospectivesByPeriod;
