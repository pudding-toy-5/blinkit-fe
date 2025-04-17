import { Category } from '@/features/category/model/types/Category';
import { cn } from '@/shared/ui/styles/utils';

const CategoryButton: React.FC<{
  text: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ text, isActive, onClick }) => {
  return (
    <button
      className={cn(
        'text-[13px] font-medium whitespace-nowrap',
        'px-3 py-2 rounded-full',
        isActive ? 'bg-[#222] text-[#fff]' : 'bg-[#E1DFDC] text-[#555]'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

interface Props {
  categories: Category[];
  selectedCategories: Category[];
  onClickCategory: (category: Category) => void;
  onClearSelectedCategories: () => void;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategories,
  onClickCategory,
  onClearSelectedCategories,
}) => {
  return (
    <ul className='flex flex-row shrink-0 gap-2 pt-4 pb-[22px] px-5 overflow-x-auto scrollbar-hide'>
      <li key='category-all'>
        <CategoryButton
          text='전체'
          isActive={selectedCategories.length === 0}
          onClick={onClearSelectedCategories}
        />
      </li>
      {categories.map((category) => (
        <li key={category.uid}>
          <CategoryButton
            text={category.name}
            isActive={selectedCategories.includes(category)}
            onClick={() => {
              onClickCategory(category);
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
