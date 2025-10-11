import { formatDate } from 'date-fns';
import { DateRange } from 'react-day-picker';

export const isDateRangeCurrentYear = (dateRange: DateRange): boolean => {
  const { from, to } = dateRange;

  const currentYear = new Date().getFullYear();

  if (from && !to) {
    return from.getFullYear() === currentYear;
  }

  if (from && to) {
    return (
      from.getFullYear() === currentYear && to.getFullYear() === currentYear
    );
  }

  return false;
};

export const formatDateWithoutYear = (date: Date) => {
  return formatDate(date, 'M월 d일');
};

export const formatDateWithYear = (date: Date) => {
  return formatDate(date, 'yyyy년 M월 d일');
};

export const formatDateRange = (dateRange: DateRange) => {
  if (!dateRange.from) {
    return '전체 기간';
  }

  if (!dateRange.to) {
    if (isDateRangeCurrentYear(dateRange)) {
      return formatDateWithoutYear(dateRange.from);
    }

    return formatDateWithYear(dateRange.from);
  }

  if (isDateRangeCurrentYear(dateRange)) {
    return `${formatDateWithoutYear(dateRange.from)} - ${formatDateWithoutYear(dateRange.to)}`;
  }

  return `${formatDateWithYear(dateRange.from)} - ${formatDateWithYear(dateRange.to)}`;
};

export const getMonthList = (minDate: Date, maxDate: Date): Date[] => {
  const result: Date[] = [];
  const value = new Date(minDate.getFullYear(), minDate.getMonth());

  const years = maxDate.getFullYear() - minDate.getFullYear();
  const months = maxDate.getMonth() - minDate.getMonth();

  const onlyMonths = years * 12 + months;

  for (let i = 0; i < onlyMonths; i++) {
    result.push(new Date(value));
    value.setMonth(value.getMonth() + 1);
  }

  return result;
};
