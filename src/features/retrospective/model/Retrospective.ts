import { Category } from '@/features/category/model/types/Category';
import { ConsumptionKindType } from '@/features/expense/model/types/ConsumptionKind';

export interface ServerRetrospectiveCategory {
  category: Category;
  total_amount: number;
}

export interface RetrospectiveCategory {
  category: Category;
  totalAmount: number;
}

export interface ServerRetrospective {
  consumption_kind: ConsumptionKindType;
  total_count: number;
  total_amount: number;
  items: ServerRetrospectiveCategory[];
}

export interface Retrospective {
  consumptionKind: ConsumptionKindType;
  totalCount: number;
  totalAmount: number;
  items: RetrospectiveCategory[];
}
