import { Button, Col, Container, Form, Row } from "react-bootstrap";
import PageHeader from "../PageHeaders/PageHeader";
import styles from "./Register.module.scss";
import classNames from "classnames";
import { FormEvent, useState } from "react";
import axios from "axios";

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

  const [errors, setErrors] = useState<string[]>([]);

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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("https://api.escuelajs.co/api/v1/users/", {
        name: formValues.firstName + formValues.lastName,
        email: formValues.email,
        password: formValues.password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
      })
      .then((response) => console.log(response))
      .catch((err) => {
        const errMessages = err.response.data.message;
        setErrors(errMessages);
      });
  };

  return (
    <Container>
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
                />
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
                  value={formValues.lastName}
                />
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
                  value={formValues.email}
                />
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
                  value={formValues.password}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="confirmPassword">
                <Form.Label className={styles.label}>
                  Confirm Password*
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password agin..."
                  name="confirmPassword"
                  onInput={handleInput}
                  value={formValues.confirmPassword}
                />
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
                  onChange={handleInput}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group>
                <Form.Label className={classNames("d-block", styles.label)}>
                  Hobbies
                </Form.Label>
                <div className="d-flex">
                  <Form.Check
                    inline
                    type="checkbox"
                    label="Music"
                    name="hobbies"
                    id="music"
                    checked={formValues.hobbies.includes("music")}
                    value="music"
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
                  />
                </div>
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
                >
                  <option disabled value="">
                    choose your job position
                  </option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
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
                  type="checkbox"
                  className="me-0"
                  name="rule"
                  label="I agree with terms and conditions."
                  onChange={handleInput}
                  id="rule"
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Col>
            {errors.length > 0 && (
              <Col xs={12}>
                <ul>
                  {errors.map((error , index) => (
                    <li className="text-danger" key={index}>{error}</li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Container>
  );
};
export default Register;
