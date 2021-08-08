import React from "react";
import { Link } from "gatsby";
import config from "../../../data/site-config";
import * as style from "./Header.module.scss";

export default class Header extends React.Component {
  render() {
    return (
      <header className={style.header}>
        <Link to="/" className={style.blogTitle}>{config.siteTitle}</Link>
      </header>
    );
  }
}
