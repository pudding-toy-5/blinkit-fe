import type YearMonth from '@/shared/model/YearMonth';

export interface YearMonthPickerProps {
  value: YearMonth;
  onChange: (yearMonth: YearMonth) => void;
}

export interface YearMonthTriggerProps {
  yearMonth: YearMonth;
}

export interface YearMonthListProps {
  selected: YearMonth;
  onSelect: (yearMonth: YearMonth) => void;
}

export interface YearMonthListItemProps {
  yearMonth: YearMonth;
  isSelected: boolean;
  handleClick: (yearMonth: YearMonth) => void;
}
