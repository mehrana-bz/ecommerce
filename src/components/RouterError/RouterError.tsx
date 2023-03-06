// @ts-nocheck
import { Container } from "react-bootstrap";
import { useRouteError } from "react-router";

const RouterError = () => {
    const error = useRouteError();

    return (
        <Container>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.status}</i>
                <br />
                <i>{error.statusText || error.message}</i>
            </p>
        </Container>
    );
};

export default RouterError;