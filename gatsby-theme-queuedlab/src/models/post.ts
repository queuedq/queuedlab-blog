export type Post = {
  title: string;
  body: string;     // body HTML
  summary: string;  // user provided summary
  excerpt: string;  // auto-generated excerpt

  datePublished: Date;
  dateModified: Date;

  category: string;
  tags: string[];

  slug: string;
  url: string;  // relative to path prefix
}

export const postDescription = (post: Post) => post.summary || post.excerpt;

export function fromRemarkPost(node): Post {
  const { title, body, slug, date, url, category, tags, summary, excerpt } = node;
  return {
    title,
    body,
    summary,
    excerpt,
    datePublished: new Date(date),
    dateModified: new Date(date),  // TODO: add modified date
    category,
    tags,
    slug,
    url,
  };
}

export function fromRemarkPosts(edges): Post[] {
  return edges.map(({ node }) => fromRemarkPost(node));
}
