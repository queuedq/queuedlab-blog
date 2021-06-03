import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";
import * as style from "./PostTags.module.scss";

class PostTags extends Component {
  render() {
    const { tags } = this.props;
    if (!tags) return null;

    return (
      <div className={style.tagContainer}>
        {tags.map(tag => (
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
