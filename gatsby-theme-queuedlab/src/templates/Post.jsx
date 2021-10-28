import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import config from "../../data/site-config";
import Layout from "../layout";
import Post from "../components/post/Post";
import { getRemarkBlogPost } from "../resolvers/post";

export default class PostTemplate extends React.Component {
  render() {
    const { data } = this.props;
    const post = getRemarkBlogPost(data.remarkBlogPost);

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        {/* TODO: fix SEO */}
        {/* <SEO postPath={slug} postNode={data.markdownRemark} postSEO /> */}
        <Post post={post} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    remarkBlogPost(slug: { eq: $slug }) {
      ...PostMetadata
    }
  }
`;
