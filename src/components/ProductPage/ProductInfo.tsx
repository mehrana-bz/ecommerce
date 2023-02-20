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
      <Row>
        <Col sm={7}>
          <h2>{product.title}</h2>
          <Rates className="mb-3"/>
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
          <ProductShoppingInfo />
        </Col>
      </Row>
    </>
  );
};
export default ProductInfo;
