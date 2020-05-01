import React from "react";
import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import {
  RegisterMutation,
  RegisterMutationVariables,
  RegisterDocument,
} from "../../../apollo/generated";
import { gqlValidationError } from "../../../apollo/utils/gqlValidation";
import TextField from "../../../components/TextField";

const RegisterForm: React.FunctionComponent = () => {
  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setErrors }) => {
        try {
          await register({ variables: { input: values } });
          Router.push("/login");
        } catch (err) {
          const error = gqlValidationError(err);

          if (error) {
            setErrors(error);
          }
        }
      }}
    >
      <Form>
        <TextField label="First Name" name="first_name" type="text" />
        <br />
        <TextField label="Last Name" name="last_name" type="text" />
        <br />
        <TextField label="Email" name="email" type="text" />
        <br />
        <TextField label="Password" name="password" type="password" />
        <br />
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
