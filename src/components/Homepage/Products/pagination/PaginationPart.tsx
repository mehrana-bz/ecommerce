import { generatePath, useNavigate } from "react-router-dom";
import { MouseEvent, ReactElement } from "react";
import classNames from "classnames";

import styles from "./Pagination.module.scss";
import Routes from "../../../../Routes/Routes";
import Pagination from "react-bootstrap/Pagination";

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

  const handleChangePage =
    (href: string) =>
    (e: MouseEvent<HTMLLinkElement>): void => {
      e.preventDefault();
      navigate(href);
    };

  const pages: ReactElement[] = [];
  for (let page = 1; page <= pageCount; page++) {
    const href = generatePath(Routes.Page, { number: page.toString() });
    pages.push(
      <Pagination.Item
        key={page}
        className={styles.borderColor}
        href={href}
        onClick={handleChangePage(href)}
        active={currentPage === page}
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
