import { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import {
  LoginMutation,
  LoginMutationVariables,
  LoginDocument,
  MeQuery,
  MeDocument,
} from "../../../apollo/generated";
import TextField from "../../../components/TextField";
import { gqlValidationError } from "../../../apollo/utils/gqlValidation";

const LoginForm: React.FunctionComponent = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument
  );

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values) => {
        try {
          setFormError(null);
          await login({
            variables: { input: values },
            async update(cache, { data }) {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: { me: data.login },
              });
              Router.push("/me");
            },
          });
        } catch (err) {
          const error = gqlValidationError(err);
          if (error) {
            setFormError(error.form);
          }
        }
      }}
    >
      <Form>
        <TextField label="Email" name="email" type="text" />
        <br />
        <TextField label="Password" name="password" type="password" />
        <br />
        {formError && <div style={{ color: "red" }}>{formError}</div>}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
