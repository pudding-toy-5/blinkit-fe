export interface SubPageHeaderProps {
  title: string;
  back?: boolean;
  close?: boolean;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({
  title,
  back,
  close,
}) => {
  return (
    <header className='flex flex-row justify-center items-center h-12 px-5 py-4'>
      <h1 className='ml-2 text-[17px] text-[#222] font-semibold'>{title}</h1>
    </header>
  );
};

export default SubPageHeader;
