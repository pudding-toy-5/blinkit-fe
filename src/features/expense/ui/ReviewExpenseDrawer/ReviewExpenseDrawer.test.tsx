import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ReviewExpenseDrawer, { type Props } from './ReviewExpenseDrawer';

describe('ReviewExpenseDrawer', () => {
  const props: Props = {
    isOpen: false,
    setConsumptionKind: vi.fn(),
    onOpenChange: vi.fn(),
  };

  const renderElement = ({ isOpen, setConsumptionKind, onOpenChange }: Props) =>
    render(
      <ReviewExpenseDrawer
        isOpen={isOpen}
        setConsumptionKind={setConsumptionKind}
        onOpenChange={onOpenChange}
      />
    );

  it('when isOpen is false, renders empty.', () => {
    const { container } = renderElement({ ...props, isOpen: false });

    expect(container).toBeEmptyDOMElement();
  });

  it('when isOpen is true, does not render empty.', () => {
    const { container } = renderElement({ ...props, isOpen: true });

    expect(container).toBeInTheDocument();
  });
});
