import React from "react";

import { PostData, SeoData } from "./types";
import config from "../../../data/site-config";

// This function acts as a type guard to prevent undefined content from being added
const addTag = (
  tagList: JSX.Element[],
  property: string,
  content: string
) => {
  tagList.push(<meta property={property} content={content} />);
};

const createArticleTagList = (postData: PostData): JSX.Element[] => {
  const metaTags: JSX.Element[] = [];

  addTag(metaTags, "article:published_time", postData.datePublished.toISOString());
  addTag(metaTags, "article:modified_time", postData.dateModified.toISOString());
  addTag(metaTags, "article:author", config.userName);
  addTag(metaTags, "article:section", postData.category);
  postData.tags?.forEach((tag) => { addTag(metaTags, "article:tag", tag); });

  return metaTags;
};

const OpenGraphTags = (seoData: SeoData): JSX.Element[] => {
  const { type, title, description, imageUrl, imageAlt, url } = seoData;

  const metaTags: JSX.Element[] = [];
  
  addTag(metaTags, "og:type", type);
  addTag(metaTags, "og:title", title);
  addTag(metaTags, "og:description", description);
  if (imageUrl) addTag(metaTags, "og:image", imageUrl);
  if (imageAlt) addTag(metaTags, "og:image:alt", imageAlt);
  addTag(metaTags, "og:url", url);
  addTag(metaTags, "og:site_name", config.siteTitle);

  if (type == 'article')
    metaTags.push(...createArticleTagList(seoData));

  // Add unique keys and return
  return metaTags.map((tag) => ({
    ...tag,
    key: `${tag.props.property}-${tag.props.content}`,
  }));
};

export default OpenGraphTags;
