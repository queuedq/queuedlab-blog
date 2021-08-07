import React from "react";
import { Link } from "gatsby";
import classnames from "classnames";
import * as style from "./Pagination.module.scss";

const Page = ({index, current, linkPrefix}) => {
  const isCurrentPage = index === current;
  return (
    <Link
      key={index}
      to={`${linkPrefix}/${index}/`}
      className={classnames([style.page, isCurrentPage && style.current])}
    >
      {index}
    </Link>
  );
}

const Pagination = ({count, current, linkPrefix}) => {
  const prevPage = `${linkPrefix}/${current - 1}/`;
  const nextPage = `${linkPrefix}/${current + 1}/`;
  const isFirstPage = current === 1;
  const isLastPage = current === count;

  return (
    <nav aria-label="pagination" className={style.pagination}>
      {!isFirstPage &&
        <Link to={prevPage} className={style.page}>Previous</Link>
      }
      {[...Array(count)].map((_val, index) => (
        <Page index={index+1} current={current} linkPrefix={linkPrefix} />
      ))}
      {!isLastPage &&
        <Link to={nextPage} className={style.page}>Next</Link>
      }
    </nav>
  );
}

export default Pagination;
