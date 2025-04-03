// routes.custom.ts
import { createRoute, Outlet } from '@tanstack/react-router';

import PrivacyPage from '@/pages/about/agreements/PrivacyPage';
import TermsPage from '@/pages/about/agreements/TermsPage';

import { routeTree } from './routeTree.gen';

// agreements 라우트 생성 (부모: routeTree)
const agreementsRoute = createRoute({
  getParentRoute: () => routeTree,
  path: '/about/agreements',
  component: Outlet,
});

// agreements 자식 라우트 생성
const termsRoute = createRoute({
  getParentRoute: () => agreementsRoute,
  path: 'terms.html',
  component: TermsPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => agreementsRoute,
  path: 'privacy.html',
  component: PrivacyPage,
});

// 자식 라우트 추가
agreementsRoute.addChildren([termsRoute, privacyRoute]);

// 확장된 라우트를 기존 routeTree에 추가

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const existingChildren = routeTree.children || [];
routeTree.children = [...existingChildren, agreementsRoute];

export { routeTree };
