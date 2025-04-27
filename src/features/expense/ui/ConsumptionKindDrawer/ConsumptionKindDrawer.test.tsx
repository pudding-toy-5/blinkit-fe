import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import ConsumptionKindDrawer, { type Props } from './ConsumptionKindDrawer';

describe('ReviewExpenseDrawer', () => {
  const props: Props = {
    isOpen: false,
    onClose: vi.fn(),
    setConsumptionKind: vi.fn(),
  };

  const renderElement = ({ isOpen, onClose, setConsumptionKind }: Props) =>
    render(
      <ConsumptionKindDrawer
        isOpen={isOpen}
        onClose={onClose}
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
