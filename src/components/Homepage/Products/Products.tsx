import { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getPageCount,
  getPaginatedProducts,
  selectProducts,
} from "../../../store/states/products";
import { selectIsLoading } from "../../../store/states/isLoading";
import PaginationPart from "./pagination/PaginationPart";
import { selectPageCount } from "../../../store/states/pageCount";
import Product from "./Product/Product";



const Products = () => {
  // const [products , setProducts] = useState([]);

  //dispatch
  const dispatch = useAppDispatch();

  //useSelectors
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectIsLoading);
  const pageCount = useAppSelector(selectPageCount);

  //useStates
  // const [isLoading, setIsLoading] = useState(true);
  // const [pageCount, setPageCount] = useState(0);

  //get routes parts in url with useParams
  const { number: pageNumber = "1" } = useParams();
  const currentPage = parseInt(pageNumber);

  useEffect(() => {
     dispatch(getPageCount());
  }, []);

  useEffect(() => {
    dispatch(getPaginatedProducts(currentPage));
  }, [currentPage]);

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && products.length !== 0 && (
        <>
          <Row xs={1} md={3} className="g-4">
            {products.map((product) => (
              <Col key={product.id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginationPart pageCount={pageCount} currentPage={currentPage} />
        </>
      )}
      {!isLoading && products.length === 0 && <div>😥 No Result found!!!</div>}
    </>
  );
};

export default Products;
