import { createRoot } from 'react-dom/client';
import '@/shared/styles/index.scss';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from '@/app/router';
import { store } from '@/app/store/store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
