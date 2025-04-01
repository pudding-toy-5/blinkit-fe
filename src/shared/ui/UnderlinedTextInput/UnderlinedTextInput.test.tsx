import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import UnderlinedTextInput, {
  UnderlinedTextInputProps,
} from './UnderlinedTextInput';

describe('UnderlinedTextInput', () => {
  const props: UnderlinedTextInputProps = { value: '', onChange: vi.fn() };
  const renderElement = ({
    value = '',
    onChange = vi.fn(),
    placeholder = undefined,
    guideText = undefined,
    maxLength = undefined,
  }: UnderlinedTextInputProps) =>
    render(
      <UnderlinedTextInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        guideText={guideText}
        maxLength={maxLength}
      />
    );

  it('renders input.', () => {
    const { getByRole } = renderElement({ ...props });
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('renders provided placeholder.', () => {
    const placeholder = 'placeholder-text';
    const { getByPlaceholderText } = renderElement({ ...props, placeholder });
    expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('renders provided guideText.', () => {
    const guideText = 'guide-text';
    const { getByText } = renderElement({ ...props, guideText });
    expect(getByText(guideText)).toBeInTheDocument();
  });

  it('renders input tag with provided value.', () => {
    const value = 'value';
    const { getByRole } = renderElement({ ...props, value });
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  it('calls onChange with input value when input was changed.', () => {
    const newValue = 'new-value';
    const onChange = vi.fn();
    const { getByRole } = renderElement({ ...props, value: '', onChange });
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: newValue } });

    expect(onChange).toBeCalledWith(newValue);
  });

  describe('delete button', () => {
    it('renders delete button when value.length is over than 0. It calls onChange with empty string when clicked.', () => {
      const value = '1';
      const onChange = vi.fn();
      const { getByRole } = renderElement({ ...props, value, onChange });

      const deleteButton = getByRole('button');
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);
      expect(onChange).toBeCalledWith('');
    });
  });

  it('renders character counter when maxLength is provided.', () => {
    const maxLength = 55;
    const { getByText } = renderElement({ ...props, maxLength, value: 'four' });

    expect(getByText(`/${maxLength.toString()}`)).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
  });
});
