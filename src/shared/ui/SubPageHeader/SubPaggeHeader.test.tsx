import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// mock react-router useRouter().history.back()
const mockBack = vi.fn();

vi.mock('@tanstack/react-router', () => ({
  useRouter: () => ({
    history: {
      back: mockBack,
    },
  }),
}));

// after mock function
import SubPageHeader, { SubPageHeaderProps } from './SubPageHeader';

describe('SubPageHeader', () => {
  const props: SubPageHeaderProps = {
    title: 'sub page title',
  };

  const renderSubPageHeader = ({ title }: SubPageHeaderProps) =>
    render(<SubPageHeader title={title} />);

  it('renders the provided title correctly.', () => {
    const { getByText } = renderSubPageHeader({ ...props });
    const title = getByText(props.title);

    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h1');
  });
});
