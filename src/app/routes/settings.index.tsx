import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { TOKEN_KEY } from '@/constants';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
});

interface SettingItem {
  text: string;
  to?: string;
  onClick?: () => void;
}

interface SettingGroup {
  text: string;
  settingItems: SettingItem[];
}

function RouteComponent() {
  const navigate = useNavigate();
  const settingGroups: SettingGroup[] = [
    {
      text: '계정 정보',
      settingItems: [
        {
          text: '내 정보 수정',
          to: '/settings/account',
        },
      ],
    },
    {
      text: '앱 정보',
      settingItems: [
        {
          text: '서비스 이용약관',
          to: '/about/agreements/terms.html',
        },
        {
          text: '개인정보 처리방침',
          to: '/about/agreements/privacy.html',
        },
      ],
    },
    {
      text: '계정 관리',
      settingItems: [
        {
          text: '로그아웃',
          onClick: () => {
            localStorage.removeItem(TOKEN_KEY);
            void navigate({ to: '/login' });
          },
        },
      ],
    },
  ];

  return (
    <Layout guarded>
      <SubPageHeader title='설정' back />
      <ul className='flex flex-col list-none gap-6 pt-6 px-5'>
        {settingGroups.map((settingGroup) => (
          <li className='flex flex-col gap-4' key={settingGroup.text}>
            <p className='text-[13px] text-[#999] font-semibold'>
              {settingGroup.text}
            </p>
            <ul className='flex flex-col gap-2 list-none'>
              {settingGroup.settingItems.map(({ text, to, onClick }) => (
                <li
                  className='flex flex-row items-center py-[9px]'
                  key={text}
                  onClick={onClick}
                >
                  <p className='text-[15px] text-[#222]'>{text}</p>
                  {to && !onClick && (
                    <Button
                      variant='ghost'
                      className='w-4 h-4 ml-auto p-0 has-[>svg]:p-0 rounded-none'
                      asChild
                    >
                      <Link to={to}>
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
