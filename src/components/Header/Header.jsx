import React from "react";
import config from "../../../data/SiteConfig";
import style from "./Header.module.scss";

export default class Header extends React.Component {
  render() {
    return (
      <header className={style.header}>
        <div className={style.blogTitle}>{config.siteTitle}</div>
      </header>
    );
  }
}
