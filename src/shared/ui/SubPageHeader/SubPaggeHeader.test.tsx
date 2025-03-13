import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import SubPageHeader, { SubPageHeaderProps } from './SubPageHeader';

describe('SubPageHeader', () => {
  const renderSubPageHeader = ({ backLink, title }: SubPageHeaderProps) =>
    render(<SubPageHeader backLink={backLink} title={title} />);

  it('renders the provided title correctly.', () => {
    const props: SubPageHeaderProps = {
      backLink: '/',
      title: 'title',
    };
    const { getByText } = renderSubPageHeader(props);

    const titleElement = getByText('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('h1');
  });

  it(`renders Link with correct aria-label and to attribute(backLink).`, () => {
    const props: SubPageHeaderProps = {
      backLink: '/backLink',
      title: '',
    };
    const { getByRole } = renderSubPageHeader(props);
    const link = getByRole('link', { name: '뒤로가기' });

    expect(link).not.toBeNull();
    expect(link).toHaveAttribute('href', props.backLink);
    expect(link).toHaveAttribute('aria-label', '뒤로가기');
  });
});
