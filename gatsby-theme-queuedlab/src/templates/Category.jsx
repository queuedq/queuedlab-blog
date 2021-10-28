import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";
import { getRemarkBlogPostList } from "../resolvers/post";

const CategoryPosts = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = getRemarkBlogPostList(data.allRemarkBlogPost.edges);

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
        title
        body
        slug
        date
        category
        tags
        summary
        excerpt
      }
    }
  }
}
`;
