import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { createRoutesStub } from 'react-router';

import { HomePage } from '../index';

describe('HomePage', () => {
  it(`renders text 'HomePage'.`, () => {
    const { getByText } = render(<HomePage />);
    const title = getByText('HomePage');

    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
