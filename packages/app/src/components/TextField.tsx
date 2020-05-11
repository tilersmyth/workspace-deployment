import React from "react";
import { FieldProps } from "formik";
import { TextInput, Text, View } from "react-native";

const TextField: React.FunctionComponent<FieldProps> = ({
  form,
  field,
  ...inputProps
}) => {
  const onChange = (text: string) => form.setFieldValue(field.name, text);

  const errMsg = form.touched[field.name] && form.errors[field.name];

  return (
    <View>
      <TextInput value={field.value} onChangeText={onChange} {...inputProps} />
      {errMsg && <Text style={{ color: "red" }}>{errMsg}</Text>}
    </View>
  );
};

export default TextField;
