import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  it('renders button with text.', () => {
    const text = 'submit button text';
    const onClick = vi.fn();
    const { getByRole } = render(
      <SubmitButton text={text} state='default' onClick={onClick} />
    );
    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  describe('state', () => {
    it('renders default.', () => {
      const text = 'submit button text';
      const onClick = vi.fn();
      const { getByRole } = render(
        <SubmitButton text={text} state='default' onClick={onClick} />
      );
      const button = getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-[#222]');
    });

    it('renders disabled.', () => {
      const text = 'submit button text';
      const onClick = vi.fn();
      const { getByRole } = render(
        <SubmitButton text={text} state='disabled' onClick={onClick} />
      );
      const button = getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveClass('bg-[#ccc]');
    });
  });

  it('when button is clicked, onClick is called.', () => {
    const text = 'submit button text';
    const onClick = vi.fn();
    const { getByRole } = render(
      <SubmitButton text={text} state='default' onClick={onClick} />
    );
    const button = getByRole('button');

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
