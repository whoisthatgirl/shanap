import { useFormik } from "formik";
import  { useEffect, useState } from "react";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useTranslation } from "react-i18next";



const RestPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();

   const toggleLanguage = () => {
     const newLang = i18n.language === "en" ? "ar" : "en";
     i18n.changeLanguage(newLang);
     localStorage.setItem("Language", newLang);
   };

 
  
 useEffect(() => {
    const savedLang = localStorage.getItem("Language") || "en";
    i18n.changeLanguage(savedLang);
 }, [i18n]);
 


  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("form.Invalid email address"))
      .required(t("form.Email is required")),
  });
  const formik = useFormik({
    initialValues: {
      email: " ",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          "https://app.shnp.me/api/restaurantemployees/resetPassword",
          {
            userName: values.email,
          }
        );
        console.log(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setEmail(
            err.response && err.response.data
              ? err.response.data.err
              : "unexpected error"
          );
        } else {
          setError("unexpected error");
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className=" w-full max-w-md rounded-2xl shadow-md">
        <button
          className=" text-red-500 font-bold text-base py-2 px-6 rounded-lg  hover:rotate-3 transition-transform duration-300"
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "العربية" : "English"}
        </button>
        <div className="flex flex-col items-center mb-5">
          <img
            src="src\images\shanaplogo.svg"
            alt="shanab-logo"
            className="w-32 h-32"
          ></img>
          <h2 className=" text-center font-custom font-bold text-2xl mb-4">
            {t("form.Reset Your Password")}
          </h2>
          <p className="text-center font-custom text-xs text-gray-800">
            {t("form.Enter your email, please.")}{" "}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="px-6 mb-4">
            <label htmlFor="email" className="sr-only  ">
              {t("form.Email")}
            </label>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 my-5 ml-20  text-gray-500 rtl:start-auto rtl:end-4 hover:text-red-600 transform hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon icon={faUser} />
            </span>
          </div>
          <input
            type="email"
            name="email"
            placeholder={t("form.Email")}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-72 flex item-center ml-20 px-4 py-3 pl-10 mb-5 text-sm focus:ring-2 bg-slate-200 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-500"
            }`}
          ></input>
          <div className="px-6 ">
            <button
              type="submit"
              className=" w-32 py-4 ml-36 mb-5 text-sm font-bold rounded-3xl  text-white bg-red-600  hover:bg-red-500 active:scale-95 transition-transform duration-150"
            >
              {t("form.Send Email")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestPassword;
