import React from "react";
import { graphql } from "gatsby";
import { fromRemarkPosts } from "../models/post";
import Layout from "../components/layout/Layout";
import PostList from "../components/post/PostList";
import Seo from "../components/seo/Seo";

const CategoryPosts = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = fromRemarkPosts(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <h1>카테고리: {category}</h1> {/* TODO: style this */}
      <Seo subpage={`카테고리: ${category}`}/>
      <PostList posts={posts} />
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
