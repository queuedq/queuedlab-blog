import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";
import { getPosts } from "../resolvers/posts";

const CategoryPosts = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = getPosts(data);

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
  allMarkdownRemark(
    limit: 1000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { category: { eq: $category } } }
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
