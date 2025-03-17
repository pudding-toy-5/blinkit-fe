import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { AboutPage } from '../about';

describe('AboutPage', () => {
  it(`renders text 'AboutPage'.`, () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('AboutPage')).not.toBeNull();
  });

  it(`renders button 'to HomePage'`, () => {
    const { getByText } = render(<AboutPage />);

    expect(getByText('to HomePage')).not.toBeNull();

    // when clicks button, page should move to '/'
  });
});
