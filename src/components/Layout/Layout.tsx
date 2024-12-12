import React from "react";
import HeaderTop from "../HeaderTop";
import HeaderMain from "../HeaderMain";
import Footer from "../Footer";
import Navbar from "../Navbar";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HeaderTop />
      <HeaderMain />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
