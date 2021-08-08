import { graphql } from "gatsby";

// eslint-disable-next-line import/prefer-default-export
export const query = graphql`
fragment PostMetadata on MarkdownRemark {
  excerpt
  timeToRead
  frontmatter {
    title
    date
    category
    tags
    cover
    summary
  }
  fields {
    slug
  }
}
`;
