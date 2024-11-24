
import { FormikProps } from "formik";
import React from "react";


interface textProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  formik: FormikProps<any>;
}

const TextInput: React.FC<textProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  formik,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-2 font-custom text-sm font-semibold">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="p-3 border border-gray-300 rounded-2xl bg-gray-100 w-full"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
    />

    {formik.touched[name] && typeof formik.errors[name] === "string" && (
      <span className="text-red-500 text-sm">{formik.errors[name]}</span>
    )}
  </div>
);

export default TextInput;
