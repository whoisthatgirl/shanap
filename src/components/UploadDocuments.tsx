import React, { useCallback } from "react";
import { FormikProps } from "formik";
import DropFile from "./Drop";

interface UploadDocumentsProps {
  label: string;
  name: string;
  formik: FormikProps<any>;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({
  label,
  name,
  formik,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const addedFiles = [...(formik.values[name] || []), ...acceptedFiles];
      formik.setFieldValue(name, addedFiles);
    },
    [formik, name]
  );

  return (
    <DropFile onDrop={onDrop}>
      {formik.values[name]?.length ? (
        <div className="flex flex-col items-center">
          {formik.values[name].map((file: File, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between space-x-2 relative z-0"
            >
              <p className="text-sm font-custom text-red-500">{file.name}</p>
              <button
                className="w-5 h-5 absolute z-10 right-[-25px] flex items-center justify-center rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedFiles = formik.values[name].filter(
                    (_: any, i: any) => i !== index
                  );
                  formik.setFieldValue(name, updatedFiles);
                }}
              >
                <img
                  src="src/images/icons8-delete-48.png"
                  className="w-4 h-4"
                  alt="Delete"
                />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-950 text-center">
          {`Click or drag to upload ${label}`}
        </p>
      )}
    </DropFile>
  );
};

export default UploadDocuments;
