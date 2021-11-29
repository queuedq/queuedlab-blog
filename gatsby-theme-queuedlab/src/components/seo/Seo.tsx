import React from "react";
import { Helmet } from "react-helmet";
import { Post } from "../../models/post";

import GeneralTags from "./General";
import OpenGraphTags from "./OpenGraph";
import { getSeoData } from "./utils";

type SeoProps = {
  subpage?: string;
  post?: Post;
};

const SEO = ({ subpage, post }: SeoProps): JSX.Element => {
  const seoData = getSeoData({ subpage, post });

  const tagList = [
    ...GeneralTags(seoData),
    ...OpenGraphTags(seoData),
  ];

  return (
    <Helmet htmlAttributes={{ lang: 'ko' }}> {/* TODO: support i18n? */}
      {tagList}
    </Helmet>
  );
};

export default SEO;
