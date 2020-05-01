import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import Router from "next/router";
import { GraphQLError } from "graphql";

import {
  ApolloMockedProvider,
  ApolloErrorProvider,
} from "../../../test-utils/providers";
import LoginForm from "./Form";

const mockedRouter: any = { push: () => {}, prefetch: () => {} };

afterEach(cleanup);

describe("Register Form", () => {
  it("Email already in use", async () => {
    const graphQLErrors = {
      ...new GraphQLError("validation"),
      extensions: {
        exception: {
          email: "test@user.com is associated with existing account",
        },
      },
    };

    const { getByTestId, getByText } = render(
      <ApolloErrorProvider graphQLErrors={[graphQLErrors]}>
        <LoginForm />
      </ApolloErrorProvider>
    );

    const submitButton = getByTestId("submit-button");

    // mock Next Router as it fails with Jest
    Router.router = mockedRouter;
    fireEvent.click(submitButton);

    await waitFor(() => {
      getByText("test@user.com is associated with existing account");
    });
  });

  test("Successful Registration", async () => {
    const { getByTestId } = render(
      <ApolloMockedProvider
        customResolvers={{
          Mutation: () => ({
            id: 1,
            first_name: "bob",
            last_name: "smith",
            email: "bob@test.com",
          }),
        }}
      >
        <LoginForm />
      </ApolloMockedProvider>
    );

    const submitButton = getByTestId("submit-button");

    // mock Next Router as it fails with Jest
    Router.router = mockedRouter;
    fireEvent.click(submitButton);

    const spy = jest.spyOn(mockedRouter, "push");

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith("/login");
    });
  });
});
