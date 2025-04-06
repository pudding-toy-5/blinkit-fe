import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { TOKEN_KEY } from '@/constants';
import { useMe } from '@/features/auth/api/useAuth';

const Layout: React.FC<{
  children?: React.ReactNode;
  guarded?: boolean;
}> = ({ children, guarded }) => {
  const navigate = useNavigate();
  const { isError } = useMe();

  if (!guarded) {
    return (
      <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
        {children}
      </div>
    );
  }

  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    toast.error('소셜 로그인에서 문제가 발생했어요.');
    void navigate({ to: '/login' });
    return;
  }

  if (isError) {
    toast.error('소셜 로그인에서 문제가 발생했어요.');
    void navigate({ to: '/login' });
    return;
  }

  return (
    <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
      {children}
    </div>
  );
};

export default Layout;
