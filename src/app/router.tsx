import { createBrowserRouter } from 'react-router';

import { App } from '@/app/app';
import { OAuthCallback } from '@/features/auth/ui/oauth-callback';
import { MainPage, PageNotFound, PlaylistsPage, ProfilePage, TracksPage } from '@/pages';
import { Path } from '@/shared/lib';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: Path.Main,
        element: <MainPage />,
      },
      {
        path: Path.Playlists,
        element: <PlaylistsPage />,
      },
      {
        path: Path.Tracks,
        element: <TracksPage />,
      },
      {
        path: Path.Profile,
        element: <ProfilePage />,
      },
      {
        path: Path.OAuthRedirect,
        element: <OAuthCallback />,
      },
    ],
  },
]);
