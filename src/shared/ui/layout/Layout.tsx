import { useNavigate } from '@tanstack/react-router';

import { TOKEN_KEY } from '@/constants';

const Layout: React.FC<{
  children?: React.ReactNode;
  guarded?: boolean;
}> = ({ children, guarded }) => {
  const navigate = useNavigate();
  if (guarded) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      void navigate({ to: '/login' });
    }
  }

  return (
    <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
      {children}
    </div>
  );
};

export default Layout;
