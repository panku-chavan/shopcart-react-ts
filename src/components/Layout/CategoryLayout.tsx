import React from "react";
import Hero from "../Hero";
import Testimonial from "../Testimonial";

interface CategoryLayoutProps {
  children: React.ReactNode;
}
const CategoryLayout: React.FC<CategoryLayoutProps> = ({ children }) => {
  return (
    <>
      <Hero/>
      {children}
      <Testimonial/>
    </>
  );
};

export default CategoryLayout;
