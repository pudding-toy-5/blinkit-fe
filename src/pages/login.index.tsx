import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { TOKEN_KEY } from '@/constants';
import SignInButton from '@/features/auth/ui/SignInButton';
import Onboarding from '@/features/onboarding/ui/Onboarding';
import userAxios from '@/shared/api/userAxios';
import { apiUrl } from '@/shared/consts';

export const Route = createFileRoute('/login/')({
  loader: async () => {
    try {
      const res = await userAxios.get(`${apiUrl}/account/users/me`);

      if (res.status === 200) {
        return redirect({ to: '/expenses' });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
      return;
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Onboarding />
      <div className='flex flex-col gap-3 w-full px-5 mt-auto'>
        <SignInButton service='google' />
        <SignInButton service='naver' />
      </div>
      <div className='flex flex-col items-center my-8'>
        <p className='text-[13px] text-[#555]'>
          회원가입 시{' '}
          <a
            href='https://organized-slip-9b5.notion.site/1bf8d1493c1f808b9ef3c1df49771870?pvs=4'
            rel='noopener noreferrer'
          >
            <u>서비스 이용약관</u>
          </a>
          과
        </p>
        <p className='text-[13px] text-[#555]'>
          <Link to='/privacy' target='_blank' rel='noopener noreferrer'>
            <u>개인정보 수집 및 이용</u>
          </Link>
          에 동의하게 됩니다.
        </p>
      </div>
    </>
  );
}
