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

import styles from "./Register.module.scss";
import {
  loginUser,
} from "../../store/states/authentication";
import Routes from "../../Routes/Routes";
import PageHeader from "../PageHeaders/PageHeader";
import { useAppDispatch } from "../../store/hooks";

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

  const handleInput = ({
    currentTarget: { value, name, checked, type },
  }: FormEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  // const handleInputErrors = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if(formValues.firstName === "" || formValues.length < 3){
  //     setErrorMessages()
  //   }
  // }

  const validateInput = ({
    currentTarget: { name },
  }: FocusEvent<HTMLInputElement>): boolean => {
    let isValid = true;

    switch (name) {
      case "firstName":
        if (formValues.firstName.length < 3) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            firstName: "fill the field please.",
          }));
          isValid = false;
        }
        break;
      case "lastName":
        if (formValues.lastName.length < 3) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            lastName: "fill the field please.",
          }));
          isValid = false;
        }
        break;
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
        if (!new RegExp(/(?=.{8,16}$)/).test(formValues.password)) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            password: "Length of password should be between range 8 to 16",
          }));
          isValid = false;
        } else if (!new RegExp(/(?=.*[A-Z])/).test(formValues.password)) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            password: "Password should contains a Capital letter",
          }));
          isValid = false;
        }
        break;
      case "confirmPassword":
        if (formValues.confirmPassword.length === 0) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            confirmPassword: "You need to enter confirm password.",
          }));
          isValid = false;
        } else if (formValues.password !== formValues.confirmPassword) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            confirmPassword: "Passwords do not match, Please try again.",
          }));
          isValid = false;
        }
        break;
      case "gender":
        if (!formValues.gender) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            gender: "Please select your gender.",
          }));
          isValid = false;
        }
        break;
      case "hobbies":
        if (formValues.hobbies.length === 0) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            hobbies: "Please select your hobbies.",
          }));
          isValid = false;
        }
        break;
      case "userType":
        if (formValues.userType === "") {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            userType: "Please select your userType.",
          }));
          isValid = false;
        }
        break;
      case "rule":
        if (!formValues.rule) {
          setErrorMessages((currentErrors) => ({
            ...currentErrors,
            rule: "You must agree before submitting..",
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
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

    axios
      .post("https://api.escuelajs.co/api/v1/users/", {
        name: formValues.firstName + " " + formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        avatar: "https://i.pravatar.cc/100",
      })
      .then(() => dispatch(loginUser(formValues.email, formValues.password)))
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
    <Container className="mb-4">
      <div className="w-lg-50 mx-auto">
        <PageHeader>Create Account</PageHeader>
        <Form onSubmit={handleFormSubmit} noValidate>
          <Row className="gx-3 gy-4">
            <Col lg={6}>
              <Form.Group controlId="firstName">
                <Form.Label className={styles.label}>First name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your firstname..."
                  name="firstName"
                  onInput={handleInput}
                  value={formValues.firstName}
                  required
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  isInvalid={errorMessages.firstName.length > 0}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="lastName">
                <Form.Label className={styles.label}>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your lastname..."
                  name="lastName"
                  onInput={handleInput}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  value={formValues.lastName}
                  required
                  isInvalid={errorMessages.lastName.length > 0}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group controlId="email">
                <Form.Label className={styles.label}>Email*</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email..."
                  name="email"
                  onInput={handleInput}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  value={formValues.email}
                  required
                  isInvalid={errorMessages.email.length > 0}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="password">
                <Form.Label className={styles.label}>Password*</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  onInput={handleInput}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  value={formValues.password}
                  required
                  isInvalid={errorMessages.password.length > 0}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label className={styles.label}>
                  Confirm Password*
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password again..."
                  name="confirmPassword"
                  onInput={handleInput}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  value={formValues.confirmPassword}
                  required
                  isInvalid={errorMessages.confirmPassword.length > 0}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={styles.errorMessages}
                >
                  {errorMessages.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="gender">
                <Form.Label className={classNames("d-block", styles.label)}>
                  Gender*
                </Form.Label>
                <Form.Check
                  inline
                  label="Male"
                  type="radio"
                  value="male"
                  checked={formValues.gender === "male"}
                  name="gender"
                  id="male"
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  onChange={handleInput}
                />
                <Form.Check
                  inline
                  label="Female"
                  type="radio"
                  value="female"
                  checked={formValues.gender === "female"}
                  name="gender"
                  id="female"
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  onChange={handleInput}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames(styles.errorMessages, {
                    "d-block": errorMessages.gender.length > 0,
                  })}
                >
                  {errorMessages.gender}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group>
                <Form.Label className={classNames("d-block", styles.label)}>
                  Hobbies
                </Form.Label>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Music"
                  name="hobbies"
                  id="music"
                  checked={formValues.hobbies.includes("music")}
                  value="music"
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  onChange={handleMultiSelectCheckboxChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Sports"
                  name="hobbies"
                  id="sports"
                  checked={formValues.hobbies.includes("sports")}
                  value="sports"
                  onChange={handleMultiSelectCheckboxChange}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Travel"
                  name="hobbies"
                  id="travel"
                  checked={formValues.hobbies.includes("travel")}
                  value="travel"
                  onChange={handleMultiSelectCheckboxChange}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Movie"
                  name="hobbies"
                  id="movie"
                  checked={formValues.hobbies.includes("movie")}
                  value="movie"
                  onChange={handleMultiSelectCheckboxChange}
                  onBlur={validateInput}
                  onFocus={resetValidation}
                  className="mx-0"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames(styles.errorMessages, {
                    "d-block": errorMessages.hobbies.length > 0,
                  })}
                >
                  {errorMessages.hobbies}
                </Form.Control.Feedback>
              </Form.Group>
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
