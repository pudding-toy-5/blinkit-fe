import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { HomePage } from '../index';

describe('HomePage', () => {
  it(`renders text 'HomePage'.`, () => {
    const { getByText } = render(<HomePage />);
    const title = getByText('HomePage');

    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
