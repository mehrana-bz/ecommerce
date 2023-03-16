import { Link, generatePath, useNavigate } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Button, Container, Navbar, Form, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent } from "react";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";

import {
  getPageCount,
  getPaginatedProducts,
} from "../../store/states/products";
import Routes from "../../Routes/Routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearch, selectSearch } from "../../store/states/productFilters";
import LogoIcon from "../icons/LogoIcon";
import styles from "./Header.module.scss";
import { selectBookmarks } from "../../store/states/bookmarks";
import { selectShoppingCart } from "../../store/states/shoppingCart";
import classNames from "classnames";

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

  const bookmarksState = useAppSelector(selectBookmarks);
  const shoppingCartState = useAppSelector(selectShoppingCart);

  const shoppingCartsSum = useMemo(() => {
    return shoppingCartState.reduce((sum, cart) => sum + cart.count, 0);
  }, [shoppingCartState]);

  return (
    // <header id={styles.Header}>
    //   <Navbar bg="light" variant="light" fixed="top" expand="lg">
    //     <Container>
    //       <Navbar.Brand as={Link} to={Routes.Homepage} className="Websitelogo">
    //         <LogoIcon />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="navbar-dark-example" />
    //       <div className="d-flex align-items-center w-100 justify-content-end gap-3">
    //         <Form onSubmit={handleSearchSubmit} className="d-flex w-50">
    //           <Form.Control
    //             type="search"
    //             placeholder="Search"
    //             className="me-2"
    //             aria-label="Search"
    //             onInput={handleSearchValueInput}
    //             value={search}
    //           />
    //           <Button variant="outline-primary" type="submit">
    //             Search
    //           </Button>
    //         </Form>
    //         <Link to={Routes.Bookmarks}>
    //           <div className="position-relative">
    //             <FontAwesomeIcon icon={faHeart} className="fs-4" />
    //             {bookmarksState.length !== 0 && (
    //               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                 {bookmarksState.length}
    //               </span>
    //             )}
    //           </div>
    //         </Link>
    //         <Link to={Routes.ShoppingCart}>
    //           <div className="position-relative">
    //             <FontAwesomeIcon
    //               icon={faBasketShopping}
    //               className="fs-5 text-primary"
    //               role="button"
    //             />
    //             {shoppingCartState.length !== 0 && (
    //               <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                 {shoppingCartsSum}
    //               </span>
    //             )}
    //           </div>
    //         </Link>
    //       </div>
    //     </Container>
    //   </Navbar>
    // </header>

    <header id={styles.Header}>
      <Navbar bg="light" variant="light" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={Routes.Homepage} className="Websitelogo">
            <LogoIcon />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
            <Nav className="me-auto">
              <div className="d-flex align-items-center w-100 justify-content-end gap-3">
                <Form
                  onSubmit={handleSearchSubmit}
                  className={classNames(styles.form, "d-flex")}
                >
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
                <Link to={Routes.Bookmarks}>
                  <div className="position-relative">
                    <FontAwesomeIcon icon={faHeart} className="fs-4" />
                    {bookmarksState.length !== 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {bookmarksState.length}
                      </span>
                    )}
                  </div>
                </Link>
                <Link to={Routes.ShoppingCart}>
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faBasketShopping}
                      className="fs-5 text-primary"
                      role="button"
                    />
                    {shoppingCartState.length !== 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {shoppingCartsSum}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
