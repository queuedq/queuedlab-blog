import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { fromRemarkPosts } from "../models/post";
import Layout from "../components/layout/Layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";

const CategoryPosts = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = fromRemarkPosts(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <div className="category-container">
        <Helmet title={`Posts in category "${category}" | ${config.siteTitle}`} />
        <PostList posts={posts} />
      </div>
    </Layout>
  );
}

export default CategoryPosts;

export const query = graphql`
query categoryPosts($category: String) {
  allRemarkBlogPost(
    limit: 1000
    sort: { fields: [date], order: DESC }
    filter: { category: { eq: $category } }
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
