import React, { Component } from "react";
import { withPrefix } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import config from "../../../data/SiteConfig";
import UserLinks from "../UserLinks/UserLinks";
import style from "./Footer.module.scss";

class Footer extends Component {
  render() {
    const { copyright } = config;
    if (!copyright) {
      return null;
    }
    return (
      <footer className={style.footer}>
        <UserLinks />
        <div>
          <a href={withPrefix(config.siteRss)} className={style.footerLink}>
            <FontAwesomeIcon icon={faRss} className={style.icon} width={16} />
            RSS
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
