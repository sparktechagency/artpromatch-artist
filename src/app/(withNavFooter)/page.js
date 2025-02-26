'use client';

import AfterLogin from '@/components/WithNavFooterComponents/HomeComponents/AfterLogin/AfterLogin';
import BeforeLogin from '@/components/WithNavFooterComponents/HomeComponents/BeforeLogin/BeforeLogin';
import React, { useEffect } from 'react';
import DashboardPage from './dashboard/page';

const Homepage = () => {
    const user = localStorage.getItem("user");

    return (
        <div>

            {
                // user ? <AfterLogin /> : <BeforeLogin />
                user ? <DashboardPage /> : <BeforeLogin />
            }

        </div>
    );
};

export default Homepage;