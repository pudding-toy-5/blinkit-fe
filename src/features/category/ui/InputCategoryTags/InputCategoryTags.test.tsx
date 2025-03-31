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

  describe('input', () => {
    it('renders input tag with aria-label.', () => {
      const { getByLabelText } = renderElement({});
      const input = getByLabelText('카테고리 추가 입력');
      expect(input).toBeInTheDocument();
      expect(input.tagName.toLowerCase()).toBe('input');
    });

    it('disabled input when length of value is over 3.', () => {
      const values: string[] = ['11', '22', '33'];
      const { getByRole } = renderElement({ value: values });
      const input = getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toBeDisabled();
    });

    describe('placeholder', () => {
      it('when value is empty, renders input tag with placeholder.', () => {
        const placeholder = 'placeholder-test-text';
        const { getByPlaceholderText } = renderElement({
          value: [],
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
  });

  it('throw error when value.length > 3.', () => {
    expect(() => renderElement({ value: ['1', '2', '3', '4'] })).toThrow(Error);
  });

  describe('CategoryTags', () => {
    it('renders CategoryTags with value.', () => {
      const values = ['first', 'second', 'third'];
      const { getByText } = renderElement({ value: values });
      const items = values.map((item) => getByText(item));

      items.forEach((item) => {
        expect(item).toBeInTheDocument();
      });
    });

    it('calls onChange when clicks delete-button of CategoryTag', () => {
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

        expect(onChange).toBeCalledWith(
          values.filter((item) => item !== first)
        );
      }
    });
  });

  describe('add-button', () => {
    it('renders add-button with aria-label.', () => {
      const { getByRole } = renderElement({});
      const addButton = getByRole('button', { name: /추가/i });

      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveAttribute(
        'aria-label',
        '카테고리 태그 추가 버튼'
      );
    });

    it('disables when input is empty.', () => {
      const { getByRole } = renderElement({});
      const addButton = getByRole('button', { name: /추가/i });
      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: '' } });
      expect(addButton).toBeDisabled();
    });

    it('calls onChange with input value when button is clicked.', () => {
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
