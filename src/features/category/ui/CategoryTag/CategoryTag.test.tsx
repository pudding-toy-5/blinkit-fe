import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

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
});
