import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import Modal from "react-modal";
import { toBase64 } from "../toBase64";
import { useTranslation } from "react-i18next";

interface DocumentsProps {
  formik: any;
}

const Documents: React.FC<DocumentsProps> = ({ formik }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const requiredDocuments = [
    { key: "Signed Contract", label: "signedContract" },
    { key: "Tax Certificate", label: "taxCertificate" },
    { key: "Restaurant Image", label: "restaurantImage" },
    { key: "Commercial License", label: "commercialLicense" },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveFiles = () => {
    const newErrors: { [key: string]: string } = {};

    requiredDocuments.forEach((doc) => {
      if (
        !formik.values.documents[doc.key] ||
        formik.values.documents[doc.key].length === 0
      ) {
        newErrors[doc.key] = t("documents.errors.required", {
          doc: t(`documents.${doc.label}`),
        });
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(false);
      alert(t("documents.success"));
    }
  };

  const handleFileDelete = (docKey: string, index: number) => {
    const updatedFiles = formik.values.documents[docKey].filter(
      (_: any, i: number) => i !== index
    );
    formik.setFieldValue(`documents.${docKey}`, updatedFiles);
  };

  return (
    <>
      <div className="p-4 rounded-lg">
        <div className="flex items-center m-2 mb-9">
          <img src="src/images/2-logo.svg" alt="num2" className="mr-2" />
          <h2 className="text-xl font-poppins">{t("documents.title")}</h2>
        </div>
        <p className="text-black font-poppins text-base ml-4 mb-6">
          {t("documents.description")}
        </p>
        <ul className="list-disc list-inside grid grid-cols-2 text-gray-800 font-poppins mb-16 ml-6">
          {requiredDocuments.map((doc, idx) => (
            <li key={idx}>{t(`documents.${doc.label}`)}</li>
          ))}
        </ul>

        <div className="cursor-pointer mb-3" onClick={handleOpenModal}>
          <div className="border-2 border-dashed border-gray-300 p-9 m-6 rounded-xl text-center hover:border-gray-500 transition-all duration-300">
            <img
              src="src/images/Uploading 4.png"
              alt={t("documents.uploadAlt")}
              className="w-32 h-32 mx-auto animate-pulse"
            />
            <p className="font-normal font-poppins mr-5 text-gray-800">
              {t("documents.clickTo")}
            </p>
            <p className="text-gray-600 font-poppins">
              {t("documents.browseFiles")}
            </p>
            <p className="text-sm font-poppins text-blue-700">
              {t("documents.fileRestrictions")}
            </p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        className="bg-white p-6 w-[90vw] max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border-2 border-gray-500"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <h2 className="text-center font-semibold font-poppins mb-4">
          {t("documents.modalTitle")}
        </h2>

        {requiredDocuments.map((doc, idx) => (
          <div key={idx} className="mb-4">
            <p className="mb-2 text-base font-poppins font-normal">
              {t(`documents.${doc.label}`)}
            </p>

            <Dropzone
              onDrop={async (acceptedFiles) => {
                const newFiles = await Promise.all(
                  acceptedFiles.map(async (file) => ({
                    file,
                    base64: await toBase64(file),
                  }))
                );

                const updatedFiles = [
                  ...(formik.values.documents[doc.key] || []),
                  ...newFiles,
                ];
                formik.setFieldValue(`documents.${doc.key}`, updatedFiles);
              }}
              accept={{
                "image/png": [".png"],
                "image/jpeg": [".jpeg", ".jpg"],
                "application/pdf": [".pdf"],
              }}
              maxSize={15 * 1024 * 1024}
              maxFiles={4}
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div
                  {...getRootProps({
                    className: `border-2 border-dashed p-5 m-4 rounded-2xl text-center cursor-pointer ${
                      isDragActive ? "border-red-500" : "border-gray-100"
                    }`,
                  })}
                >
                  <input {...getInputProps()} />
                  <p>
                    {formik.values.documents[doc.key]?.length
                      ? t("documents.uploadedFiles", {
                          count: formik.values.documents[doc.key]?.length,
                        })
                      : t("documents.clickToUpload", {
                          doc: t(`documents.${doc.label}`),
                        })}
                    {formik.touched.documents?.[doc.key] &&
                      formik.errors.documents?.[doc.key] && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.documents[doc.key]}
                        </div>
                      )}
                  </p>

                  {errors[doc.key] && (
                    <p className="text-red-500 font-poppins text-sm mt-1">
                      {errors[doc.key]}
                    </p>
                  )}
                  {formik.errors.documents?.[doc.key] && (
                    <p className="text-red-500 font-poppins text-sm mt-1"></p>
                  )}
                </div>
              )}
            </Dropzone>

            {formik.values.documents[doc.key]?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center mt-2"
                >
                  <p className="text-sm font-poppins">{item.file.name}</p>
                  <button
                    type="button"
                    onClick={() => handleFileDelete(doc.key, index)}
                  >
                    <img
                      src="src/images/icons8-trash-can-24.png"
                      className="w-4 h-4 ml-2 cursor-pointer"
                      alt={t("documents.delete")}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCloseModal}
            className="bg-gray-400 hover:bg-gray-600 text-white font-poppins text-base p-2 rounded-full mr-2"
          >
            {t("documents.cancel")}
          </button>
          <button
            type="button"
            onClick={handleSaveFiles}
            className="bg-red-500 text-white font-poppins text-base p-2 hover:bg-red-600 rounded-full"
          >
            {t("documents.saveFiles")}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Documents;
