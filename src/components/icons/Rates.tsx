import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import {useRef} from "react";

interface RatesProps {
  className?: string;
}

const Rates = ({ className }: RatesProps) => {
  const {current: markedStarsCount} = useRef(Math.floor(Math.random() * 5));

  return (
    <div className={classNames("rates", className)}>
      <FontAwesomeIcon
        icon={faStar}
        color={markedStarsCount >= 1 ? "yellow" : "gray"}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={markedStarsCount >= 2 ? "yellow" : "gray"}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={markedStarsCount >= 3 ? "yellow" : "gray"}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={markedStarsCount >= 4 ? "yellow" : "gray"}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={markedStarsCount === 5 ? "yellow" : "gray"}
      />
    </div>
  );
};
export default Rates;
