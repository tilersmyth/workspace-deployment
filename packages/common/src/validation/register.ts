import { object, string } from "yup";

export default object().shape({
  first_name: string()
    .required()
    .label("First Name"),
  last_name: string()
    .required()
    .label("Last Name"),
  email: string()
    .required()
    .email(),
  password: string().required(),
});
