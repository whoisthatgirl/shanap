import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

interface Loginres {
  token: string;
  message?: string;
}

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const { t, i18n } = useTranslation();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

 const toggleLanguage = () => {
   const newLang = i18n.language === "en" ? "ar" : "en";
   i18n.changeLanguage(newLang);
   localStorage.setItem("Language", newLang);
 };


   const navigate = useNavigate();

   const handleForgetPassword = () => {
     navigate("/resetPassword");
  };
    
  const handleSignup = () => {
    navigate("/registration");
  };
    
  

  useEffect(() => {
    const savedLang = localStorage.getItem("Language") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);
  
    useEffect(() => {
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }, [i18n.language]);




  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t("form.Username is required"))
      .min(3, t("form.Username must be at least 3 characters")),
    password: Yup.string()
      .min(5, t("form.Password must be at least 5 characters"))
      .required(t("form.Password is required")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post<Loginres>(
          "https://app.shnp.me/api/restaurantemployees/login",
          {
            username: values.username,
            password: values.password,
          }
        );
        console.log(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response && err.response.data
              ? err.response.data.err
              : t("form.Unexpected error occurred")
          );
        } else {
          setError(t("form.Unexpected error occurred"));
        }
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md rounded-lg shadow-md">
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
            className="w-36 h-36 mb-4"
          />
          <h2 className="text-center font-custom font-bold rtl:text-end text-2xl mb-4">
            {t("form.Log into Restaurant Panel")}
          </h2>
          <p className="text-center font-custom text-xs rtl:text-end text-gray-700">
            {t(
              "form.Please enter your restaurant email address to create an account or to log in"
            )}
          </p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="px-6 mb-4">
            <label htmlFor="username" className="sr-only">
              {t("form.Username")}
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 my-5 ml-10 text-gray-500 rtl:start-auto rtl:end-6 group-focus-within:text-red-600 group-focus-within:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faUser} />
              </span>

           
              <input
                type={type}
                name="username"
                placeholder={t("form.Username")}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-80 flex items-center ml-11 px-4 py-3 pl-10 mb-2 text-sm focus:ring-2 bg-gray-100 ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
            </div>

          
            {formik.touched.username && formik.errors.username && (
              <p className="mt-1 ml-11 text-sm text-red-500">
                {formik.errors.username}
              </p>
            )}
          </div>
          <div className="px-6 mb-4">
            <label htmlFor="password" className="sr-only">
              {t("form.password")}
            </label>
            <div className="relative group">
              {/* Lock Icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 my-5 ml-10 text-gray-500 rtl:start-auto rtl:end-6 group-focus-within:text-red-600 group-focus-within:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faLock} />
              </span>

              <span
                className="absolute inset-y-0 flex items-center pl-2 my-5 ml-80 cursor-pointer text-gray-800 group-focus-within:text-blue-600 transition-transform duration-300"
                onClick={handleToggle}
              >
                <Icon className="absolute" icon={icon} size={17} />
              </span>

              <input
                type={type}
                name="password"
                placeholder={t("form.Password")}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-80 flex items-center ml-11 px-4 py-3 pl-10 mb-2 text-sm focus:ring-2 bg-gray-100 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 ml-11 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="px-6 mb-4 ml-7">
            {t("form.Can't remember your password?")}
            <Link
              to="/resetPassword"
              className="ml-1 mb-3 text-red-500 underline"
              onClick={handleForgetPassword}
            >
              {t("form.Reset Password")}
            </Link>
          </div>
          <div className="px-6">
            <button
              type="submit"
              className="w-72 py-2 mx-auto ml-16 mb-2 text-sm font-bold rounded-full text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-transform duration-150"
            >
              {t("form.Join Shanap")}
            </button>
            <p className="mt-5 mb-5 text-sm text-center text-gray-600">
              {t("form.Don't have an account?")}{" "}
              <Link
                to="/registration"
                className="font-bold text-red-500 hover:underline"
                onClick={handleSignup}
              >
                {t("form.Sign up instead")}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
