import React from "react";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import classnames from "classnames";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import style from "./listing.module.scss";


const Page = ({pageNum, currentPageNum}) => {
  const isCurrentPage = pageNum === currentPageNum;
  return (
    <Link
      key={pageNum}
      to={pageNum === 1 ? "/" : `/${pageNum}/`}
      className={classnames([style.page, isCurrentPage && style.current])}
    >
      {pageNum}
    </Link>
  );
}

class Listing extends React.Component {

  renderPagination() {
    const { currentPageNum, pageCount } = this.props.pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/" : `/${currentPageNum - 1}/`;
    const nextPage = `/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;

    return (
      <nav aria-label="pagination" className={style.pagination}>
        {!isFirstPage && <Link to={prevPage} className={style.page}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => (
          <Page pageNum={index+1} currentPageNum={currentPageNum} />
        ))}
        {!isLastPage && <Link to={nextPage} className={style.page}>Next</Link>}
      </nav>
    );
  }

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;

    return (
      <Layout>
        <Helmet title={config.siteTitle} />
        <SEO />
        <PostListing postEdges={postEdges} />
        {this.renderPagination()}
      </Layout>
    );
  }
}

export default Listing;

/* eslint no-undef: "off" */
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PostMetadata
        }
      }
    }
  }
`;
