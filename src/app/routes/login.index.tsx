import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useMe } from '@/features/auth/api/useAuth';
import SignInButton from '@/features/auth/ui/SignInButton';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data } = useMe();

  if (data) {
    void navigate({ to: '/expenses' });
    return;
  }

  return (
    <Layout>
      <div className='flex flex-col gap-3 w-full px-5 mt-auto'>
        <SignInButton service='google' />
        <SignInButton service='naver' />
      </div>
      <div className='flex flex-col items-center my-8'>
        <p className='text-[13px] text-[#555]'>
          회원가입 시{' '}
          {/* <Link to='/about/agreements/terms.html' className='underline'> */}
          서비스 이용약관
          {/* </Link> */}과
        </p>
        <p className='text-[13px] text-[#555]'>
          {/* <Link to='/about/agreements/privacy.html' className='underline'> */}
          개인정보 수집 및 이용
          {/* </Link> */}에 동의하게 됩니다.
        </p>
      </div>
    </Layout>
  );
}
