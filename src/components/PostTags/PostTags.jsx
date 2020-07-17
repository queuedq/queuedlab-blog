import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";
import style from "./PostTags.module.scss";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              to={`/tags/${_.kebabCase(tag)}`}
              className={style.tag}
            >
              {`#${tag}`}
            </Link>
          ))}
      </div>
    );
  }
}

export default PostTags;
