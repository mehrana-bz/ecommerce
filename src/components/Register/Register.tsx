import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import classNames from "classnames";
import { FocusEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import styles from "./Register.module.scss";
import { loginUser } from "../../store/states/authentication";
import Routes from "../../Routes/Routes";
import PageHeader from "../PageHeaders/PageHeader";
import { useAppDispatch } from "../../store/hooks";
import Field from "./Field";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  hobbies: string[];
  userType: string;
  rule: boolean;
}
interface ErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  hobbies: string;
  userType: string;
  rule: string;
}

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3)
    .when("isSubmit", {
      is: true,
      then: (schema) => schema.trim(),
    }),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3)
    .when("isSubmit", {
      is: true,
      then: (schema) => schema.trim(),
    }),
  email: Yup.string()
    .required()
    .email()
    .lowercase()
    .when("isSubmit", {
      is: true,
      then: (schema) => schema.trim(),
    }),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter and one number"
    )
    .min(6),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")]),
  gender: Yup.string()
    .required()
    .oneOf(["male", "female"], "Gender is required"),
  hobbies: Yup.array()
    .required()
    .of(Yup.string().oneOf(["music", "sports", "travel", "movie"]))
    .min(1, "Select at least one hobby"),
  userType: Yup.string()
    .required()
    .oneOf(["customer", "admin"], "User type is required"),
  rule: Yup.boolean().required().oneOf([true]),
});

const Register = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    hobbies: [],
    userType: "",
    rule: false,
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    hobbies: "",
    userType: "",
    rule: "",
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hobbiesOptions = [
    {
      label: "Music",
      value: "music",
      checked: formValues.hobbies.includes("music"),
      id: "music",
    },
    {
      label: "Sports",
      checked: formValues.hobbies.includes("sports"),
      value: "sports",
      id: "sports",
    },
    {
      label: "Travel",
      checked: formValues.hobbies.includes("travel"),
      value: "travel",
      id: "travel",
    },
    {
      label: "Movie",
      checked: formValues.hobbies.includes("movie"),
      value: "movie",
      id: "movie",
    },
  ];

  const genderOptions = [
    {
      label: "Male",
      value: "male",
      checked: formValues.gender === "male",
      id: "male",
    },
    {
      label: "Female",
      value: "female",
      checked: formValues.gender === "female",
      id: "female",
    },
  ];

  const handleInput = ({
    currentTarget: { value, name, checked, type },
  }: FormEvent<HTMLInputElement>) => {
    setFormValues(
      (prevValues) =>
        registerSchema.cast({
          ...prevValues,
          [name]: type === "checkbox" ? checked : value,
        }) as FormValues
    );
  };

  const handleMultiSelectCheckboxChange = ({
    currentTarget: { value, name, checked },
  }: FormEvent<HTMLInputElement>) => {
    if (checked) {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: [...prevValues.hobbies, value],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: prevValues.hobbies.filter((hobby) => hobby !== value),
      }));
    }
  };

  const validateInput = ({
    currentTarget: { name },
  }: FocusEvent<HTMLInputElement>): void => {
    registerSchema
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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setErrors([]);

    const normalizedFormValues = registerSchema.cast(
      registerSchema.cast({
        isSubmit: true,
        ...formValues,
      }),
      { stripUnknown: true }
    );

    const isFormValid = await registerSchema.isValid(normalizedFormValues, {
      abortEarly: false,
    });

    if (!isFormValid) {
      registerSchema
        .validate(normalizedFormValues, { abortEarly: false })
        .catch((err: Yup.ValidationError) => {
          const firstInvalidInput = err.inner[0].path;
          const el = document.querySelector(
            `input[name="${firstInvalidInput}"]`
          );
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }

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

    axios
      .post("https://api.escuelajs.co/api/v1/users/", {
        name:
          normalizedFormValues.firstName + " " + normalizedFormValues.lastName,
        email: normalizedFormValues.email,
        password: normalizedFormValues.password,
        avatar: "https://i.pravatar.cc/100",
      })
      .then(() =>
        dispatch(
          loginUser(normalizedFormValues.email, normalizedFormValues.password)
        )
      )
      .then(() => navigate(Routes.Homepage))
      .catch((err) => {
        const errMessages = err.response.data.message;
        setErrors(errMessages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container
      fluid
      className={classNames(
        "mb-4 d-flex justify-content-center align-items-center",
        styles.body
      )}
    >
      <div className="w-lg-50 mx-auto px-4 py-5 rounded">
        <PageHeader className={styles.title}>Create Account</PageHeader>
        <Form onSubmit={handleFormSubmit} noValidate>
          <Row className="gx-3 gy-4">
            <Col lg={6}>
              <Field
                name="firstName"
                title="Firstname*"
                type="text"
                placeholder="Enter your firstname..."
                onChange={handleInput}
                value={formValues.firstName}
                onBlur={validateInput}
                onFocus={resetValidation}
                err={errorMessages.firstName}
              />
            </Col>
            <Col lg={6}>
              <Field
                type="text"
                placeholder="Enter your lastname..."
                name="lastName"
                title="Lastname*"
                onChange={handleInput}
                onBlur={validateInput}
                onFocus={resetValidation}
                value={formValues.lastName}
                err={errorMessages.lastName}
              />
            </Col>
            <Col lg={12}>
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
            </Col>
            <Col lg={6}>
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
            </Col>
            <Col lg={6}>
              <Field
                type="password"
                title="Confirm Password*"
                placeholder="Enter your password again..."
                name="confirmPassword"
                onChange={handleInput}
                onBlur={validateInput}
                onFocus={resetValidation}
                value={formValues.confirmPassword}
                err={errorMessages.confirmPassword}
              />
            </Col>
            <Col lg={6}>
              <Field
                type="radio"
                title="Gender*"
                options={genderOptions}
                name="gender"
                onChange={handleInput}
                onBlur={validateInput}
                onFocus={resetValidation}
                err={errorMessages.gender}
              />
            </Col>
            <Col lg={6}>
              <Field
                type="checkbox"
                title="Hobbies"
                options={hobbiesOptions}
                name="hobbies"
                onBlur={validateInput}
                onFocus={resetValidation}
                onChange={handleMultiSelectCheckboxChange}
                err={errorMessages.hobbies}
              />
            </Col>
            <Col lg={6}>
              <Form.Group controlId="userType">
                <Form.Label className={classNames("d-block", styles.label)}>
                  Type of User
                </Form.Label>
                <Form.Select
                  name="userType"
                  // @ts-ignore
                  onChange={handleInput}
                  value={formValues.userType}
                  // @ts-ignore
                  onBlur={validateInput}
                  // @ts-ignore
                  onFocus={resetValidation}
                  isInvalid={errorMessages.userType.length > 0}
                >
                  <option disabled value="">
                    choose your job position
                  </option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.userType}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formFileSm">
                <Form.Label className={classNames("d-block", styles.label)}>
                  Upload Profile Picture
                </Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="d-flex gap-1">
                <Form.Check
                  inline
                  required
                  type="checkbox"
                  className="me-0"
                  name="rule"
                  label="I agree with terms and conditions."
                  feedback="You must agree before submitting."
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  feedbackType="invalid"
                  onChange={handleInput}
                  checked={formValues.rule}
                  id="rule"
                  isInvalid={errorMessages.rule.length > 0}
                />
              </Form.Group>
            </Col>
            {errors.length > 0 && (
              <Col xs={12}>
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
              </Col>
            )}
            <Col xs={12}>
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="d-flex gap-2 align-items-center"
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
                Register
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};
export default Register;
