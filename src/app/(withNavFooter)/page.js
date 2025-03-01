"use client";

import BeforeLogin from "@/components/WithNavFooterComponents/HomeComponents/BeforeLogin/BeforeLogin";
import React, { useEffect, useState } from "react";
import DashboardPage from "./dashboard/page";

const Homepage = () => {
 const [isLogin, setIsLogin] = useState(false);
 
   useEffect(() => {
     const storedLoginState = localStorage.getItem("isLogin");
     if (storedLoginState) {
       setIsLogin(storedLoginState === "true");
     }
   }, []);

  return (
    <div>
      {
        // user ? <AfterLogin /> : <BeforeLogin />
        isLogin ? <DashboardPage /> : <BeforeLogin />
      }
    </div>
  );
};

export default Homepage;
