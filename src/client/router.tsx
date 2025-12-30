import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// --- Types ---
type Route = string;
type RouterContextType = {
    path: Route;
    navigate: (to: string) => void;
};

// --- Context ---
const RouterContext = createContext<RouterContextType | undefined>(undefined);

// --- Hook ---
export const useRouter = () => {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error("useRouter must be used within a RouterProvider");
    }
    return context;
};

// --- Provider ---
export const RouterProvider = ({ children }: { children: ReactNode }) => {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = (to: string) => {
        window.history.pushState({}, '', to);
        setPath(to);
    };

    return (
        <RouterContext.Provider value={{ path, navigate }}>
            {children}
        </RouterContext.Provider>
    );
};

// --- Link Component ---
export const Link = ({ to, children, className }: { to: string; children: ReactNode; className?: string }) => {
    const { navigate, path } = useRouter();
    const isActive = path === to;

    return (
        <a
            href={to}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                navigate(to);
            }}
            data-active={isActive}
        >
            {children}
        </a>
    );
};
