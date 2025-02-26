'use client'
import Link from 'next/link';
import React, { useState } from 'react';

const UserDashboardLayout = ({ children }) => {
    const [activeTab, setActiveTab] = useState("Password-Management")
    return (
        <div className='container mx-auto md:after: mt-20'>

            <div className="my-5 w-full flex flex-col md:flex-row">
                <div className=" md:w-[30%]">
                    <h1 className="text-xl font-bold mb-2">Profile Information</h1>
                    <Link href="/user-profile-page/change-password-page">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Password Management</p>
                    </Link>
                    <Link href="">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Preferencest</p>
                    </Link>
                    <Link href="">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Notifications</p>
                    </Link>
                    <Link href="/user-profile-page/payment-history">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Payment History</p>
                    </Link>
                    <Link href="">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Privacy & Security</p>
                    </Link>
                    <Link href="">
                        <p className="mb-3 text-textSecondary text-xl font-semibold">Linked Accountst</p>
                    </Link>
                    <Link href="">
                        <p className="mb-3 text-red-500 text-xl">Delete Account</p>
                    </Link>
                </div>
                <div className="md:w-[70%]">
                    {children}
                </div>
            </div>
        </div>


    );
};

export default UserDashboardLayout;