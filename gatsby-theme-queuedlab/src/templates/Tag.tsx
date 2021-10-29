import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { fromRemarkPosts } from "../models/post";
import Layout from "../components/layout/Layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";

const CategoryPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = fromRemarkPosts(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <div className="tag-container">
        <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export default CategoryPosts;

export const query = graphql`
query TagPosts($tag: String) {
  allRemarkBlogPost(
    limit: 1000
    sort: { fields: [date], order: DESC }
    filter: { tags: { in: [$tag] } }
  ) {
    totalCount
    edges {
      node {
        ...PostMetadata
      }
    }
  }
}
`;
