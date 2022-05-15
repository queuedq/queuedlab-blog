const url = require("url");
const config = require("./data/site-config");

// Make sure that pathPrefix is not empty
const validatedPathPrefix = config.pathPrefix === "" ? "/" : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,
  siteMetadata: {
    siteUrl: config.getFullPath("/"),
    rssMetadata: {
      site_url: config.getFullPath("/"),
      feed_url: config.getFullPath(config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: config.getFullPath(config.siteLogo),
      copyright: config.copyright
    }
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-lodash",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "static"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "content"
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-table-of-contents",
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800
            }
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              related: false,
              noIframeBorder: true,
              containerClass: 'embedVideo-container',
            }
          },
          {
            resolve: "gatsby-remark-responsive-iframe"
          },
          "gatsby-remark-copy-linked-files",
          // "gatsby-remark-autolink-headers",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [config.googleAnalyticsID]
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: config.themeColor
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: validatedPathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icon: "static/logos/logo.png",
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
                image_url
                copyright
              }
            }
          }
        }`,
        feeds: [
          {
            serialize({ query: { site, allBlogPost } }) {
              return allBlogPost.edges.map(edge => ({
                categories: [edge.node.category],
                title: edge.node.title,
                date: edge.node.date,
                description: edge.node.summary || edge.node.excerpt,
                url: new url.URL(edge.node.url, site.siteMetadata.rssMetadata.site_url).href,
                guid: new url.URL(edge.node.url, site.siteMetadata.rssMetadata.site_url).href,
                custom_elements: [
                  { "content:encoded": edge.node.body },
                  { author: config.userEmail }
                ],
              }));
            },
            query: `
            {
              allBlogPost(
                limit: 1000,
                sort: { order: DESC, fields: [date] },
              ) {
                edges {
                  node {
                    title
                    body
                    date
                    url
                    summary
                    excerpt
                    category
                  }
                }
              }
            }`,
            output: config.siteRss,
            title: config.siteRssTitle
          }
        ]
      }
    },
    "gatsby-plugin-cname",
  ].filter(plugin => plugin != null)
};
