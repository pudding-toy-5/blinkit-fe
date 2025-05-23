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
  from,
  to,
}: {
  from: Date;
  to: Date;
}) => {
  return useQuery<Retrospective[]>({
    queryKey: ['retrospective', from.toISOString(), to.toISOString()],
    queryFn: async () => {
      try {
        const res = await userAxios.get<ServerRetrospective[]>(
          apiUrl + '/expense/expenses/consumption-retrospective',
          {
            params: {
              start_date: formatDate(
                addLocalTimezoneOffset(getDateOnly(from)),
                'yyyy-MM-dd'
              ),
              end_date: formatDate(
                addLocalTimezoneOffset(getDateOnly(to)),
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
