import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { createRoutesStub } from 'react-router';

import HomePage from '../HomePage';

describe('HomePage', () => {
  const HomeStub = createRoutesStub([
    {
      path: '/',
      Component: HomePage,
    },
  ]);

  it(`renders text 'HomePage'.`, () => {
    const { getByText } = render(<HomeStub initialEntries={['/']} />);

    expect(getByText('HomePage')).not.toBeNull();
  });

  it(`renders button 'to AboutPage'`, () => {
    const { getByText } = render(<HomeStub initialEntries={['/']} />);

    expect(getByText('to AboutPage')).not.toBeNull();

    // when user clicks button, page should move to '/about'
  });
});
