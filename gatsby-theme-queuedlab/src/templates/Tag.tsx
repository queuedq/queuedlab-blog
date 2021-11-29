import React from "react";
import { graphql } from "gatsby";
import { fromRemarkPosts } from "../models/post";
import Layout from "../components/layout/Layout";
import PostList from "../components/post/PostList";
import Seo from "../components/seo/Seo";

const CategoryPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = fromRemarkPosts(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <h1>태그: {tag}</h1> {/* TODO: style this */}
      <Seo subpage={`태그: ${tag}`}/>
      <PostList posts={posts} />
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
