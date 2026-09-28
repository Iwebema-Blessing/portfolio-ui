import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { ScrollToTop } from './ScrollToTop';

/** Shell for every public page: nav, content, footer, floating WhatsApp. */
export const PublicLayout = () => (
  <div id="top" className="flex min-h-screen flex-col">
    <ScrollToTop />
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:border focus:bg-paper focus:px-4 focus:py-2"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);
