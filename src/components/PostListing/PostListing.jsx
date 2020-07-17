import React from "react";
import _ from "lodash";
import { Link, graphql } from "gatsby";
import config from "../../../data/SiteConfig";
import moment from "../../utils/moment";
import style from "./PostListing.module.scss";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        category: postEdge.node.frontmatter.category,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        summary: postEdge.node.frontmatter.summary,
        date: moment(postEdge.node.fields.date).format(config.dateFormat),
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }

  render() {
    const postList = this.getPostList();
    return (
      <ul className={style.postList}>
        {/* Your post list here. */
        postList.map(post => (
          <li className={style.postCard} key={post.title}>
            <h3 className={style.postTitle}>
              <Link to={post.path}>{post.title}</Link>
            </h3>
            {post.category
            ? (
              <Link className={style.postCategory} to={`/categories/${_.kebabCase(post.category)}`}>
                {post.category}
              </Link>
            ) : null}
            <time className={style.postDate}>{post.date}</time>
            {post.summary
            ? <div className={style.postSummary}>{post.summary}</div>
            : null}
          </li>
        ))
        }
      </ul>
    );
  }
}

export default PostListing;

export const query = graphql`
  fragment PostMetadata on MarkdownRemark {
    excerpt
    timeToRead
    frontmatter {
      title
      category
      tags
      cover
      summary
    }
    fields {
      slug
      date
    }
  }
`
