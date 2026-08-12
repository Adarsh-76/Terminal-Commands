import { Routes, Route, useLocation } from 'react-router';
import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/layout/ScrollToTopButton';

// Lazy load the pages
const Home = lazy(() => import('./pages/Home'));
const CommandEnvironmentPage = lazy(() => import('./pages/CommandEnvironmentPage'));
const CommandDetailPage = lazy(() => import('./pages/CommandDetailPage'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-2 border-accent-termux border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col pt-16 pb-24 lg:pb-0">
      <Navbar />
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/:environment" element={<CommandEnvironmentPage />} />
                <Route path="/:environment/:commandId" element={<CommandDetailPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      
      <Footer />
      <ScrollToTopButton />
      <BottomNav />
    </div>
  );
}
