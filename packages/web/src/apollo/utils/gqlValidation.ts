import { GraphQLError } from "graphql";

interface ValidationError extends Error {
  graphQLErrors: GraphQLError[];
}

type Validation = { [key: string]: string } | null;

export const gqlValidationError = (errors: ValidationError): Validation => {
  const gqlErrors = errors.graphQLErrors[0];

  if (!gqlErrors || !gqlErrors.extensions) {
    return null;
  }

  return gqlErrors.extensions.exception;
};
