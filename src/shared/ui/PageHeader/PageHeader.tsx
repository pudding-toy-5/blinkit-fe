import { Settings } from 'lucide-react';

import Logo from '@/shared/ui/icons/Logo';

const PageHeader: React.FC = () => {
  return (
    <header className='flex flex-row h-14 px-5 py-4'>
      <div aria-label='로고'>
        <Logo />
      </div>
      <div aria-label='세팅 버튼' role='button' className='ml-auto'>
        <Settings size='24' />
      </div>
    </header>
  );
};

export default PageHeader;
