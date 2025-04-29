import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';

import ConsumptionKindDrawer, { type Props } from './ConsumptionKindDrawer';

describe('ConsumptionKindDrawer', () => {
  const props: Props = {
    isOpen: false,
    onClose: vi.fn(),
    consumptionKind: ConsumptionKind.none,
    setConsumptionKind: vi.fn(),
  };

  const renderElement = ({
    isOpen,
    onClose,
    consumptionKind,
    setConsumptionKind,
  }: Props) =>
    render(
      <ConsumptionKindDrawer
        isOpen={isOpen}
        onClose={onClose}
        consumptionKind={consumptionKind}
        setConsumptionKind={setConsumptionKind}
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
