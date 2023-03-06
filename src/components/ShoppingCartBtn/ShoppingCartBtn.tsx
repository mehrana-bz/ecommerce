import { Button } from "react-bootstrap";
import { faCartShopping, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { addProductToCart } from "../../store/states/shoppingCart";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../../store/hooks";
import { Product } from "../../store/states/products";

interface ShoppingCartBtnProps {
  productId: Product["id"];
}

const ShoppingCartBtn = ({ productId }: ShoppingCartBtnProps) => {
  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleCartClick = () => {
    dispatch(addProductToCart(productId));
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  return (
    <Button
      variant="primary"
      className="px-3"
      onClick={handleCartClick}
      disabled={isDisabled}
    >
      {!isDisabled && (
        <>
          <FontAwesomeIcon icon={faPlus} />
          <FontAwesomeIcon icon={faCartShopping} />
        </>
      )}
      {isDisabled && (
        <>
          <FontAwesomeIcon icon={faCheck} className="me-1" />
          <span>Added</span>
        </>
      )}
    </Button>
  );
};
export default ShoppingCartBtn;
