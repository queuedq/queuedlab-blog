import config from "../../data/site-config";
import moment from "../utils/moment";

// eslint-disable-next-line import/prefer-default-export
export function getRemarkBlogPost(node) {
  const { title, body, slug, date, category, tags, summary, excerpt } = node;
  return {
    title,
    body,
    slug,
    date: moment(date).format(config.dateFormat),
    rawDate: moment(date),
    category,
    tags,
    summary,
    excerpt
  };
}

export function getRemarkBlogPostList(edges) {
  return edges.map(({ node }) => getRemarkBlogPost(node));
}
