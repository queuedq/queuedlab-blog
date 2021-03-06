import React, { Component } from "react";
import { Helmet } from "react-helmet";
import config from "../../../data/site-config";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let image;
    let postURL;

    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.summary ? postMeta.summary : postNode.excerpt;
      image = postMeta.cover ? postMeta.cover : config.siteLogo;
      postURL = config.getFullPath(postPath);
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
      image = config.siteLogo;
    }

    const getImagePath = (imageURI) => {
      if (!imageURI.match(
        `(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]`
      )) {
        return config.getFullPath(imageURI);
      }
      return imageURI;
    };

    image = getImagePath(image);

    const authorJSONLD = {
      "@type": "Person",
      name: config.userName,
      email: config.userEmail,
      address: config.userLocation,
    };

    const blogURL = config.getFullPath("/");
    const schemaOrgJSONLD = [];

    // TODO: separate this logic
    if (postSEO) {
      const getPublicationDate = () => {
        if (!postNode) return null;
        if (!postNode.frontmatter) return null;
        if (!postNode.frontmatter.date) return null;

        return postNode.frontmatter.date;
      };
      
      const datePublished = getPublicationDate();

      schemaOrgJSONLD.push(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: title,
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": postURL
          },
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image
          },
          author: authorJSONLD,
          datePublished,
          dateModified: datePublished, // TODO: add modified date
        }
      );
    }

    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={config.siteFBAppID ? config.siteFBAppID : ""}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ""}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
