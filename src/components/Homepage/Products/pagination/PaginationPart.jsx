import Pagination from "react-bootstrap/Pagination";

const PaginationPart = ({ pageCount }) => {
  const pages = [];
  for (let page = 1; page <= pageCount; page++) {
    pages.push(<Pagination.Item key={page}>{page}</Pagination.Item>);
  }

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {pages}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default PaginationPart;
