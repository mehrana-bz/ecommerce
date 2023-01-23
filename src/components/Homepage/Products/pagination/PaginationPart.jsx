//@ts-nocheck
import Pagination from "react-bootstrap/Pagination";
import styles from "./Pagination.module.scss";
import { NavLink, generatePath, useNavigate } from "react-router-dom";
import Routes from "../../../../Routes/Routes";
import classNames from "classnames";

{
  /* <NavLink to={generatePath(Routes.Page, { number: page })}>
{page}
</NavLink> */
}

const PaginationPart = ({ pageCount , currentPage=1}) => {
  const navigate = useNavigate();
  

  const handleChangePage = (href) => (e) => {
    e.preventDefault();
    navigate(href);
  };

  const pages = [];
  for (let page = 1; page <= pageCount; page++) {
    const href = generatePath(Routes.Page, { number: page });
    pages.push(
      <Pagination.Item
        key={page}
        className={styles.borderColor}
        href={href}
        onClick={handleChangePage(href)}
        active={currentPage===page}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="sticky-bottom">
      {pages}
      <Pagination.Next className={styles.borderColor} />
      <Pagination.Last
        className={classNames("rounded-end", styles.borderColor)}
      />
    </Pagination>
  );
};

export default PaginationPart;
