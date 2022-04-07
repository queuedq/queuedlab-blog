/* eslint "no-console": "off" */

const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const moment = require('moment-timezone');
const { parentResolverPassthrough } = require('./gatsby/utils');
const siteConfig = require("./data/site-config");

moment.tz.setDefault(siteConfig.siteTimezone);

// Make sure the content directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "content"
  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`)
    fs.mkdirSync(contentPath)
  }
}

// Post frontmatter schema
exports.createSchemaCustomization = ({ actions, schema }) => {
  // TODO: Don't extend MarkdownRemark
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      slug: String!
      date: Date!
      category: String
      tags: [String!]
      cover: String
      summary: String
    }
  `
  createTypes(typeDefs)
  
  // Custom types
  const types = fs.readFileSync(require.resolve("./gatsby/schema.graphql"), "utf-8");
  createTypes(types);

  // Arguments for passthrough resolvers can be found at
  // https://github.com/gatsbyjs/gatsby/blob/c87d1d116e33eb693f65bcfc57cc63b072fe4a5c/packages/gatsby-transformer-remark/src/extend-node-type.js#L555
  const RemarkBlogPost = schema.buildObjectType({
    name: "RemarkBlogPost",
    fields: {
      id: { type: "ID!" },
      title: { type: "String!" },
      body: {
        type: "String!",
        resolve: parentResolverPassthrough("html"),
      },
      slug: { type: "String!" },
      date: { type: "Date!", extensions: { dateformat: {} } },
      url: { type: "String!" },
      category: { type: "String" },
      tags: { type: "[String!]" },
      cover: { type: "File", extensions: { fileByRelativePath: {} } },
      coverAlt: { type: "String" },
      summary: { type: "String" },
      excerpt: {
        type: "String!",
        args: {
          pruneLength: { type: "Int", defaultValue: 140 },
          truncate: { type: "Boolean", defaultValue: false },
          format: { type: "MarkdownExcerptFormats", defaultValue: "PLAIN" },
        },
        resolve: parentResolverPassthrough("excerpt"),
      },
    },
    interfaces: ["Node", "BlogPost"],
    extensions: { infer: false },
  });

  createTypes(RemarkBlogPost);
}

exports.onCreateNode = async ({ node, actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const { slug } = node.frontmatter;
    const date = moment(node.frontmatter.date).format('YYYY-MM-DD');
    const url = `/${date}/${slug}`;

    // Create nodes for custom types
    const remarkBlogPostId = createNodeId(`${node.id} >>> RemarkBlogPost`);
    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      date: node.frontmatter.date,
      category: node.frontmatter.category,
      tags: node.frontmatter.tags,
      cover: node.frontmatter.cover,
      coverAlt: node.frontmatter.coverAlt,
      summary: node.frontmatter.summary,
      url,
    };
  
    await createNode({
      ...fieldData,
      id: remarkBlogPostId,
      parent: node.id,
      internal: {
        type: 'RemarkBlogPost',
        contentDigest: createContentDigest(fieldData),
      }
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = require.resolve("./src/templates/Post.tsx");
  const tagPage = require.resolve("./src/templates/Tag.tsx");
  const categoryPage = require.resolve("./src/templates/Category.tsx");
  const allPostsPage = require.resolve("./src/templates/AllPosts.tsx");

  // Get a full list of posts
  const blogPostsQueryResult = await graphql(`
    {
      allBlogPost {
        edges {
          node {
            url
            title
            tags
            category
            date
          }
        }
      }
    }
  `);

  if (blogPostsQueryResult.errors) {
    console.error(blogPostsQueryResult.errors);
    throw blogPostsQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = blogPostsQueryResult.data.allBlogPost.edges;

  // Pagination
  const { postsPerPage } = siteConfig;
  const pageCount = Math.ceil(postsEdges.length / postsPerPage);

  createPage({
    path: "/",
    component: allPostsPage,
    context: {
      limit: postsPerPage,
      skip: 0,
      pageCount,
      currentPageNum: 1,
    },
  });

  [...Array(pageCount)].forEach((_val, pageNum) => {
    createPage({
      path: `/${pageNum + 1}/`,
      component: allPostsPage,
      context: {
        limit: postsPerPage,
        skip: pageNum * postsPerPage,
        pageCount,
        currentPageNum: pageNum + 1,
      },
    });
  });

  // Create post pages
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.tags) {
      edge.node.tags.forEach(tag => tagSet.add(tag));
    }

    // Generate a list of categories
    if (edge.node.category) {
      categorySet.add(edge.node.category);
    }

    // Create post pages
    createPage({
      path: edge.node.url,
      component: postPage,
      context: {
        url: edge.node.url,
      },
    });
  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};
