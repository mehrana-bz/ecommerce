import {
  Link,
  generatePath,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  Button,
  Container,
  Navbar,
  Form,
  Image,
  Ratio,
  NavDropdown,
} from "react-bootstrap";
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
import {
  setSearch,
  selectSearch,
  setShowOffCanvas,
} from "../../store/states/productFilters";
import LogoIcon from "../icons/LogoIcon";
import styles from "./Header.module.scss";
import { selectBookmarks } from "../../store/states/bookmarks";
import { selectShoppingCart } from "../../store/states/shoppingCart";
import {
  logout,
  selectIsLogin,
  selectUser,
} from "../../store/states/authentication";
import classNames from "classnames";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isLogin = useAppSelector(selectIsLogin);
  const user = useAppSelector(selectUser);

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

  const handleShow = () => dispatch(setShowOffCanvas(true));

  const isOnHomepage = [Routes.Homepage, Routes.Page].some((pattern) => {
    return matchPath(pattern, location.pathname) !== null;
  });

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      id={styles.Header}
      className={classNames({
        [styles.isHomepage]: isOnHomepage,
      })}
    >
      <Navbar bg="light" variant="light" fixed="top" expand="lg">
        <Container className="d-flex flex-wrap justify-content-between gap-2">
          {isOnHomepage && <Navbar.Toggle onClick={handleShow} />}
          <Navbar.Brand
            as={Link}
            to={Routes.Homepage}
            className="order-2 order-lg-1 mx-auto mx-lg-0"
          >
            <LogoIcon />
          </Navbar.Brand>
          <div className="order-1 order-lg-2 me-lg-auto">
            {!isLogin && (
              <>
                <Link
                  to={Routes.Register}
                  className="fs-6 ms-2 text-decoration-none"
                >
                  Register
                </Link>
                <span className="text-primary">/</span>
                <Link to={Routes.Login} className="fs-6 text-decoration-none">
                  login
                </Link>
              </>
            )}
            {isLogin && user && (
              <div className="d-flex align-items-center gap-2">
                <div>
                  <Ratio aspectRatio="1x1" className={styles.profileImg}>
                    <Image
                      roundedCircle
                      src={user.avatar}
                      className="object-fit-cover bg-secondary"
                    />
                  </Ratio>
                </div>

                <NavDropdown
                  title={<Navbar.Text>{user.name}</Navbar.Text>}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as="div"
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </div>
          {isOnHomepage && (
            <Form
              onSubmit={handleSearchSubmit}
              className="d-flex w-100 w-lg-auto order-3 order-lg-2 me-lg-auto"
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
          )}
          <div className="order-2 order-lg-3 d-flex justify-content-end gap-3">
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
        </Container>
      </Navbar>
    </header>

    // <header id={styles.Header}>
    //   <Navbar bg="light" variant="light" fixed="top" expand="lg">
    //     <Container>
    //       <Navbar.Brand as={Link} to={Routes.Homepage} className="Websitelogo">
    //         <LogoIcon />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="navbar-dark-example basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
    //         <Nav className="me-auto">
    //           <div className="d-flex align-items-center w-100 justify-content-end gap-3">
    //             <Form
    //               onSubmit={handleSearchSubmit}
    //               className={classNames(styles.form, "d-flex")}
    //             >
    //               <Form.Control
    //                 type="search"
    //                 placeholder="Search"
    //                 className="me-2"
    //                 aria-label="Search"
    //                 onInput={handleSearchValueInput}
    //                 value={search}
    //               />
    //               <Button variant="outline-primary" type="submit">
    //                 Search
    //               </Button>
    //             </Form>
    //             <Link to={Routes.Bookmarks}>
    //               <div className="position-relative">
    //                 <FontAwesomeIcon icon={faHeart} className="fs-4" />
    //                 {bookmarksState.length !== 0 && (
    //                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                     {bookmarksState.length}
    //                   </span>
    //                 )}
    //               </div>
    //             </Link>
    //             <Link to={Routes.ShoppingCart}>
    //               <div className="position-relative">
    //                 <FontAwesomeIcon
    //                   icon={faBasketShopping}
    //                   className="fs-5 text-primary"
    //                   role="button"
    //                 />
    //                 {shoppingCartState.length !== 0 && (
    //                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    //                     {shoppingCartsSum}
    //                   </span>
    //                 )}
    //               </div>
    //             </Link>
    //           </div>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
  );
};
export default Header;
