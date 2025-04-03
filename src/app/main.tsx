import 'pretendard/dist/web/static/pretendard.css';
import './index.css';

// tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// tanstack-router
import {
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';

import PrivacyPage from '@/pages/about/agreements/PrivacyPage';
import TermsPage from '@/pages/about/agreements/TermsPage';
import Toaster from '@/shared/ui/Toaster';

import { routeTree } from './routeTree.gen';

const agreementsRoute = createRoute({
  getParentRoute: () => routeTree,
  path: 'about/agreements',
  component: Outlet,
});

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

agreementsRoute.addChildren([termsRoute, privacyRoute]);
routeTree.addChildren([agreementsRoute]);

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDom.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </QueryClientProvider>
    </StrictMode>
  );
}
