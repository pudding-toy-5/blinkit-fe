import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import {
  useExpenseCountByRange,
  useExpensesByRange,
  // useUpdateExpense,
} from '@/features/expense/api/useExpenseQuery';

import UnReviewedExpenseView, { Props } from './UnReviewedExpenseView';

vi.mock('@/features/expense/api/useExpenseQuery');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockCount = useExpenseCountByRange as ReturnType<typeof vi.fn>;
const mockList = useExpensesByRange as ReturnType<typeof vi.fn>;
// const mockUpdate = useUpdateExpense as ReturnType<typeof vi.fn>;

describe('UnReviewedExpenseView', () => {
  const props: Props = {
    onMoveRetrospective: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderElement = ({ onMoveRetrospective }: Props) =>
    render(
      <UnReviewedExpenseView onMoveRetrospective={onMoveRetrospective} />,
      { wrapper }
    );

  it('renders with fake expense', () => {
    const fakeExpense = {
      uid: '1',
      date: new Date(),
      memo: '커피',
      categories: [],
      amount: 4500,
    };
    mockCount.mockReturnValue({ data: 1 });
    mockList.mockReturnValue({ data: [fakeExpense] });

    const { container } = renderElement({ ...props });

    expect(container).toBeInTheDocument();
  });
});
