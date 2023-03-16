import CategoriesFilter from "./category/CategoriesFilter";
import FilteredPrice from "./price/FilteredPrice";
import styles from "./Aside.module.scss";
import { Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectShowOffcanvas,
  setShowOffCanvas,
} from "../../../store/states/productFilters";

const Aside = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setShowOffCanvas(false));
  const showOffcanvas = useAppSelector(selectShowOffcanvas);
  return (
    <Offcanvas
      onHide={handleClose}
      show={showOffcanvas}
      className="sticky-lg-top"
      responsive="lg"
      id={styles.Aside}
    >
      <Offcanvas.Header closeButton className="justify-content-end"/>
      <Offcanvas.Body>
        <div>
          <CategoriesFilter />
          <FilteredPrice />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Aside;
