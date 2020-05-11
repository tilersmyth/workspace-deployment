import React, { useState } from "react";
import { Formik, Field } from "formik";
import { useMutation } from "@apollo/client";
import { Button, Text, View, AsyncStorage } from "react-native";

import {
  LoginMutation,
  LoginMutationVariables,
  LoginDocument,
  MeQuery,
  MeDocument,
} from "../../../apollo/generated";
import TextField from "../../../components/TextField";
import { COOKIE_NAME } from "../../../utils/expo-env";

interface Props {
  onSuccess: () => void;
}

const LoginForm: React.FunctionComponent<Props> = ({ onSuccess }) => {
  const [formError] = useState<string | null>(null);
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument
  );

  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await login({
              variables: { input: values },
              async update(cache, { data }) {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: { me: data.login.user },
                });

                await AsyncStorage.setItem(COOKIE_NAME, data.login.sessionId);

                onSuccess();
              },
            });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {({ handleSubmit }) => (
          <View style={{ padding: 20 }}>
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

            {formError && <Text style={{ color: "red" }}>{formError}</Text>}
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;
