"use client";

import { fetchUsers } from "@/app/(auth)/actions/fetchUsers";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = ["sign-in", "sign-up"].includes(pathname.split("/")[1]);


  const getNavBar = () => {
    if (isPublicRoute) return null;
    return <NavBar />;
  };

  const getFooter = () => {
    if (isPublicRoute) return null;
    return <Footer />;
  };

  const getContent = () => {
    if (isPublicRoute) return null;
    return <>{children}</>;
  };

  const getCurrentUser = async () => {
    try {
      const response: any = await fetchUsers();
      if (response.error) throw new Error(response.error.message);
    } catch (error) {
      console.log( error);
    } finally {
        return
    }
  };

  useEffect(() => {
    if (!isPublicRoute) {
      getCurrentUser();
    }
  }, []);

  return (
    <div className=" min-h-screen bg-primary">
      {getNavBar()}
      {getContent()}
      {getFooter()}
    </div>
  );
}

export default LayoutProvider;
