import Footer from '@/components/Shared/Footer/Footer';
import NavBar from '@/components/Shared/Navbar/Navbar';

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
