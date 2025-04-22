import 'pretendard/dist/web/static/pretendard.css';
import './index.css';

import Clarity from '@microsoft/clarity';
// tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// tanstack-router
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

if (import.meta.env.PROD) {
  const CLARITY_KEY = import.meta.env.VITE_CLARITY_KEY as string;

  Clarity.init(CLARITY_KEY);
  window.__clarityInitialized = true;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDom.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
        {process.env.NODE_ENV === 'development' && (
          <TanStackRouterDevtools router={router} />
        )}
      </QueryClientProvider>
    </StrictMode>
  );
}
