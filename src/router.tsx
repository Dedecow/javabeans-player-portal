import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

// Lazy loaded pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const GamePage = lazy(() => import('@/pages/GamePage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PlayerPortalPage = lazy(() => import('@/pages/PlayerPortalPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

// Layout wrapper
import Layout from '@/App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner fullPage message="Carregando Dashboard..." />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'game',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage message="Carregando Jogo..." />}>
            <GamePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage message="Carregando Métricas..." />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'portal',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage message="Carregando Portal..." />}>
            <PlayerPortalPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage message="Carregando Configurações..." />}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const Router: React.FC = () => <RouterProvider router={router} />;

export default Router;
