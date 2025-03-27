export interface CategoryTagProps {
  tagName: string;
}

const CategoryTag: React.FC<CategoryTagProps> = ({ tagName }) => {
  return (
    <div
      className='bg-[#EAF6EC] text-[#28A745] rounded-full px-2 py-1 text-[13px]'
      aria-label={`카테고리: ${tagName}`}
    >
      <p>{tagName}</p>
    </div>
  );
};

export default CategoryTag;
