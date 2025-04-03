import { createFileRoute } from '@tanstack/react-router';

import Layout from '@/shared/ui/layout/Layout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

export const Route = createFileRoute('/settings/')({
  component: RouteComponent,
});

interface SettingItem {
  text: string;
  to?: string;
}

interface SettingGroup {
  text: string;
  settingItems: SettingItem[];
}

function RouteComponent() {
  const settingGroups: SettingItemGroup[] = [
    {
      text: '계정 정보',
      settingItems: [
        {
          text: '내 정보 수정',
          to: '',
        },
      ],
    },
    {
      text: '앱 정보',
      settingItems: [
        {
          text: '서비스 이용약관',
          to: '',
        },
        {
          text: '개인정보 처리방침',
          to: '',
        },
      ],
    },
    {
      text: '계정 관리',
      settingItems: [
        {
          text: '로그아웃',
        },
      ],
    },
  ];

  return (
    <Layout>
      <SubPageHeader title='설정' back />
    </Layout>
  );
}
