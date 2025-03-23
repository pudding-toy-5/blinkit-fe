import { describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import LabeledTextInput, { LabeledTextInputProps } from './LabeledTextInput';

describe('LabeledTextInput', () => {
  const inputProps: LabeledTextInputProps = {
    label: 'default-label',
    id: 'default-id',
    placeholder: undefined,
    value: '',
    state: 'default',
    maxLength: 0,
    onChange: vitest.fn(),
  };

  const renderInput = ({
    label,
    id,
    placeholder,
    value,
    state,
    maxLength,
    onChange,
  }: LabeledTextInputProps) =>
    render(
      <LabeledTextInput
        label={label}
        id={id}
        placeholder={placeholder}
        value={value}
        state={state}
        maxLength={maxLength}
        onChange={onChange}
      />
    );

  it('renders label and input, id correctly.', () => {
    const labelText = 'test-label label';
    const inputId = 'input-id';

    const { getByText, getByRole } = renderInput({
      ...inputProps,
      label: labelText,
      id: inputId,
    });

    // check label
    const labelElement = getByText(labelText);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', inputId);

    // check rendering input
    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('id', inputId);
  });

  it('renders provided placeholder.', () => {
    const placeholderText = 'place holder text';
    const { getByPlaceholderText } = renderInput({
      ...inputProps,
      placeholder: placeholderText,
    });
    const placeholderElement = getByPlaceholderText(placeholderText);

    expect(placeholderElement).toBeInTheDocument();
  });

  it('renders provided value.', () => {
    const valueText = 'provided value for test';
    const { getByRole } = renderInput({
      ...inputProps,
      value: valueText,
    });
    const inputElement = getByRole('textbox');

    expect(inputElement).toHaveValue(valueText);
  });

  it('when input changes, updates value and calls onChange.', () => {
    const inputText = 'test-for-input-changes';
    const handleChange = vitest.fn();
    const { getByRole } = renderInput({
      ...inputProps,
      onChange: handleChange,
    });
    const inputElement = getByRole('textbox');

    fireEvent.change(inputElement, {
      target: { value: inputText },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(inputText);
  });

  it('if maxLength and value is provided, renders counter.', () => {
    const { getByLabelText } = renderInput({
      ...inputProps,
      id: 'id',
      label: 'label',
      placeholder: 'placeholder',
      value: '333',
      state: 'default',
      maxLength: 30,
    });

    const valueLength = getByLabelText('value length');
    expect(valueLength).toBeInTheDocument();
    expect(valueLength).toHaveTextContent('3');

    const maxLength = getByLabelText('max length');
    expect(maxLength).toBeInTheDocument();
    expect(maxLength).toHaveTextContent('/30');
  });

  describe('state', () => {
    it('renders completed.', () => {
      const { getByRole } = renderInput({
        ...inputProps,
        state: 'completed',
      });
      const inputElement = getByRole('textbox');

      expect(inputElement).toHaveClass('border-[#28a745]');
    });

    it('renders disabled.', () => {
      const { getByRole } = renderInput({
        ...inputProps,
        state: 'disabled',
      });
      const inputElement = getByRole('textbox');

      expect(inputElement).toBeDisabled();
      expect(inputElement).toHaveClass('border-[#ccc]');
    });

    it('renders error.', () => {
      const { getByRole } = renderInput({
        ...inputProps,
        state: 'error',
      });
      const inputElement = getByRole('textbox');

      expect(inputElement).toHaveClass('border-[#d32f2f]');
    });
  });
});
