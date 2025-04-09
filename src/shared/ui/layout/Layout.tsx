import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import { useMe } from '@/features/auth/api/useAuth';

const Layout: React.FC<{
  children?: React.ReactNode;
  isLoading?: boolean;
  guarded?: boolean;
}> = ({ children, isLoading, guarded }) => {
  const navigate = useNavigate();
  const { data: user, isError } = useMe();

  if (!guarded) {
    return (
      <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
        {children}
      </div>
    );
  }

  if (isError) {
    toast.error('소셜 로그인에서 문제가 발생했어요.');
    void navigate({ to: '/login' });
    return;
  }

  if (user?.nickname === undefined || user.nickname === '') {
    toast.error('닉네임을 설정한 후 서비스를 사용할 수 있어요.');
    void navigate({ to: '/settings/account' });
    return;
  }

  if (isLoading) {
    return (
      <div className='container mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
        <div className='flex flex-1 justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
      {children}
    </div>
  );
};

export default Layout;
