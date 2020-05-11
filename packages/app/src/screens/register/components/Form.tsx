import React from "react";
import { Formik, Field } from "formik";
import { useMutation } from "@apollo/client";
import { Button, View } from "react-native";

import {
  RegisterMutation,
  RegisterMutationVariables,
  RegisterDocument,
} from "../../../apollo/generated";
import TextField from "../../../components/TextField";

interface Props {
  onSuccess: () => void;
}

const RegisterForm: React.FunctionComponent<Props> = ({ onSuccess }) => {
  const [register] = useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );

  return (
    <View>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await register({
              variables: { input: values },
            });

            onSuccess();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleSubmit }) => (
          <View style={{ padding: 20 }}>
            <Field
              name="first_name"
              placeholder="First Name"
              component={TextField}
              style={{ marginBottom: 30 }}
            />

            <Field
              name="last_name"
              placeholder="Last Name"
              component={TextField}
              style={{ marginBottom: 30 }}
            />

            <Field
              name="email"
              placeholder="E-mail"
              autoCapitalize="none"
              component={TextField}
              style={{ marginBottom: 30 }}
            />

            <Field
              name="password"
              placeholder="Password"
              secureTextEntry
              component={TextField}
              style={{ marginBottom: 20 }}
            />

            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegisterForm;
