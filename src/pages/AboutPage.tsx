import { NavLink } from 'react-router';

import SubPageHeader from '@/shared/ui/SubPageHeader';

const AboutPage: React.FC = () => {
  return (
    <div>
      <SubPageHeader backLink="/" title="About Page" />
      AboutPage
      <div>
        <NavLink to="/">to HomePage</NavLink>
      </div>
    </div>
  );
};

export default AboutPage;
