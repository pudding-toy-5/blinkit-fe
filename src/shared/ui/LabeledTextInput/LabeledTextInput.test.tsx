import { describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import LabeledTextInput, { LabeledTextInputProps } from './LabeledTextInput';

describe('LabeledTextInput', () => {
  const inputProps: LabeledTextInputProps = {
    label: 'default-label',
    id: 'default-id',
    placeholder: undefined,
    value: undefined,
    onChange: undefined,
  };

  const renderInput = ({
    label,
    id,
    placeholder,
    value,
    onChange,
  }: LabeledTextInputProps) =>
    render(
      <LabeledTextInput
        label={label}
        id={id}
        placeholder={placeholder}
        value={value}
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

    expect(inputElement).toHaveValue(inputText);
  });

  it('if maxLength and value is provided, renders correct character count.', () => {
    const maxLength = 30;
    const id = 'test-id';
    const { getByRole } = renderInput({
      ...inputProps,
      id: id,
      value: '',
      maxLength: maxLength,
    });

    const inputElement = getByRole('textbox');
    const liveRegion = getByRole('status');

    expect(liveRegion).toHaveTextContent(`0/${maxLength}`);

    const firstText = 'Hello';
    fireEvent.change(inputElement, {
      target: { value: firstText },
    });

    expect(liveRegion).toHaveTextContent(`${firstText.length}/${maxLength}`);

    const overMaxText =
      'this text is longer than max length in labeled text input component.';
    fireEvent.change(inputElement, {
      target: { value: overMaxText },
    });

    expect(liveRegion).toHaveTextContent(`${maxLength}/${maxLength}`);
  });
});
