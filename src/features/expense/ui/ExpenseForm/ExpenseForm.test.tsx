import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { Expense } from '@/features/expense/model/Expense';

import ExpenseForm, { ExpenseFormProps } from './ExpenseForm';

describe('ExpenseForm', () => {
  const testQueryClient = new QueryClient();

  const expense: Expense = {
    uid: 'test-expense-uid',
    date: new Date(),
    amount: 0,
    memo: '',
    categories: [],
  };

  const props: ExpenseFormProps = { expense, onSubmit: vi.fn() };

  const renderElement = ({ expense, onSubmit }: ExpenseFormProps) =>
    render(
      <QueryClientProvider client={testQueryClient}>
        <ExpenseForm expense={expense} onSubmit={onSubmit} />
      </QueryClientProvider>
    );

  describe('date', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({ ...props });
      const label = getByLabelText('날짜');
      expect(label).toBeInTheDocument();
    });
  });

  describe('memo', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({ ...props });
      const label = getByLabelText('메모');
      expect(label).toBeInTheDocument();
    });
  });

  describe('category', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({ ...props });
      const label = getByLabelText('카테고리');
      expect(label).toBeInTheDocument();
    });

    it('renders CategorySettingButton.', () => {
      const { getByLabelText } = renderElement({ ...props });
      const buttonLabel = getByLabelText('카테고리 설정 버튼');
      expect(buttonLabel).toBeInTheDocument();
      expect(buttonLabel.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('amount', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({ ...props });
      const label = getByLabelText('금액');
      expect(label).toBeInTheDocument();
    });
  });

  describe('submit button', () => {
    it('renders 추가 when expense is not provided.', () => {
      const { getByRole } = renderElement({ ...props });
      const submitButton = getByRole('button', { name: '추가' });
      expect(submitButton).toBeInTheDocument();
    });

    it('renders 저장 when expense is provided.', () => {
      const { getByRole } = renderElement({
        ...props,
      });
      const submitButton = getByRole('button', { name: '저장' });
      expect(submitButton).toBeInTheDocument();
    });
  });
});
