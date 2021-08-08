import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/site-config";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
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
