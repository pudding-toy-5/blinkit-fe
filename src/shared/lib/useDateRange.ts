import { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return { dateRange, setDateRange };
}
