import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostList from "../components/post/PostList";
import Pagination from "../components/post/Pagination";
import SEO from "../components/layout/SEO";
import config from "../../data/site-config";
import { getRemarkBlogPostList } from "../resolvers/post";

const AllPosts = ({ data, pageContext }) => {
  const { pageCount, currentPageNum } = pageContext;
  const posts = getRemarkBlogPostList(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <PostList posts={posts} />
      <Pagination count={pageCount} current={currentPageNum} linkPrefix="" />
    </Layout>
  );
}

export default AllPosts;

export const query = graphql`
query allPosts($skip: Int!, $limit: Int!) {
  allRemarkBlogPost(
    sort: { fields: [date], order: DESC }
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {  
        ...PostMetadata
      }
    }
  }
}
`;
