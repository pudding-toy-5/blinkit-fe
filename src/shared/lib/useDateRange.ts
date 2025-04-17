import { useState } from 'react';

export default function useDateRange() {
  const [dateRange] = useState<{ start: Date; end: Date }>({
    start: new Date('2025-04-12'),
    end: new Date('2025-04-18'),
  });

  return { dateRange };
}
