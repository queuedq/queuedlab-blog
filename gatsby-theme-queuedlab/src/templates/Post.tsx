import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout/Layout";
import Post from "../components/post/Post";
import Seo from "../components/seo/Seo";
import { fromRemarkPost } from "../models/post";

const PostTemplate = ({ data }) => {
  const post = fromRemarkPost(data.remarkBlogPost);

  return (
    <Layout>
      <Seo post={post} />
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
