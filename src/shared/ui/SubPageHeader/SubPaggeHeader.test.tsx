import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

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
    back: undefined,
    close: undefined,
    onClose: undefined,
  };

  const renderSubPageHeader = ({
    title,
    back,
    close,
    onClose,
  }: SubPageHeaderProps) =>
    render(
      <SubPageHeader
        title={title}
        back={back}
        close={close}
        onClose={onClose}
      />
    );

  it('renders the provided title correctly.', () => {
    const { getByText } = renderSubPageHeader({ ...props });
    const title = getByText(props.title);

    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe('h1');
  });

  it('renders provided back button, when clicks, calls router.history.back().', () => {
    const { getByLabelText } = renderSubPageHeader({
      ...props,
      back: true,
    });

    const backButton = getByLabelText('back button');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('role', 'button');

    fireEvent.click(backButton);
    expect(mockBack).toBeCalledTimes(1);
  });

  it('renders provided close button.', () => {
    const { getByLabelText } = renderSubPageHeader({
      ...props,
      close: true,
    });

    const closeButton = getByLabelText('close button');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('role', 'button');
  });

  it('renders provided onClose with close.', () => {
    const onClose = vi.fn();
    const { getByLabelText } = renderSubPageHeader({
      ...props,
      close: true,
      onClose: onClose,
    });

    const closeButton = getByLabelText('close button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(onClose).toBeCalledTimes(1);
  });
});
