import { AnimatePresence } from "framer-motion";
import { RouterProvider, useRouter } from "./router";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";

import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import { useEffect, useState } from "react";

function Content() {
  const { path } = useRouter();
  // Initialize from navigator.onLine to support immediate offline check
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderPage = () => {
    if (path === '/') return <Home key="home" />;
    if (path === '/about') return <About key="about" />;
    if (path === '/projects') return <Projects key="projects" />;
    if (path === '/blog') return <Blog key="blog" />;

    // Dynamic Routes
    if (path.startsWith('/projects/')) {
      const slug = path.split('/projects/')[1];
      return <ProjectDetail key={`project-${slug}`} slug={slug} />;
    }
    if (path.startsWith('/blog/')) {
      const slug = path.split('/blog/')[1];
      console.log('Rendering blog detail for slug:', slug);
      return <BlogDetail key={`blog-${slug}`} slug={slug} />;
    }

    return <NotFound key="404" />; // Fallback 404
  };

  // If completely offline (and not just loading), show the Offline page
  // We check this at the top level Layout so the Navbar might still be visible or not?
  // User requested "design completely same as main site", so maybe inside Layout?
  // But usually offline page is a blocker. Let's return it directly or wrap it.
  // Given the design in Offline.tsx seems full screen, let's return it directly.
  if (!isOnline) {
    return <Offline />;
  }

  return (
    <Layout>
      <Navbar />
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <RouterProvider>
      <Content />
    </RouterProvider>
  );
}

export default App;
