import { Col, Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { useAppSelector } from "../../store/hooks";
import { selectBookmarks } from "../../store/states/bookmarks";
import { Product as ProductType } from "../../store/states/products";
import Product from "../Homepage/Products/Product/Product";
import styles from "./BookmarksPage.module.scss";
import { Link } from "react-router-dom";
import Routes from "../../Routes/Routes";
import PageHeader from "../PageHeaders/PageHeader";

const BookmarksPage = () => {
  const bookmarksState = useAppSelector(selectBookmarks);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(bookmarksState.length > 0);

  useEffect(() => {
    setIsLoading(bookmarksState.length > 0);
    setProducts([]);
    const bookmarksLength = bookmarksState.length;
    let successfulRequests = 0;
    bookmarksState.forEach((id) => {
      axios
        .get<ProductType>(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then((res) => res.data)
        .then((fetchedBookmarkProduct) => {
          setProducts((prevProducts) => [
            ...prevProducts,
            fetchedBookmarkProduct,
          ]);
          successfulRequests++;
        })
        .finally(() => {
          if (bookmarksLength === successfulRequests) {
            setIsLoading(false);
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarksState.length]);

  return (
    <Container>
      <PageHeader>WISH LIST</PageHeader>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && products.length === 0 && (
        <div className="d-flex flex-column align-items-center mt-5 gap-4">
          <div
            className={classNames(
              styles.noCartText,
              "fw-bolder",
              "fs-4",
              "text-center"
            )}
          >
            There's nothing on your wish list. 😟
          </div>
          <div className={styles.textGuidance}>
            add products by clicking on The heart icon
            <FontAwesomeIcon icon={faHeart} className="fs-6 ms-1" />
          </div>
          <Link
            to={Routes.Homepage}
            className="btn btn-success text-decoration-none px-4 py-2"
          >
            Continue Shopping
          </Link>
        </div>
      )}
      {!isLoading && products.length !== 0 && (
        <Row xs={1} md={3} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
export default BookmarksPage;
