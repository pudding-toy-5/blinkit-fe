import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { HomePage } from '../index';

describe('HomePage', () => {
  it(`renders text 'HomePage'.`, () => {
    const { getByText } = render(<HomePage />);
    const title = getByText('HomePage');

    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
