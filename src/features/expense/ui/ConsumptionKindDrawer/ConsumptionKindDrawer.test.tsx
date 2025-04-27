import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import ConsumptionKindDrawer, { type Props } from './ConsumptionKindDrawer';

describe('ReviewExpenseDrawer', () => {
  const props: Props = {
    isOpen: false,
    setConsumptionKind: vi.fn(),
    onOpenChange: vi.fn(),
  };

  const renderElement = ({ isOpen, setConsumptionKind, onOpenChange }: Props) =>
    render(
      <ConsumptionKindDrawer
        isOpen={isOpen}
        setConsumptionKind={setConsumptionKind}
        onOpenChange={onOpenChange}
      />
    );

  it('when isOpen is false, renders empty.', () => {
    const { container } = renderElement({ ...props, isOpen: false });

    expect(container).toBeEmptyDOMElement();
  });

  it('when isOpen is true, renders dialog.', () => {
    const { getByRole } = renderElement({ ...props, isOpen: true });

    expect(getByRole('dialog')).toBeInTheDocument();
  });
});
