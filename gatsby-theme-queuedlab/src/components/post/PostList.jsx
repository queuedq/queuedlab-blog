import React from "react";
import _ from "lodash";
import { Link, graphql } from "gatsby";
import * as style from "./PostList.module.scss";

const PostList = ({ posts }) => (
  <ul className={style.postList}>
    {posts.map(post => (
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
    ))}
  </ul>
);

export default PostList;
