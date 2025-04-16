import { useEffect, useState } from 'react';

import { Category } from '@/features/category/model/types/Category';
import { useExpenses } from '@/features/expense/api/useExpenseQuery';
import { ConsumptionKind } from '@/features/expense/model/types/ConsumptionKind';
import ReviewExpenseCard from '@/features/expense/ui/ReviewExpenseCard';
import { getConsumptionTexts } from '@/features/expense/utils';
import UserLayout from '@/shared/ui/layout/UserLayout';
import { cn } from '@/shared/ui/styles/utils';
import SubPageHeader from '@/shared/ui/SubPageHeader';

const CategoryButton: React.FC<{
  text: string;
  isClicked: boolean;
  onClick: () => void;
}> = ({ text, isClicked, onClick }) => {
  return (
    <button
      className={cn(
        'bg-[#E1DFDC]',
        'text-[13px] text-[#555] font-medium whitespace-nowrap',
        'px-3 py-2 rounded-full',
        isClicked && 'bg-[#222] text-[#fff]'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface Props {
  consumptionKind: ConsumptionKind;
  onClose: () => void;
}

const RetrospectiveDetailPopover: React.FC<Props> = ({
  consumptionKind,
  onClose,
}) => {
  const { data: expenses } = useExpenses({
    period: { year: 2025, month: 4 },
    consumptionKind,
  });

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const { data: filteredExpenses, isLoading } = useExpenses({
    period: { year: 2025, month: 4 },
    consumptionKind,
    categoryUids: selectedCategories.map((c) => c.uid),
  });

  const consumptionTexts = getConsumptionTexts(consumptionKind);

  useEffect(() => {
    if (!expenses) {
      return;
    }

    setTotalAmount(
      expenses.reduce((total, expense) => total + expense.amount, 0)
    );

    const categoryMap = new Map<string, Category>();

    expenses.forEach((expense) => {
      expense.categories.forEach((category) => {
        categoryMap.set(category.uid, category);
      });
    });

    setCategories(Array.from(categoryMap.values()));
  }, [expenses, setTotalAmount]);

  if (!filteredExpenses) {
    return null;
  }

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

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-dvh flex flex-col overflow-hidden'>
      <UserLayout>
        <SubPageHeader onClickBack={onClose} />
        <div className='flex flex-col px-5 pb-4'>
          <h1 className='text-[19px] text-[#222] font-semibold'>
            {consumptionTexts.title}
          </h1>
          <span className='text-[13px] text-[#555] mt-1'>
            {consumptionTexts.description}
          </span>
          <span className='text-[22px] text-[#222] font-semibold mt-3'>
            {totalAmount.toLocaleString()}원
          </span>
        </div>
        <div className='flex-1 flex flex-col bg-[#F5F3F0] overflow-y-hidden'>
          <ul className='flex flex-row shrink-0 gap-2 pt-4 pb-[22px] px-5 overflow-x-auto scrollbar-hide'>
            <li key='category-all'>
              <CategoryButton
                text='전체 소비'
                isClicked={selectedCategories.length === 0}
                onClick={() => {
                  setSelectedCategories([]);
                }}
              />
            </li>
            {categories.map((category) => (
              <li key={category.uid}>
                <CategoryButton
                  text={category.name}
                  isClicked={selectedCategories.includes(category)}
                  onClick={() => {
                    handleClickCategory(category);
                  }}
                />
              </li>
            ))}
          </ul>
          <span className='text-[13px] text-[#555] px-5'>
            총 {filteredExpenses.length}건
          </span>
          <div className='pl-5 pr-4 mt-4 pb-8 overflow-y-auto scroll'>
            <ul className='flex flex-col gap-2'>
              {filteredExpenses.map((expense) => (
                <ReviewExpenseCard key={expense.uid} expense={expense} />
              ))}
            </ul>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default RetrospectiveDetailPopover;
