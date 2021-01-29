const config = {
  // Site Info

  siteTitle: "queuedlab", // Site title.
  siteTitleShort: "queuedlab", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  // siteTitleAlt: "queuedlab", // Alternative site title for SEO.
  siteDescription: "queued의 블로그", // Website description used for RSS feeds/meta description tag.
  siteLogo: "/icons/icon-512x512.png", // Logo used for SEO and manifest.
  siteUrl: "https://blog.queuedlab.com", // Domain of your website without pathPrefix.

  // Author Info

  userName: "queued", // Username to display in the author segment.
  userEmail: "queued37@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "https://twitter.com/queued_q", // User Twitter
  // userLocation: "Korea", // User location to display in the author segment.
  userLinks: { // Links to social media profiles/contacts of the blog owner
    github: "https://github.com/queuedq",
    twitter: "https://twitter.com/queued_q",
    email: "mailto:queued37@gmail.com",
  },

  // Display Settings

  postsPerPage: 8, // Amount of posts displayed per listing page.
  dateFormat: "YYYY. MM. DD.", // Date format for display.
  siteTimezone: "Asia/Seoul", // Timezone to display date
  copyright: "Copyright © 2021. queued", // Copyright string for the footer of the website and RSS feed.

  // Advanced Settings

  pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteRssTitle: "queuedlab RSS feed", // Title of the RSS feed
  // siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  // googleAnalyticsID: "UA-47311644-5", // GA tracking ID.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
