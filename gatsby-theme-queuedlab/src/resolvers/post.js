import moment from "../utils/moment";

// eslint-disable-next-line import/prefer-default-export
export function getRemarkBlogPost(data) {
  const { title, body, slug, date, category, tags, summary, excerpt } = data;
  return {
    title,
    body,
    slug,
    date: moment(date),
    category,
    tags,
    summary,
    excerpt
  };
}
