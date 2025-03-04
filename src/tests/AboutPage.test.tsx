import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { createRoutesStub } from 'react-router';

import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  const AboutStub = createRoutesStub([
    {
      path: '/about',
      Component: AboutPage,
    },
  ]);

  it(`renders text 'AboutPage'.`, () => {
    const { getByText } = render(<AboutStub initialEntries={['/about']} />);

    expect(getByText('AboutPage')).not.toBeNull();
  });

  it(`renders button 'to HomePage'`, () => {
    const { getByText } = render(<AboutStub initialEntries={['/about']} />);

    expect(getByText('to HomePage')).not.toBeNull();

    // when clicks button, page should move to '/'
  });
});
