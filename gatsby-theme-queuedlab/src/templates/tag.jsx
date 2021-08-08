import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostList from "../components/post/PostList";
import config from "../../data/site-config";
import { getPosts } from "../resolvers/posts";

const CategoryPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const posts = getPosts(data);

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
  allMarkdownRemark(
    limit: 1000
    sort: { fields: [frontmatter___date], order: DESC }
    filter: { frontmatter: { tags: { in: [$tag] } } }
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
