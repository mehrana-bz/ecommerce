import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./Login.module.scss";
import { useState, FormEvent, FocusEvent } from "react";
import * as Yup from "yup";

import PageHeader from "../PageHeaders/PageHeader";
import classNames from "classnames";
import { loginUser } from "../../store/states/authentication";
import { useAppDispatch } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import Routes from "../../Routes/Routes";
import Field from "../Register/Field";
import TwoBoxLayout from "../TwoBoxLayout/TwoBoxLayout";

interface ErrorMessages {
  email: string;
  password: string;
}
interface FormValues {
  email: string;
  password: string;
}

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8).max(12),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: "",
    password: "",
  });

  //form submit
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setErrors([]);

    const isFormValid = await loginValidationSchema.isValid(formValues, {
      abortEarly: false,
    });

    if (!isFormValid) {
      loginValidationSchema
        .validate(formValues, { abortEarly: false })
        .catch((err: Yup.ValidationError) => {
          const errors = err.inner.reduce((errors, error) => {
            const fieldName = error.path;
            if (!fieldName) return errors;

            if (!errors[fieldName]) {
              errors[fieldName] = error.message;
            }

            return errors;
          }, {} as Record<string, string>);

          setErrorMessages((currentErrorMessages) => ({
            ...currentErrorMessages,
            ...errors,
          }));
        });

      return;
    }

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
  }: FocusEvent<HTMLInputElement>): void => {
    loginValidationSchema
      .validateAt(name, formValues)
      .catch((err: Yup.ValidationError) => {
        setErrorMessages((currentErrorMessages) => ({
          ...currentErrorMessages,
          [name]: err.message,
        }));
      });
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
    <div
      className={classNames(
        "d-flex align-items-center justify-content-center",
        styles.midContent
      )}
    >
      <TwoBoxLayout
        leftChild={
          <>
            <PageHeader>Login</PageHeader>
            <Form
              className="d-flex flex-column gap-3"
              onSubmit={handleLogin}
              noValidate
            >
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
          </>
        }
        rightChild={
          <>
            <div className="d-none d-md-block">
              <h3>Don't have an account?</h3>
              <p className="my-2">
                Ready to take the next step? Join our community and create an
                account today! It's quick, easy, and comes with a bunch of
                awesome perks just for you.
              </p>
              <Link to={Routes.Register}>
                <Button variant="outline-light px-5">Register</Button>
              </Link>
            </div>
            <div className="d-flex d-md-none gap-3 align-items-center">
              <h3 className="text-black-50">Don't have an account?</h3>
              <Link to={Routes.Register}>Register</Link>
            </div>
          </>
        }
      />
    </div>
  );
};
export default Login;
