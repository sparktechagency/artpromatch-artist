import Footer from '@/components/Shared/Footer';
import NavBar from '@/components/Shared/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
