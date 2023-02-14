import { generatePath, useNavigate } from "react-router-dom";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

import Routes from "../../../../Routes/Routes";

{
  /* <NavLink to={generatePath(Routes.Page, { number: page })}>
{page}
</NavLink> */
}
interface PaginationPartProps {
  pageCount: number;
  currentPage?: number;
}

const PaginationPart = ({
  pageCount,
  currentPage = 1,
}: PaginationPartProps) => {
  const navigate = useNavigate();

  const handleChangePage: ReactPaginateProps["onPageChange"] = (selectedPage) => {
    const page = selectedPage.selected + 1;
    const href = generatePath(Routes.Page, { number: page.toString() });
    navigate(href);
  };

  const hrefBuilder: ReactPaginateProps["hrefBuilder"] = (pageIndex) => {
    return generatePath(Routes.Page, { number: pageIndex.toString() });
  };

  return (
    <ReactPaginate
      initialPage={currentPage - 1}
      nextLabel="next >"
      onPageChange={handleChangePage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination sticky-bottom"
      activeClassName="active"
      hrefBuilder={hrefBuilder}
    />
  );
};

export default PaginationPart;
