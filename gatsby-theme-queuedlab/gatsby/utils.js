// Modified from
// https://github.com/gatsbyjs/themes/blob/692499ec782aae8b47bcd5aafbbe3cc565b9e429/packages/gatsby-theme-blog-core/gatsby-node.js#L32
const parentResolverPassthrough = (fieldName) => async (source, args, context, info) => {
  const parentNode = context.nodeModel.getNodeById({ id: source.parent });
  const type = info.schema.getType(parentNode.internal.type);
  const resolver = type.getFields()[fieldName].resolve;
  const result = await resolver(parentNode, args, context, { fieldName });
  return result;
};

module.exports = {
  parentResolverPassthrough
};
