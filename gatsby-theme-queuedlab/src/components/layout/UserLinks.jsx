import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import config from "../../../data/site-config";
import * as style from "./UserLinks.module.scss";

const services = {
  github: { icon: faGithub, label: "GitHub" },
  twitter: { icon: faTwitter, label: "Twitter" },
  email: { icon: faEnvelope, label: "Email" },
};

const UserLink = ({serviceName, link}) => {
  const service = services[serviceName];
  return (
    <a href={link} className={style.userLink}>
      <FontAwesomeIcon icon={service.icon} className={style.icon} width={16} />
      {service.label}
    </a>
  );
}

const UserLinks = () => {
  if (!config.userLinks) return null;
  return (
    <div>
      {Object.entries(config.userLinks).map(([key, link]) => (
        <UserLink key={key} serviceName={key} link={link} />
      ))}
    </div>
  );
}

export default UserLinks;
