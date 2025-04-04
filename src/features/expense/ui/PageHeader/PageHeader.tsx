import IconButton from '@/shared/ui/IconButton/IconButton';
import Logo from '@/shared/ui/icons/Logo';
import Setting from '@/shared/ui/icons/Setting';

const PageHeader: React.FC = () => {
  return (
    <header className='flex flex-row items-center h-14 px-5 py-4'>
      <div aria-label='로고'>
        <Logo />
      </div>
      <IconButton icon={<Setting size={24} />} className='ml-auto' />
    </header>
  );
};

export default PageHeader;
