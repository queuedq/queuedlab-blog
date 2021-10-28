import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";
import { getRemarkBlogPostList } from "../resolvers/post";

const CategoryPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = getRemarkBlogPostList(data.allRemarkBlogPost.edges);

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
