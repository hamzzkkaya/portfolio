export type PageType = 'home' | 'about' | 'projects' | 'blog';

export interface RouteProps {
    setPage: (page: PageType) => void;
}
