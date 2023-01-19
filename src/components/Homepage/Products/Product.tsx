//@ts-nocheck
import { Card, ListGroup } from "react-bootstrap";
import "./Product.scss"

const Product = ({product}) => {
  console.log(product);
  return (
    <div>
      <Card style={{ width: "18rem" }} className = "my-3">
        <Card.Img variant="top" src = {product.images} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text className="cardDescription">
            {product.description}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Cras justo odio</ListGroup.Item>
          <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
          <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
