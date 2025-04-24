import { useState } from 'react';

export default function useDateRange() {
  const [dateRange] = useState<{ start: Date; end: Date }>({
    start: new Date('2025-04-01'),
    end: new Date('2025-05-31'),
  });

  return { dateRange };
}
