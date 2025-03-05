import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import SubPageHeader, { SubPageHeaderProps } from './index';

describe('SubPageHeader', () => {
  const renderSubPageHeader = ({ backLink, title }: SubPageHeaderProps) =>
    render(<SubPageHeader backLink={backLink} title={title} />);

  it('renders title', () => {
    const props: SubPageHeaderProps = {
      backLink: undefined,
      title: '',
    };
    const { getByText } = renderSubPageHeader(props);

    expect(getByText(props.title)).not.toBeNull();
  });

  it('renders button', () => {
    const props: SubPageHeaderProps = {
      backLink: undefined,
      title: '',
    };
    const {} = renderSubPageHeader(props);
  });
});
