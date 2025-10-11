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

/**
 * @param minDate - 시작 날짜 (이 달 포함)
 * @param maxDate - 종료 날짜 (이 달 포함)
 * @returns minDate 이상 maxDate 이하의 각 월 첫날을 담은 배열
 */
export const getMonthList = (minDate: Date, maxDate: Date): Date[] => {
  if (maxDate < minDate) {
    throw new Error('maxDate must be greater than or equal to minDate');
  }

  const result: Date[] = [];

  const years = maxDate.getFullYear() - minDate.getFullYear();
  const months = maxDate.getMonth() - minDate.getMonth();

  const onlyMonths = years * 12 + months + 1;

  Array.from({ length: onlyMonths }, (_, i) => i).forEach((i) => {
    const date = new Date(minDate.getFullYear(), minDate.getMonth() + i, 1);
    result.push(date);
  });

  return result;
};

/**
 * 특정 월의 시작일과 마지막 날짜 범위를 반환합니다.
 *
 * @param yearMonth - 기준 월을 나타내는 Date 객체
 *   - 일(day) 값은 무시하고, year와 month 값만 범위 계산에 사용됩니다.
 * @returns
 *   - from: 해당 월의 첫 번째 날 (YYYY-MM-01 00:00:00)
 *   - to: 해당 월의 마지막 날 (YYYY-MM-DD 23:59:59 형태, DD는 월 마지막 날짜)
 *
 * 동작 원리:
 * - from은 해당 월의 1일로 설정합니다.
 * - to는 다음 달의 0일을 지정하여 해당 월의 마지막 날짜를 계산합니다.
 *
 * 예시:
 *   getMonthRange(new Date(2025, 9, 15))
 *   => from: 2025-10-01, to: 2025-10-31
 */
export const getMonthRange = (yearMonth: Date) => {
  const from = new Date(yearMonth.getFullYear(), yearMonth.getMonth(), 1);
  const to = new Date(yearMonth.getFullYear(), yearMonth.getMonth() + 1, 0);
  return { from, to };
};
