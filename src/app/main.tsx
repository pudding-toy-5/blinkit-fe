import 'pretendard/dist/web/static/pretendard.css';
import './index.css';

import Clarity from '@microsoft/clarity';
// tanstack-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// tanstack-router
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';

import Toaster from '@/shared/ui/Toaster';

import { routeTree } from './routes.custom';

const router = createRouter({ routeTree });
const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

if (import.meta.env.PROD) {
  const CLARITY_KEY = import.meta.env.VITE_CLARITY_KEY as string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Clarity.init(CLARITY_KEY);
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
