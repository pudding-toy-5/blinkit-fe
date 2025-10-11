import { useMemo, useState } from 'react';

import { Category } from '@/features/category/model/types/Category';
import CategoryFilter from '@/features/category/ui/CategoryFilter';
import { useExpensesByRange } from '@/features/expense/api/useExpenseQuery';
import { getConsumptionTexts } from '@/features/expense/lib/consumption';
import { ConsumptionKind } from '@/features/expense/model/ConsumptionKind';
import { getMonthRange } from '@/shared/lib/dateUtils';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

import RetrospectiveCardList from './RetrospectiveCardList';
import RetrospectiveDetailHeader from './RetrospectiveDetailHeader';

interface Props {
  yearMonth: Date;
  consumptionKind: ConsumptionKind;
  onClose: () => void;
}

const RetrospectiveDetailPopoverPage: React.FC<Props> = ({
  yearMonth,
  consumptionKind,
  onClose,
}) => {
  const { from, to } = useMemo(() => getMonthRange(yearMonth), [yearMonth]);

  const { data: expenses = [] } = useExpensesByRange({
    from,
    to,
    consumptionKind,
  });

  const categories = useMemo(() => {
    const map = new Map<string, Category>();
    expenses.forEach((e) => {
      e.categories.forEach((c) => map.set(c.uid, c));
    });
    return Array.from(map.values());
  }, [expenses]);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const { data: filteredExpenses = [] } = useExpensesByRange({
    from,
    to,
    consumptionKind,
    categoryUids: selectedCategories.map((c) => c.uid),
  });

  const { title, description } = getConsumptionTexts(consumptionKind);

  const handleClickCategory = (category: Category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      return;
    }

    const removedCategories = [...selectedCategories].filter(
      (c) => c.name !== category.name && c.uid !== category.uid
    );
    setSelectedCategories(removedCategories);
  };

  const handleClearSelectedCategory = () => {
    setSelectedCategories([]);
  };

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-dvh flex flex-col overflow-hidden'>
      <Layout>
        <SubPageHeader onClickBack={onClose} />
        <RetrospectiveDetailHeader
          title={title}
          description={description}
          totalAmount={totalAmount}
        />
        <div className='flex-1 flex flex-col bg-[#F5F3F0] overflow-y-hidden'>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onClickCategory={handleClickCategory}
            onClearSelectedCategories={handleClearSelectedCategory}
          />

          <span className='text-[13px] text-[#555] px-5'>
            총 {filteredExpenses.length}건
          </span>
          <RetrospectiveCardList expenses={filteredExpenses} />
        </div>
      </Layout>
    </div>
  );
};

export default RetrospectiveDetailPopoverPage;
