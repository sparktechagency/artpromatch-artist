"use client";

import ArtistHomePage from "@/components/WithNavFooterComponents/HomeComponents/AfterLogin/ArtistHomePage";
import BeforeLogin from "@/components/WithNavFooterComponents/HomeComponents/BeforeLogin/BeforeLogin";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const storedLoginState = localStorage.getItem("isLogin");
    if (storedLoginState) {
      setIsLogin(storedLoginState === "true");
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      {isLogin ? (
       <ArtistHomePage/>
      ) : (
        <BeforeLogin/>
      )}
    </div>
  );
};

export default DashboardPage;
