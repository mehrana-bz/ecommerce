//@ts-nocheck
import Pagination from "react-bootstrap/Pagination";
import styles from "./Pagination.module.scss";
import { NavLink, generatePath } from "react-router-dom";
import Routes from "../../../../Routes/Routes";

const PaginationPart = ({ pageCount }) => {
  const pages = [];
  for (let page = 1; page <= pageCount; page++) {
    pages.push(
      <Pagination.Item key={page} className={styles.borderColor}>
        <NavLink to={generatePath(Routes.Page, { number: page })}>
          {page}
        </NavLink>
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="sticky-bottom">
      {pages}
      <Pagination.Next className={styles.borderColor} />
      <Pagination.Last className={"rounded-end" styles.borderColor} />
    </Pagination>
  );
};

export default PaginationPart;
