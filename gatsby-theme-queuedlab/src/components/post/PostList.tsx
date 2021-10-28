import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { Post } from "../../models/post";
import { formatDate } from "../../utils/date";
import * as style from "./PostList.module.scss";

const PostList: React.FunctionComponent<{ posts: Post[] }> = ({ posts }) => (
  <ul className={style.postList}>
    {posts.map(({ title, summary, datePublished, category, url }) => (
      <li className={style.postCard} key={title}>
        <h3 className={style.postTitle}>
          <Link to={url}>{title}</Link>
        </h3>
        {category
          ? (
            <Link className={style.postCategory} to={`/categories/${_.kebabCase(category)}`}>
              {category}
            </Link>
          ) : null}
        <time className={style.postDate}>{formatDate(datePublished)}</time>
        {summary
          ? <div className={style.postSummary}>{summary}</div>
          : null}
      </li>
    ))}
  </ul>
);

export default PostList;
