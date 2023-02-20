import { Carousel, Col, Row } from "react-bootstrap";
import { Product as ProductType } from "../../store/states/products";
import styles from "./ProductPage.module.scss";
import Rates from "../icons/Rates";
import classNames from "classnames";
import ProductShoppingInfo from "./ProductShoppingInfo";

interface ProductProps {
  product: ProductType;
}

const ProductInfo = ({ product }: ProductProps) => {
  return (
    <>
      <div className="mt-5">
        <h2>{product.title}</h2>
        <Rates />
      </div>
      <Row className="mt-3">
        <Col sm={7}>
          <Carousel>
            {product.images.map((address, index) => (
              <Carousel.Item key={index} className="ratio ratio-16x9">
                <img
                  className={classNames("d-block", "w-100", styles.pics)}
                  src={address}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col sm={5}>
          <ProductShoppingInfo product={product}/>
        </Col>
      </Row>
    </>
  );
};
export default ProductInfo;
