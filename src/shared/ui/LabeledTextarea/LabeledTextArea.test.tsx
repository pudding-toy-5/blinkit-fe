import { fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';

import LabeledTextarea, { LabeledTextareaProps } from './LabeledTextarea';

describe('LabeledTextarea', () => {
  const props: LabeledTextareaProps = {
    id: 'props-id',
    label: 'label',
    placeholder: 'placeholder',
    value: '',
    onChange: vitest.fn(),
    state: 'default',
    maxLength: 120,
  };

  const renderElement = ({
    label,
    id,
    placeholder,
    value,
    onChange,
    state,
    maxLength,
  }: LabeledTextareaProps) =>
    render(
      <LabeledTextarea
        label={label}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        state={state}
        maxLength={maxLength}
      />
    );

  it('renders label and textarea, id correctly.', () => {
    const { getByText, getByLabelText } = renderElement({
      ...props,
    });

    const labelElement = getByText(props.label);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', props.id);

    const textarea = getByLabelText(props.label);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', props.id);
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  it('renders placeholder.', () => {
    const { getByPlaceholderText } = renderElement({ ...props });

    const placeholder = getByPlaceholderText(props.placeholder);
    expect(placeholder).toBeInTheDocument();
  });

  it('renders value correctly.', () => {
    const value = 'value-test';
    const { getByText } = renderElement({ ...props, value });

    expect(getByText(value)).toBeInTheDocument();
  });

  it('when input changes, calls onChange.', () => {
    const inputText = 'asdfasdfasdfasdfas';
    const handleChange = vitest.fn();

    const { getByRole } = renderElement({
      ...props,
      onChange: handleChange,
    });
    const inputElement = getByRole('textbox');

    fireEvent.change(inputElement, {
      target: { value: inputText },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(inputText);
  });

  describe('state', () => {
    it('renders default.', () => {
      const { getByRole } = renderElement({ ...props, state: 'default' });
      const textarea = getByRole('textbox');
      expect(textarea).toHaveClass('border-[#cccccc]');
    });

    it('renders focus.', () => {
      const { getByRole } = renderElement({ ...props, state: 'focus' });
      const textarea = getByRole('textbox');

      expect(textarea).toHaveClass('border-[#555555]');
    });

    it('renders completed.', () => {
      const { getByRole } = renderElement({ ...props, state: 'completed' });
      const textarea = getByRole('textbox');
      expect(textarea).toHaveClass('border-[#28a745]');
    });

    it('renders error with value length.', () => {
      const { getByRole, getByLabelText } = renderElement({
        ...props,
        value: '333',
        state: 'error',
        maxLength: 2,
      });

      const textarea = getByRole('textbox');
      expect(textarea).toHaveClass('border-[#d32f2f]');

      const valueLength = getByLabelText('value length');
      expect(valueLength).toHaveClass('text-[#d32f2f]');
    });
  });

  it('renders value length and maxLength.', () => {
    const { getByText } = renderElement({ ...props });
    const valueLength = getByText(props.value.length.toString());
    const maxLength = getByText(`/${props.maxLength.toString()}`);

    expect(valueLength).toBeInTheDocument();
    expect(maxLength).toBeInTheDocument();
  });
});
