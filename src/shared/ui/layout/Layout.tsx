import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { TOKEN_KEY } from '@/constants';
import { useMe } from '@/features/auth/api/useAuth';

const Layout: React.FC<{
  children?: React.ReactNode;
  isLoading?: boolean;
  guarded?: boolean;
}> = ({ children, isLoading, guarded }) => {
  const navigate = useNavigate();
  const { isLoading: isMeLoading, isError } = useMe();

  if (!guarded) {
    return (
      <div className='container mx-auto h-dvh-screen max-h-dvh-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
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

  if (isLoading || isMeLoading) {
    return (
      <div className='container mx-auto h-dvh-screen max-h-dvh-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
        <div className='flex flex-1 justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-dvh-screen max-h-dvh-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
      {children}
    </div>
  );
};

export default Layout;
