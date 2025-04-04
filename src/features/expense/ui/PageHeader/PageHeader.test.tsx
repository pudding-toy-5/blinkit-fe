import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders Logo.', () => {
    const { getByLabelText } = render(<PageHeader />);
    const logo = getByLabelText('로고');

    expect(logo).toBeInTheDocument();
  });

  it('renders Setting Button.', () => {
    const { getByLabelText } = render(<PageHeader />);
    const settingButton = getByLabelText('세팅 버튼');

    expect(settingButton).toBeInTheDocument();
  });
});
