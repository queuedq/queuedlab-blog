import { graphql } from "gatsby";

// eslint-disable-next-line import/prefer-default-export
export const postMetadata = graphql`
fragment PostMetadata on RemarkBlogPost {
  title
  body
  slug
  date
  category
  tags
  summary
  excerpt
}
`;
