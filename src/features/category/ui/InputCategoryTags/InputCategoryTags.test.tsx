import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import InputCategoryTags from './InputCategoryTags';

describe('InputCategoryTags', () => {
  const renderElement = ({
    value = [],
    onChange = vi.fn(),
    placeholder = 'placeholder-test',
  }: {
    value?: string[];
    onChange?: () => void;
    placeholder?: string;
  }) =>
    render(
      <InputCategoryTags
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );

  it('renders input tag with correct aria-label.', () => {
    const { getByLabelText } = renderElement({});
    const input = getByLabelText('카테고리 추가 입력');
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('renders 추가 button with correct aria-label attribute.', () => {
    const { getByRole } = renderElement({});
    const addButton = getByRole('button', { name: /추가/i });

    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute('aria-label', '카테고리 태그 추가 버튼');
  });

  it('when input is empty, add button is disabled.', () => {
    const { getByRole } = renderElement({});
    const addButton = getByRole('button', { name: /추가/i });

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  it('when input is not empty, add button is not disabled.', () => {
    const placeholder = 'placeholder-test';
    const { getByRole, getByPlaceholderText } = renderElement({
      placeholder: placeholder,
    });
    const addButton = getByRole('button', { name: /추가/i });
    const input = getByPlaceholderText(placeholder);

    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();

    expect(input).toHaveTextContent('');

    fireEvent.change(input, { target: { value: 'aaa' } });

    expect(input).toHaveValue('aaa');
  });
});
