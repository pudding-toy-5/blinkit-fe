export interface SubPageHeaderProps {
  backLink?: string;
  title: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ backLink, title }) => {
  return (
    <header>
      <button aria-label="뒤로가기">뒤로 가기</button>
      <h1>{title}</h1>
    </header>
  );
};

export default SubPageHeader;
