import * as React from "react";
import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  type: string;
}

const TextField: React.FunctionComponent<Props> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div style={{ color: "red" }}>{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextField;
