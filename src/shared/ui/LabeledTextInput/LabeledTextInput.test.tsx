import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import LabeledTextInput, { LabeledTextInputProps } from './LabeledTextInput';

describe('LabeledTextInput', () => {
  const inputProps: LabeledTextInputProps = {
    label: 'default-label',
    id: 'default-id',
    placeholder: undefined,
    value: undefined,
    onChange: undefined,
    disabled: undefined,
  };

  const renderInput = ({
    label,
    id,
    placeholder,
    value,
    onChange,
    disabled,
  }: LabeledTextInputProps) =>
    render(
      <LabeledTextInput
        label={label}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
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
    // render(
    //   <LabeledTextInput label={labelText} id={inputId} />
    // );

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
});
