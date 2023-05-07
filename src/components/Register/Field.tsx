import { Form } from "react-bootstrap";
import styles from "./Register.module.scss";
import { FocusEvent, FormEvent, HTMLInputTypeAttribute } from "react";
import classNames from "classnames";

interface ChildComponentPropsBase {
  name: string;
  title: string;
  err?: string;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

type GetLiteral<Type extends string | number, Value> = Value extends Type
  ? Type extends Value
    ? never
    : Value
  : never;

type ObtainLiterals<T> = T extends infer R ? GetLiteral<string, R> : never;

interface FormControl extends ChildComponentPropsBase {
  type: Exclude<
    ObtainLiterals<HTMLInputTypeAttribute>,
    "radio" | "checkbox" | "submit" | "button" | "reset" | "hidden"
  >;
  placeholder: string;
  value: string | number;
}

interface FormCheck extends ChildComponentPropsBase {
  type: "radio" | "checkbox";
  options: {
    label: string;
    value: string;
    checked: boolean;
    id: string;
  }[];
}

type ChildComponentProps = FormControl | FormCheck;

const Field = ({
  name,
  title,
  onBlur,
  onChange,
  onFocus,
  err,
  ...otherProps
}: ChildComponentProps) => {
  const isInvalid = err ? err.length > 0 : false;

  const isNotMultiSelect = (props: any): props is FormControl =>
    !["checkbox", "radio"].includes(props.type);

  return (
    <Form.Group controlId={name}>
      <Form.Label className={classNames("d-block", styles.label)}>
        {title}
      </Form.Label>
      {isNotMultiSelect(otherProps) && (
        <Form.Control
          type={otherProps.type}
          placeholder={otherProps.placeholder}
          name={name}
          title={title}
          onInput={onChange}
          value={otherProps.value}
          required
          onBlur={onBlur}
          onFocus={onFocus}
          isInvalid={isInvalid}
          autoComplete="new-password"
        />
      )}
      {(otherProps.type === "radio" || otherProps.type === "checkbox") &&
        otherProps.options.map(({ label, value, id, checked }, index) => (
          <Form.Check
            key={index}
            inline
            label={label}
            type={otherProps.type}
            value={value}
            checked={checked}
            name={name}
            id={id}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            className={classNames({
              "me-0": index === otherProps.options.length - 1,
            })}
          />
        ))}

      <Form.Control.Feedback
        type="invalid"
        className={classNames(styles.errorMessages, {
          "d-block": isInvalid,
        })}
      >
        {err}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
export default Field;
