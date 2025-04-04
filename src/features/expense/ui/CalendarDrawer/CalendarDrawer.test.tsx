import { fireEvent, render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import CalendarDrawer, { CalendarDrawerProps } from './CalendarDrawer';

describe('CalendarDrawer', () => {
  const props: CalendarDrawerProps = {
    id: 'base-id',
    trigger: 'trigger',
    date: new Date(),
    setDate: vi.fn(),
  };

  const renderElement = ({ id, trigger, date, setDate }: CalendarDrawerProps) =>
    render(
      <CalendarDrawer id={id} trigger={trigger} date={date} setDate={setDate} />
    );

  it('renders drawer trigger.', () => {
    const { getByRole } = renderElement({ ...props });

    const trigger = getByRole('button');
    expect(trigger).toBeInTheDocument();
    expect(trigger.innerHTML).toBe(props.trigger);
  });

  describe('when trigger button is clicked.', () => {
    it('renders title and close button', () => {
      const titleText = '날짜 선택';
      const { getByRole, getByText, queryByTitle } = renderElement({
        ...props,
      });

      // drawer content is not rendered
      expect(queryByTitle(titleText)).not.toBeInTheDocument();

      const trigger = getByRole('button', { name: 'trigger' });
      fireEvent.click(trigger);

      // drawer content is rendered
      // title
      const title = getByText(titleText);
      expect(title).toBeInTheDocument();
      expect(title.tagName.toLowerCase()).toBe('h2');
    });

    it('renders today button. when it clicks, calls setDate with Today.', () => {
      const { getByRole } = renderElement({ ...props });

      const trigger = getByRole('button', { name: 'trigger' });
      fireEvent.click(trigger);

      const todayButton = getByRole('button', { name: '오늘' });
      expect(todayButton).toBeInTheDocument();

      fireEvent.click(todayButton);

      const _today = new Date();
      const today = new Date(
        _today.getFullYear(),
        _today.getMonth(),
        _today.getDate()
      );
      expect(props.setDate).toBeCalledWith(today);
    });

    it('renders submit button. when it clicks, calls setDate with current date.', () => {
      const { getByRole } = renderElement({ ...props });

      const trigger = getByRole('button', { name: 'trigger' });
      fireEvent.click(trigger);

      const submitButton = getByRole('button', { name: '선택' });
      expect(submitButton).toBeInTheDocument();

      fireEvent.click(submitButton);

      const _today = new Date();
      const today = new Date(
        _today.getFullYear(),
        _today.getMonth(),
        _today.getDate()
      );
      expect(props.setDate).toBeCalledWith(today);
    });
  });
});
