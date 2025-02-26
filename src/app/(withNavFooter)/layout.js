
import Footer from '@/components/Shared/Footer/Footer';
import NavBar from '@/components/Shared/Navbar/Navbar';
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;