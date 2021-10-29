import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../../sass/main.scss";
import * as style from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <div className={style.wrapper}>
    <Header />
    <div className={style.container}>
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout
