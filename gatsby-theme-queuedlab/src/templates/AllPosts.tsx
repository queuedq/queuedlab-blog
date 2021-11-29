import React from "react";
import { graphql } from "gatsby";
import { fromRemarkPosts } from "../models/post";
import Layout from "../components/layout/Layout";
import PostList from "../components/post/PostList";
import Pagination from "../components/post/Pagination";
import Seo from "../components/seo/Seo";

const AllPosts = ({ data, pageContext }) => {
  const { pageCount, currentPageNum } = pageContext;
  const posts = fromRemarkPosts(data.allRemarkBlogPost.edges);

  return (
    <Layout>
      <Seo />
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
