import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { Spinner } from '@/components/ui/Spinner';

// Pages load on demand, so the first paint only carries the home page.
const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Account = lazy(() => import('@/pages/Account'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminProjects = lazy(() => import('@/pages/admin/Projects'));
const AdminMessages = lazy(() => import('@/pages/admin/Messages'));
const AdminSiteText = lazy(() => import('@/pages/admin/SiteText'));
const AdminAccount = lazy(() => import('@/pages/admin/Account'));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Spinner />
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Account />} />
          {/* Old bookmark, just in case */}
          <Route path="admin/login" element={<Navigate to="/account" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dashboard, behind a sign in */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="site" element={<AdminSiteText />} />
          <Route path="account" element={<AdminAccount />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
