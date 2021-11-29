import { Post, postDescription } from "../../models/post";
import { PostData, SeoData, WebsiteData } from "./types";
import config from "../../../data/site-config"; // TODO: don't depend on config

// generate data
type WebsiteDataProps = {
  subpage?: string; // subpage title
}

export const getWebsiteData = ({ subpage }: WebsiteDataProps): WebsiteData => {
  return {
    type: "website",
    title: subpage ? subpage : config.siteTitle,
    isMainPage: subpage == null,
    description: config.siteDescription,
    url: config.siteUrl,
    imageUrl: config.siteLogo,
  };
};

export const getPostData = (post: Post): PostData => {
  const { title, url, datePublished, dateModified, category, tags } = post; // TODO: add image

  return {
    type: "article",
    title,
    description: postDescription(post),
    url,
    datePublished,
    dateModified,
    category,
    tags,
  };
}

type SeoDataProps = {
  subpage?: string;
  post?: Post;
}

export const getSeoData = ({ subpage, post }: SeoDataProps): SeoData => {
  if (post) return getPostData(post);
  return getWebsiteData({ subpage });
}

// utils
export const getTitle = (seoData: SeoData): string => {
  const { type, title } = seoData;
  if (type == 'website' && seoData.isMainPage) return title;
  return `${title} | ${config.siteTitle}`
}
