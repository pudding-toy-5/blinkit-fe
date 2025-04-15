import { Category } from '@/features/category/model/types/Category';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';

export interface ServerRetrospectiveCategory {
  category: Category;
  total_amount: number;
}

export interface RetrospectiveCategory {
  category: Category;
  totalAmount: number;
}

export interface ServerRetrospective {
  consumption_kind: ConsumptionKind;
  total_count: number;
  total_amount: number;
  items: ServerRetrospectiveCategory[];
}

export interface Retrospective {
  consumptionKind: ConsumptionKind;
  totalCount: number;
  totalAmount: number;
  items: RetrospectiveCategory[];
}
