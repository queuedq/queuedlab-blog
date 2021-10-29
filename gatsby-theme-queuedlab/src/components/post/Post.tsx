import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { Post } from "../../models/post";
import { formatDate } from "../../utils/date";
import PostTags from "./PostTags";
import * as style from "./Post.module.scss";
import "./b16-tomorrow-dark.scss";
import "katex/dist/katex.min.css";

type PostComponentProps = {
  post: Post
};

const PostComponent = ({
  post: { title, category, summary, datePublished, body, tags },
}: PostComponentProps) => (
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
        {formatDate(datePublished)}
      </time>
    </div>
    <div
      className={style.content}
      dangerouslySetInnerHTML={{ __html: body }}
    />
    <PostTags tags={tags} />
  </div>
);

export default PostComponent;
