import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import * as style from "./PostList.module.scss";

const PostList = ({ posts }) => (
  <ul className={style.postList}>
    {posts.map(({ slug, title, category, date, summary }) => (
      <li className={style.postCard} key={title}>
        <h3 className={style.postTitle}>
          {/* TODO: use permalink instead of slug */}
          <Link to={slug}>{title}</Link>
        </h3>
        {category
          ? (
            <Link className={style.postCategory} to={`/categories/${_.kebabCase(category)}`}>
              {category}
            </Link>
          ) : null}
        <time className={style.postDate}>{date}</time>
        {summary
          ? <div className={style.postSummary}>{summary}</div>
          : null}
      </li>
    ))}
  </ul>
);

export default PostList;
