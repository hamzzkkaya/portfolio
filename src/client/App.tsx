import { AnimatePresence } from "framer-motion";
import { RouterProvider, useRouter } from "./router";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";

function Content() {
  const { path } = useRouter();

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
      return <BlogDetail key={`blog-${slug}`} slug={slug} />;
    }

    return <Home key="home" />; // Fallback 404
  };

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
