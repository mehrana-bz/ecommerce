//@ts-nocheck
import { useState, useMemo } from "react";
import classNames from "classnames";
import { Button, Card } from "react-bootstrap";

import styles from "./Product.module.scss";

const characterLimits = 50;

const DescriptionLengthControl = ({ product: { description } }) => {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore((shM) => !shM);

  const shortenedDescription = useMemo(() => {
    const shortenDescription = description.slice(0, characterLimits);
    const lastSpaceIndexof = shortenDescription.lastIndexOf(" ");
    let meaningfulDescription = shortenDescription.slice(0, lastSpaceIndexof);
    meaningfulDescription += " ...";
    return meaningfulDescription;
  }, [description]);

  return (
    <>
      <Card.Text className={classNames(styles.cardDescription, "mb-0")}>
        {!showMore ? shortenedDescription : description}
      </Card.Text>
      {description.length > characterLimits && (
        <div>
          <Button
            variant="link"
            size="sm"
            onClick={toggleShowMore}
            className="px-0"
          >
            show {showMore ? "less" : "more"}
          </Button>
        </div>
      )}
    </>
  );
};

export default DescriptionLengthControl;
