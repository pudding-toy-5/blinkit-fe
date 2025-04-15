import {
  Retrospective,
  RetrospectiveCategory,
  ServerRetrospective,
  ServerRetrospectiveCategory,
} from './Retrospective';

export const fromServerRetrospectiveCategory = ({
  category,
  total_amount: totalAmount,
}: ServerRetrospectiveCategory): RetrospectiveCategory => {
  return {
    category,
    totalAmount,
  };
};

export const toServerRetrospectiveCategory = ({
  category,
  totalAmount: total_amount,
}: RetrospectiveCategory): ServerRetrospectiveCategory => {
  return {
    category,
    total_amount,
  };
};

export const fromServerRetrospective = ({
  consumption_kind: consumptionKind,
  total_count: totalCount,
  total_amount: totalAmount,
  items,
}: ServerRetrospective): Retrospective => {
  return {
    consumptionKind,
    totalCount,
    totalAmount,
    items: items.map((item) => fromServerRetrospectiveCategory(item)),
  };
};

export const toServerRetrospective = ({
  consumptionKind: consumption_kind,
  totalCount: total_count,
  totalAmount: total_amount,
  items,
}: Retrospective): ServerRetrospective => {
  return {
    consumption_kind,
    total_count,
    total_amount,
    items: items.map((item) => toServerRetrospectiveCategory(item)),
  };
};
