import * as React from "react";
import { SeoData } from "./types";
import { getTitle } from "./utils";
import config from "../../../data/site-config";

const GeneralTags = (seoData: SeoData): JSX.Element[] => {
  const { title, description, imageUrl } = seoData;

  const tags = [
    <title key="gen-title">{getTitle(seoData)}</title>,
    <link rel="shortcut icon" href={config.siteLogo} key="gen-fav" />,
    <meta name="description" content={description} key="gen-desc" />,
  ];

  if (imageUrl)
    tags.push(<meta name="image" content={imageUrl} key="gen-image" />);

  return tags;
};

export default GeneralTags;
