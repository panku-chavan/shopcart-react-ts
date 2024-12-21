import React from "react";
import { useLocation } from "react-router-dom";
import HeaderTop from "../HeaderTop";
import HeaderMain from "../HeaderMain";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Hide layout components on /register and /login routes
  const hideLayout = location.pathname === "/register" || location.pathname === "/login";

  return (
    <>
      {!hideLayout && <HeaderTop />}
      {!hideLayout && <HeaderMain />}
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
