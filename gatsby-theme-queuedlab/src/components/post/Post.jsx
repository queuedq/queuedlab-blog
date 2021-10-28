import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import PostTags from "./PostTags";
import * as style from "./post.module.scss";
import "./b16-tomorrow-dark.scss";
import "katex/dist/katex.min.css";

const Post = ({ post: { title, category, summary, date, body, tags } }) => (
  <div className={style.postContainer}>
    <div className={style.header}>
      <h1>{title}</h1>
      {category && (
        <Link className={style.category} to={`/categories/${_.kebabCase(category)}`}>
          {category}
        </Link>
      )}
      {summary && <div className={style.summary}>{summary}</div>}
      <time className={style.date}>
        {date}
      </time>
    </div>
    <div
      className={style.content}
      dangerouslySetInnerHTML={{ __html: body }}
    />
    <PostTags tags={tags} />
  </div>
);

export default Post;
