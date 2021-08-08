import moment from "../utils/moment";
import config from "../../data/site-config";

// eslint-disable-next-line import/prefer-default-export
export function getPost(data) {
  const post = data.markdownRemark;
  const { frontmatter } = post;
  const { title, category, summary, date, tags } = frontmatter;
  return {
    title,
    category,
    summary,
    date: moment(date).format(config.dateFormat),
    bodyHtml: post.html,
    tags,
  };
}
