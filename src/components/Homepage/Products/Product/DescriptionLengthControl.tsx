//@ts-nocheck
import styles from "./Product.module.scss";
import { Button, Card } from "react-bootstrap";
import Product from "./Product";
import { useState } from "react";
import classNames from "classnames";

// description.slice(0, characterCounts)
// description.lastIndexof(" ")? description.slice(0, characterCounts) :

const DescriptionLengthControl = ({ product:{description} }) => {
  const characterCounts = 50;
  
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore((shM) => !shM);

  const shortenText = () => {
    const shortenDescription = description.slice(0, characterCounts);
    const lastSpaceIndexof = shortenDescription.lastIndexOf(" ");
    const text = shortenDescription.slice(0, lastSpaceIndexof);
    return text;
  };

  return (
    <>
      <Card.Text className={classNames(styles.cardDescription, "mb-0")}>
        {!showMore ? shortenText() : description}
      </Card.Text>
      {description.length > characterCounts && (
        <Button
          variant="link"
          size="sm"
          onClick={toggleShowMore}
          className="d-flex flex-row px-0"
        >
          show {showMore ? "less" : "more"}
        </Button>
      )}
    </>
  );
};

export default DescriptionLengthControl;
