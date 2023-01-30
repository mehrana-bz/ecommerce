//@ts-nocheck
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
  Form,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSearch, selectSearch } from "../../store/states/search";

const Header = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  const handleSearchValue = ({ target: { value } }) => {
    dispatch(setSearch(value));
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // show loading again
    // show related
  };

  return (
    <header className="pt-5">
      <Navbar bg="primary" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <svg
              height="30px"
              width="30px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512.016 512.016"
            >
              <polygon points="145.544,151.36 105.184,31.92 0.68,31.92 0.68,0 128.096,0 175.784,141.136 " />
              <polygon
                style={{ fill: "#FFD67F" }}
                points="68.128,124.56 511.336,124.56 426.856,361.584 141.936,361.584 "
              />
              <circle cx="377.128" cy="450.56" r="61.456" />
              <circle cx="191.752" cy="450.56" r="61.456" />
              <polygon
                style={{ fill: "#FF583E" }}
                points="322.288,308.816 195.832,180.656 322.288,52.496 443.632,52.496 316.968,180.656 
	443.632,308.816 "
              />
            </svg>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                  <>
                    view all
                    <br />
                    categories
                  </>
                }
                menuVariant="light"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Form onSubmit={handleSearchSubmit} className="d-flex w-50">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onInput={handleSearchValue}
              value={search}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
