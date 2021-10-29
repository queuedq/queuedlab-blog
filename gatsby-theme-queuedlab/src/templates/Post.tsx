import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import config from "../../data/site-config";
import Layout from "../components/layout/Layout";
import Post from "../components/post/Post";
import { fromRemarkPost } from "../models/post";

const PostTemplate = ({ data }) => {
  const post = fromRemarkPost(data.remarkBlogPost);

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
      </Helmet>
      {/* TODO: fix SEO */}
      {/* <SEO postPath={slug} postNode={data.markdownRemark} postSEO /> */}
      <Post post={post} />
    </Layout>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    remarkBlogPost(slug: { eq: $slug }) {
      ...PostMetadata
    }
  }
`;
