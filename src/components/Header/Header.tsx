import { Link, generatePath, useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Button, Container, Navbar, Form } from "react-bootstrap";

import {
  getPageCount,
  getPaginatedProducts,
} from "../../store/states/products";
import Routes from "../../Routes/Routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearch, selectSearch } from "../../store/states/productFilters";
import { ChangeEvent, FormEvent } from "react";
import LogoIcon from "../icons/LogoIcon";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const search = useAppSelector(selectSearch);

  const handleSearchValueInput = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(value));
  };
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(generatePath(Routes.Homepage));
    dispatch(getPageCount());
    dispatch(getPaginatedProducts(1));
  };

  return (
    <header id={styles.Header}>
      <Navbar bg="light" variant="light" fixed="top" className="">
        <Container>
          <Navbar.Brand as={Link} to={Routes.Homepage}>
            <LogoIcon />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <div className="d-flex align-items-center w-100 justify-content-end gap-3">
            <Form onSubmit={handleSearchSubmit} className="d-flex w-50">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onInput={handleSearchValueInput}
                value={search}
              />
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
