import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { formatDate } from 'date-fns';

import {
  addLocalTimezoneOffset,
  getDateOnly,
} from '@/features/expense/lib/convertExpense';
import {
  Retrospective,
  ServerRetrospective,
} from '@/features/retrospective/model/Retrospective';
import userAxios from '@/shared/api/userAxios';
import { apiUrl } from '@/shared/consts';

import { fromServerRetrospective } from '../model/utils';

export const useRetrospectivesByRange = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  return useQuery<Retrospective[]>({
    queryKey: ['retrospective', start.toISOString(), end.toISOString()],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerRetrospective[]>(
          apiUrl + '/expense/expenses/consumption-retrospective',
          {
            params: {
              start_date: formatDate(
                addLocalTimezoneOffset(getDateOnly(start)),
                'yyyy-MM-dd'
              ),
              end_date: formatDate(
                addLocalTimezoneOffset(getDateOnly(end)),
                'yyyy-MM-dd'
              ),
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
