import { createBrowserRouter } from 'react-router';
import { Path } from '@/shared/lib/constants/path';
import { MainPage } from '@/pages/main-page/main-page';
import { PlaylistsPage } from '@/pages/playlists-page/playlists-page';
import { TracksPage } from '@/pages/tracks-page/tracks-page';
import { ProfilePage } from '@/pages/profile-page/profile-page';
import { PageNotFound } from '@/pages/page-not-found/page-not-found';
import { App } from '@/app/app';

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
    ],
  },
]);
