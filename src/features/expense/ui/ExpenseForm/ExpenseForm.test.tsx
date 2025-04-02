import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ExpenseForm, { ExpenseFormProps } from './ExpenseForm';

describe('ExpenseForm', () => {
  const renderElement = ({
    submitButtonText = 'submit button text',
  }: ExpenseFormProps) =>
    render(<ExpenseForm submitButtonText={submitButtonText} />);

  describe('date', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({});
      const label = getByLabelText('날짜');
      expect(label).toBeInTheDocument();
    });
  });

  describe('memo', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({});
      const label = getByLabelText('메모');
      expect(label).toBeInTheDocument();
    });
  });

  describe('category', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({});
      const label = getByLabelText('카테고리');
      expect(label).toBeInTheDocument();
    });

    it('renders CategorySettingButton.', () => {
      const { getByLabelText } = renderElement({});
      const buttonLabel = getByLabelText('카테고리 설정 버튼');
      expect(buttonLabel).toBeInTheDocument();
      expect(buttonLabel.tagName.toLowerCase()).toBe('button');
    });
  });

  describe('amount', () => {
    it('renders label.', () => {
      const { getByLabelText } = renderElement({});
      const label = getByLabelText('금액');
      expect(label).toBeInTheDocument();
    });
  });

  it('renders provided submitButtonText.', () => {
    const text = 'submit button text example';
    const { getByRole } = renderElement({ submitButtonText: text });
    const submitButton = getByRole('button', { name: text });

    expect(submitButton).toBeInTheDocument();
  });
});
