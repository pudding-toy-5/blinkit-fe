import { NavLink } from 'react-router';

import SubPageHeader from '@/shared/ui/SubPageHeader';

const AboutPage: React.FC = () => {
  return (
    <div className='max-w-sm mx-auto h-screen bg-gray-100 flex flex-col'>
      <SubPageHeader backLink='/' title='About Page' />
      AboutPage
      <div>
        <NavLink to='/'>to HomePage</NavLink>
      </div>
    </div>
  );
};

export default AboutPage;
