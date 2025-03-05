export interface SubPageHeaderProps {
  backLink?: string;
  title: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ backLink, title }) => {
  return (
    <header className="flex flex-row h-12 px-4 py-3">
      <button className="w-6 h-6" aria-label="뒤로가기">
        {'<'}
      </button>
      <h1 className="ml-2 text-base">{title}</h1>
    </header>
  );
};

export default SubPageHeader;
