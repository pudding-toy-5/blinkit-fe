import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import CategoryTag from './CategoryTag';

describe('CategoryTag', () => {
  it('renders tagName.', () => {
    const { getByText } = render(<CategoryTag tagName='tag name test' />);
    const categoryTag = getByText('tag name test');
    expect(categoryTag).toBeInTheDocument();
  });

  it('renders label.', () => {
    const { getByLabelText } = render(<CategoryTag tagName='tag name test' />);
    const label = getByLabelText(`카테고리: tag name test`);
    expect(label).toBeInTheDocument();
  });

  describe('size', () => {
    it('when size is small, has small padding.', () => {
      const { getByLabelText } = render(
        <CategoryTag tagName='tag name test' size='small' />
      );
      const label = getByLabelText(`카테고리: tag name test`);
      expect(label).toHaveClass('px-2');
      expect(label).toHaveClass('py-1');
    });

    it('when size is medium, has medium padding.', () => {
      const { getByLabelText } = render(
        <CategoryTag tagName='tag name test' size='medium' />
      );
      const label = getByLabelText(`카테고리: tag name test`);
      expect(label).toHaveClass('px-3');
      expect(label).toHaveClass('py-2');
    });

    it('when size is large, has large padding.', () => {
      const { getByLabelText } = render(
        <CategoryTag tagName='tag name test' size='large' />
      );
      const label = getByLabelText(`카테고리: tag name test`);
      expect(label).toHaveClass('px-4');
      expect(label).toHaveClass('py-3');
    });
  });

  it('when onDelete is provided, renders delete button. When Button is clicked, calls onDelete .', () => {
    const onDelete = vi.fn();
    const { getByLabelText } = render(
      <CategoryTag tagName='tag name test' onDelete={onDelete} />
    );
    const deleteButton = getByLabelText(
      'category tag - tag name test - delete button'
    );

    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(onDelete).toBeCalled();
  });
});
