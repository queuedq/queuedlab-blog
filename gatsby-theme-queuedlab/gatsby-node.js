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
      fields: Fields
    }
    type Frontmatter {
      title: String!
      date: Date!
      category: String
      tags: [String!]
      cover: String
      summary: String
    }
    type Fields {
      slug: String!
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

exports.onCreateNode = async ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNodeField, createNode } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    // TODO: Don't extend MarkdownRemark
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date);
        if (!date.isValid())
          console.warn(`WARNING: Invalid date.`, node.frontmatter);
      }
    }
    createNodeField({ node, name: "slug", value: slug });

    // Create nodes for custom types
    const remarkBlogPostId = createNodeId(`${node.id} >>> RemarkBlogPost`);
    const fieldData = {
      title: node.frontmatter.title,
      slug,
      date: node.frontmatter.date,
      category: node.frontmatter.category,
      tags: node.frontmatter.tags,
      cover: node.frontmatter.cover,
      coverAlt: node.frontmatter.coverAlt,
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
  const postPage = require.resolve("./src/templates/post.jsx");
  const tagPage = require.resolve("./src/templates/tag.jsx");
  const categoryPage = require.resolve("./src/templates/category.jsx");
  const allPostsPage = require.resolve("./src/templates/all-posts.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
              category
              date
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

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

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
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
