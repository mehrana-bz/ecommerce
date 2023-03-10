import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../store/states/products";
import { Container, Spinner } from "react-bootstrap";

import ProductInfo from "./ProductInfo";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.data)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <>
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isLoading && !product && <div>product doesn't exist.</div>}
      {!isLoading && product && (
        <Container>
          <ProductInfo product={product} />
        </Container>
      )}
    </>
  );
};

export default ProductPage;
