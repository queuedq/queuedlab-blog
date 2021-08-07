import moment from "../utils/moment";
import config from "../../data/site-config";

// eslint-disable-next-line import/prefer-default-export
export function getPosts(data) {
  return data.allMarkdownRemark.edges.map(edge => ({
    path: edge.node.fields.slug,
    category: edge.node.frontmatter.category,
    tags: edge.node.frontmatter.tags,
    cover: edge.node.frontmatter.cover,
    title: edge.node.frontmatter.title,
    summary: edge.node.frontmatter.summary,
    date: moment(edge.node.frontmatter.date).format(config.dateFormat),
    excerpt: edge.node.excerpt,
    timeToRead: edge.node.timeToRead
  }));
}
