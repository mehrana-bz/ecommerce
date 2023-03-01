import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { selectBookmarks } from "../../store/states/bookmarks";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product as ProductType } from "../../store/states/products";
import Product from "../Homepage/Products/Product/Product";

const BookmarksPage = () => {
  const bookmarksState = useAppSelector(selectBookmarks);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(bookmarksState.length > 0);

  useEffect(() => {
    setIsLoading(bookmarksState.length > 0);
    setProducts([]);
    bookmarksState.forEach((id) => {
      axios
        .get<ProductType>(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then((res) => res.data)
        .then((fetchedBookmarkProduct) =>
          setProducts((prevProducts) => [
            ...prevProducts,
            fetchedBookmarkProduct,
          ])
        )
        .finally(() => setIsLoading(false));
    });
  }, [bookmarksState.length]);

  return (
    <Container>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && products.length === 0 && (
        <div>you don't have a wishlist yet 😟</div>
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
