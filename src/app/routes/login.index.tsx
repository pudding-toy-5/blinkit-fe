import { createFileRoute, redirect } from '@tanstack/react-router';

import { TOKEN_KEY } from '@/constants';
import SignInButton from '@/features/auth/ui/SignInButton';
import { apiUrl } from '@/features/common/consts';
import Onboarding from '@/features/onboarding/ui/Onboarding';
import userAxios from '@/shared/api/userAxios';
import Layout from '@/shared/ui/layout/Layout';

export const Route = createFileRoute('/login/')({
  loader: async () => {
    try {
      const res = await userAxios.get(`${apiUrl}/account/users/me`);
      if (res.status !== 200) {
        localStorage.removeItem(TOKEN_KEY);
        return;
      }

      return redirect({ to: '/expenses' });
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <Onboarding />
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
