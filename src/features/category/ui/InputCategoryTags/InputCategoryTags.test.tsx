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
    const placeholder = 'placeholder-test-text';
    const { getByLabelText } = renderElement({ placeholder: placeholder });
    const input = getByLabelText('카테고리 추가 입력');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', placeholder);
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('when value has more than one item, renders CategoryTags with value item.', () => {
    const values = ['first', 'second', 'third'];
    const { getByText } = renderElement({ value: values });
    const items = values.map((item) => getByText(item));

    items.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('when CategoryTag delete button is clicked, calls onChange with removed values, removes clicked CategoryTag', () => {
    const first = 'first';
    const values: string[] = [first, 'second', 'third'];
    const onChange = vi.fn();
    const { getByText } = renderElement({
      value: values,
      onChange,
    });
    const firstItem = getByText(first);

    expect(firstItem).toBeInTheDocument();
    expect(firstItem.firstElementChild).not.toBeNull();

    if (firstItem.firstElementChild !== null) {
      const deleteButton = firstItem.firstElementChild;
      expect(deleteButton.tagName.toLowerCase()).toBe('button');

      fireEvent.click(deleteButton);

      expect(onChange).toBeCalledWith(values.filter((item) => item !== first));
    }
  });

  describe('input placeholder', () => {
    it('when value is empty, renders input tag with placeholder.', () => {
      const placeholder = 'placeholder-test-text';
      const { getByPlaceholderText } = renderElement({
        placeholder: placeholder,
      });
      const input = getByPlaceholderText(placeholder);

      expect(input).toBeInTheDocument();
      expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('when value is not empty, renders input tag without placeholder.', () => {
      const { getByRole } = renderElement({ value: ['not-empty'] });
      const input = getByRole('textbox');

      expect(input).toBeInTheDocument();
      expect(input).not.toHaveAttribute('placeholder');
    });
  });

  describe('add-button', () => {
    it('renders add-button with correct aria-label attribute.', () => {
      const { getByRole } = renderElement({});
      const addButton = getByRole('button', { name: /추가/i });

      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveAttribute(
        'aria-label',
        '카테고리 태그 추가 버튼'
      );
    });

    it('when input is empty, add-button is disabled.', () => {
      const { getByRole } = renderElement({});
      const addButton = getByRole('button', { name: /추가/i });
      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: '' } });
      expect(addButton).toBeDisabled();
    });

    it('when add-button is clicked, calls onChange with input value, changes input value to empty.', () => {
      const onChange = vi.fn();
      const placeholder = 'placeholder-test';
      const inputValue = 'input-value-test';
      const { getByRole } = renderElement({
        placeholder: placeholder,
        onChange: onChange,
      });
      const addButton = getByRole('button', { name: /추가/i });
      const input = getByRole('textbox');

      expect(input).toHaveValue('');

      fireEvent.change(input, { target: { value: inputValue } });

      expect(input).toHaveValue(inputValue);

      fireEvent.click(addButton);

      expect(onChange).toBeCalledWith([inputValue]);
      expect(input).toHaveValue('');
      expect(addButton).toBeDisabled();
    });
  });
});
