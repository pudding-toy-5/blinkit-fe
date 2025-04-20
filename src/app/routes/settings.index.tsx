import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { Button, buttonVariants } from '@/shared/ui/atoms/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/atoms/drawer';
import { TOKEN_KEY } from '@/constants';
import ArrowRight from '@/shared/ui/icons/ArrowRight';
import UserLayout from '@/shared/ui/layout/UserLayout';
import { cn } from '@/shared/ui/styles/utils';
import SubPageHeader from '@/shared/ui/SubPageHeader';
import BottomNavBar from '@/widgets/BottomNavBar';

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
          to: 'https://organized-slip-9b5.notion.site/1bf8d1493c1f808b9ef3c1df49771870?pvs=4',
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
    <UserLayout>
      <SubPageHeader title='설정' />
      <ul className='flex flex-col list-none gap-6 pt-6 px-5'>
        {settingGroups.map((settingGroup) => (
          <li className='flex flex-col gap-4' key={settingGroup.text}>
            <p className='text-[13px] text-[#999] font-semibold'>
              {settingGroup.text}
            </p>
            <ul className='flex flex-col gap-2 list-none'>
              {settingGroup.settingItems.map(({ text, to, onClick }) => (
                <li className='flex flex-row items-center py-[9px]' key={text}>
                  {!onClick && (
                    <>
                      <p className='text-[15px] text-[#222]'>{text}</p>
                      {to && (
                        <>
                          {to.startsWith('http') ? (
                            <a
                              href={to}
                              target='_blank'
                              rel='noopener noreferrer'
                              className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                'w-4 h-4 ml-auto p-0 has-[>svg]:p-0 rounded-none',
                                'ml-auto'
                              )}
                            >
                              <ArrowRight size={16} />
                            </a>
                          ) : (
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
                        </>
                      )}
                    </>
                  )}
                  {onClick && (
                    <Drawer>
                      <DrawerTrigger>{text}</DrawerTrigger>
                      <DrawerContent className='py-8 px-5 !rounded-t-[20px]'>
                        <DrawerHeader className='p-0'>
                          <DrawerTitle className='text-[19px] text-[#222] font-semibold'>
                            로그아웃할까요?{' '}
                          </DrawerTitle>
                          <DrawerDescription className='text-15px text-[#555]'>
                            <p className='text-15px text-[#555]'>
                              로그아웃하면, 소셜 로그인 화면으로 이동해요.
                            </p>
                            <p className='text-15px text-[#555]'>
                              다시 돌아오면 로그인 화면에서 반갑게 맞이할게요.
                            </p>
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter className='p-0 mt-9'>
                          <Button
                            className='h-13 rounded-full'
                            onClick={onClick}
                          >
                            로그아웃
                          </Button>
                          <DrawerClose>
                            <Button
                              variant='ghost'
                              className='h-13 w-full rounded-full'
                            >
                              취소
                            </Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <BottomNavBar variant='white' />
    </UserLayout>
  );
}
