import { useEffect, useState } from 'react';

import { Category } from '@/features/category/model/types/Category';
import CategoryTag from '@/features/category/ui/CategoryTag';
import { useExpenses } from '@/features/expense/api/useExpenseQuery';
import {
  consumptionConsciousTexts,
  consumptionEmotionalTexts,
  consumptionEssentialTexts,
} from '@/features/expense/consts';
import {
  ConsumptionKind,
  ConsumptionTexts,
} from '@/features/expense/model/types/ConsumptionKind';
import ReviewExpenseCard from '@/features/expense/ui/ReviewExpenseCard';
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
        'flex items-center bg-[#E1DFDC]',
        'text-[13px] text-[#555] font-medium',
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

  const { data: filteredExpenses } = useExpenses({
    period: { year: 2025, month: 4 },
    consumptionKind,
    categoryUids: selectedCategories.map((c) => c.uid),
  });

  const [consumptionTexts, setConsumptionTexts] =
    useState<ConsumptionTexts | null>(null);

  useEffect(() => {
    if (!expenses) {
      return;
    }

    setTotalAmount(
      expenses.reduce((total, expense) => total + expense.amount, 0)
    );

    const uniqueCategories = Array.from(
      Object.values(expenses.flatMap((expense) => expense.categories))
    );
    setCategories(uniqueCategories);
  }, [expenses, setTotalAmount]);

  useEffect(() => {
    if (consumptionKind === ConsumptionKind.conscious) {
      setConsumptionTexts(consumptionConsciousTexts);
    }

    if (consumptionKind === ConsumptionKind.emotional) {
      setConsumptionTexts(consumptionEmotionalTexts);
    }

    if (consumptionKind === ConsumptionKind.essential) {
      setConsumptionTexts(consumptionEssentialTexts);
    }
  }, [consumptionKind]);

  if (!expenses) {
    return <div>asdf</div>;
  }

  if (!filteredExpenses) {
    return <div>asdf</div>;
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
            {consumptionTexts?.title}
          </h1>
          <span className='text-[13px] text-[#555] mt-1'>
            {consumptionTexts?.description}
          </span>
          <span className='text-[22px] text-[#222] font-semibold mt-3'>
            {totalAmount.toLocaleString()}원
          </span>
        </div>
        <div className='flex-1 flex flex-col bg-[#F5F3F0]'>
          <ol className='flex flex-row gap-2 pt-4 pb-5.5 pl-5'>
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
          </ol>
          <span className='text-[13px] text-[#555] px-5'>
            총 {expenses.length}건
          </span>
          <ul className='flex flex-col gap-2 pl-5 pr-4 scroll mt-4'>
            {filteredExpenses.map((expense) => (
              <ReviewExpenseCard key={expense.uid} expense={expense} />
            ))}
          </ul>
        </div>
      </UserLayout>
    </div>
  );
};

export default RetrospectiveDetailPopover;
