interface CommonSeoData {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface WebsiteData extends CommonSeoData {
  type: "website";
  isMainPage: boolean; // if false, title prop represents subpage's title
}

export interface PostData extends CommonSeoData {
  type: "article"; // follows OpenGraph type name
  datePublished: Date;
  dateModified: Date;
  category: string;
  tags: string[];
}

export type SeoData = WebsiteData | PostData;
