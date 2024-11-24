import React from "react";
import TextInput from "./TextInput";
import { FormikProps } from "formik";

interface formField {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
}
interface FormFieldProps {
  formFields: formField[];
  formik: FormikProps<any>;
}

const FormFields: React.FC<FormFieldProps> = ({ formFields = [], formik }) => (
  <>
    {formFields.map((field) => (
      <TextInput
        key={field.name}
        label={field.label}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        formik={formik}
      />
    ))}
  </>
);

export default FormFields;
