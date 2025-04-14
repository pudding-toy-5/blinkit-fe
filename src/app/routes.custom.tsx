// routes.custom.ts
import { createRoute, Outlet } from '@tanstack/react-router';

import PrivacyPage from '@/pages/about/agreements/PrivacyPage';
import GuestLayout from '@/shared/ui/layout/GuestLayout';
import SubPageHeader from '@/shared/ui/SubPageHeader';

import { routeTree } from './routeTree.gen';

// agreements 라우트 생성 (부모: routeTree)
const agreementsRoute = createRoute({
  getParentRoute: () => routeTree,
  path: '/about/agreements',
  component: () => (
    <GuestLayout>
      <Outlet />
    </GuestLayout>
  ),
});

const privacyRoute = createRoute({
  getParentRoute: () => agreementsRoute,
  path: 'privacy.html',
  component: () => (
    <>
      <SubPageHeader title='개인정보 처리방침' />
      <PrivacyPage />
    </>
  ),
});

// 자식 라우트 추가
agreementsRoute.addChildren([privacyRoute]);

// 확장된 라우트를 기존 routeTree에 추가

const existingChildrenArray = Object.values(routeTree.children ?? {});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
routeTree.addChildren([...existingChildrenArray, agreementsRoute]);

export { routeTree };
