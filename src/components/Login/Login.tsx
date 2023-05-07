import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import styles from "./Login.module.scss";
import { useState, FormEvent, FocusEvent } from "react";

import PageHeader from "../PageHeaders/PageHeader";
import classNames from "classnames";
import { loginUser } from "../../store/states/authentication";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import Routes from "../../Routes/Routes";
import Field from "../Register/Field";

interface ErrorMessages {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: "",
    password: "",
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    let isFormValid = true;
    for (const name in formValues) {
      const isValid = validateInput({
        // @ts-ignore
        currentTarget: {
          name,
        },
      });
      if (!isValid) {
        isFormValid = false;
      }
    }

    if (!isFormValid) return;

    setErrors([]);
    setIsLoading(true);

    dispatch(loginUser(formValues.email, formValues.password))
      .then(() => navigate(Routes.Homepage))
      .catch(() => {
        setErrors(["Entered email or password is not correct"]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInput = ({
    currentTarget: { value, name, checked, type },
  }: FormEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateInput = ({
    currentTarget: { name },
  }: FocusEvent<HTMLInputElement>): boolean => {
    let isValid = true;

    switch (name) {
      case "email":
        if (
          !new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(
            formValues.email
          )
        ) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            email: "fill the field correctly please.",
          }));
          isValid = false;
        }
        break;
      case "password":
        if (!formValues.password) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            password: "Password is required.",
          }));
          isValid = false;
        }
        break;
    }

    return isValid;
  };
  const resetValidation = ({
    currentTarget: { name },
  }: FocusEvent<HTMLInputElement>) => {
    setErrorMessages((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  return (
    <Container
      className={classNames("d-flex align-items-center", styles.middleLoginBox)}
    >
      <div className="w-25 mx-auto">
        <PageHeader>Login</PageHeader>
        <Form className="d-flex flex-column gap-3" onSubmit={handleLogin} noValidate>
          <Field
            type="email"
            title="Email*"
            placeholder="Enter your email..."
            name="email"
            onChange={handleInput}
            onBlur={validateInput}
            onFocus={resetValidation}
            value={formValues.email}
            err={errorMessages.email}
          />
          <Field
            type="password"
            title="Password*"
            placeholder="Enter your password..."
            name="password"
            onChange={handleInput}
            onBlur={validateInput}
            onFocus={resetValidation}
            value={formValues.password}
            err={errorMessages.password}
          />
          {errors.length > 0 && (
            <Alert variant="danger">
              <ul className="m-0">
                {errors.map((error, index) => (
                  <li
                    className={classNames(" lh-sm", styles.errorMessages)}
                    key={index}
                  >
                    {error}
                  </li>
                ))}
              </ul>
            </Alert>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="d-flex gap-2 align-items-center w-100 justify-content-center"
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};
export default Login;
