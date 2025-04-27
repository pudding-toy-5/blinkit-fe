import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date('2025-04-01'),
    to: new Date('2025-05-31'),
  });

  return { dateRange, setDateRange };
}
