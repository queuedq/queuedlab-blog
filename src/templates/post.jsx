import React from "react";
import _ from "lodash";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import config from "../../data/SiteConfig";
import moment from "../utils/moment";
import Layout from "../layout";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import "./b16-tomorrow-dark.scss";
import * as style from "./post.module.scss";
import "katex/dist/katex.min.css";

export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className={style.postContainer}>
          <div className={style.titleContainer}>
            <h1>{post.title}</h1>
            {post.category && (
              <Link className={style.category} to={`/categories/${_.kebabCase(post.category)}`}>
                {post.category}
              </Link>
            )}
            {post.summary && <div className={style.summary}>{post.summary}</div>}
            <time className={style.date}>
              {moment(postNode.frontmatter.date).format(config.dateFormat)}
            </time>
          </div>
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
          <PostTags tags={post.tags} />
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        category
        tags
        summary
      }
      fields {
        slug
      }
    }
  }
`;
