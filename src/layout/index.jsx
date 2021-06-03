import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../sass/main.scss";
import * as style from "./index.module.scss";

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={style.wrapper}>
        <Header />
        <div className={style.container}>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
            <html lang="en" />
          </Helmet>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}
