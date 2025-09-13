import Header from './Header';
import BottomNavigation from './BottomNavigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-nav">
        {children}
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Layout;