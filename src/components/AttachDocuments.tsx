import React from "react";
import { Formik, Form } from "formik";
import Dropzone from "react-dropzone";

type FormValues = {
  contract: File[];
  taxCertificate: File[];
  restaurantImage: File[];
  commercialLicense: File[];
};

const FileUploadSection: React.FC = () => {
  const initialValues: FormValues = {
    contract: [],
    taxCertificate: [],
    restaurantImage: [],
    commercialLicense: [],
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <Form className="p-4 rounded-lg ">
          <div className="flex items-center m-2 mb-6">
            <img src="src/images/2-logo.svg" alt="num2" className="mr-2" />
            <h2 className="text-xl font-bold">Attach Required Documents</h2>
          </div>

          <p className="mb-4 text-black text-base">
            Please download the contract, read it thoroughly, sign it, and
            upload it along with the following:
          </p>

          <div className="grid gap-4">
            {(
              [
                { name: "contract", label: "Contract" },
                { name: "taxCertificate", label: "Tax Certificate" },
                { name: "restaurantImage", label: "Restaurant Image" },
                { name: "commercialLicense", label: "Commercial License" },
              ] as const
            ).map(({ name, label }) => (
              <div key={name}>
                <label className="block font-normal text-base text-black mb-2 ml-4">
                  {label}
                </label>
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    formik.setFieldValue(name, [
                      ...formik.values[name],
                      ...acceptedFiles,
                    ]);
                  }}
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                    "application/pdf": [],
                  }}
                  maxSize={15 * 1024 * 1024}
                  maxFiles={5}
                >
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                      {...getRootProps({
                        className:
                          `border-2 border-dashed h-4/5 p-4 m-4 text-center rounded-lg cursor-pointer" ` +
                          (isDragActive
                            ? "border-red-500"
                            : "border-gray-100 hover:border-gray-300"),
                      })}
                    >
                      <input {...getInputProps({ multiple: true })} />
                      {formik.values[name].length > 0 ? (
                        <div className="flex flex-col">
                          <h2 className="font-normal text-base mb-2">
                            Uploaded Files for{" "}
                            <span className="text-red-500">
                              {label.toUpperCase()}
                            </span>
                            :
                          </h2>
                          {formik.values[name].map(
                            (file: File, index: number) => (
                              <div
                                key={index}
                                className="flex justify-center items-center  "
                              >
                                <p className="text-sm">{file.name}</p>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    const updatedFiles = formik.values[
                                      name
                                    ].filter((_, i) => i !== index);
                                    formik.setFieldValue(name, updatedFiles);
                                    e.stopPropagation();
                                  }}
                                >
                                  <img
                                    src="src/images/icons8-trash-can-24.png"
                                    className="w-4 h-4 ml-2"
                                    alt="Delete"
                                  />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <img
                            src="src\images\undraw_add_files.svg"
                            alt="upload"
                            className=" w-14 h-15 transition delay-700  "
                          />
                          <p className="font-normal text-gray-800">
                            Drag & Drop
                          </p>
                          <p className="text-gray-600">
                            your {label.toLowerCase()} here or browse to upload
                          </p>
                          <p className="text-sm text-blue-700">
                            only JPEG, PNG, and PDF with max size of 15 MB
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-red-500 text-white p-3 rounded-full font-medium"
            >
              Create Account
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FileUploadSection;



