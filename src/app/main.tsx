import { createRoot } from 'react-dom/client';
import '@/shared/styles/index.css';
import { RouterProvider } from 'react-router';

import { router } from '@/app/router';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
