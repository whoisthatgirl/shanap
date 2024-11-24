import React from "react";
import RestaurantForm from "./RestaurantForm";
import Documents from "./Documents";
import { useTranslation } from "react-i18next";
import "../i18n";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";


const Registration: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("Language", newLang); 
  };
  React.useEffect(() => {
    const savedLang = localStorage.getItem("Language") || "en"; 
    i18n.changeLanguage(savedLang);
  }, [i18n]);



 const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post('https://app.shnp.me/api/Restaurants', values);
      console.log(response.data);
      alert("Registration successful!"); 
    } catch (err: any) {
      console.error("Error:", err.response ? err.response.data : err.message);
      alert("Registration failed. Please try again."); 
    }
  };

  const formik = useFormik({
    initialValues: {
      restaurantNameInEn: "",
      restaurantNameInAr: "",
      email: "",
      bankIban: "",
      password: "",
      confirmPassword: "",
      restaurantType: "",
      commercialRegNum: "",
      operationRepEmail: "",
      operationRepPhone: "",
      managementPhone: "",
      mainBranchNameInAr: "",
      mainBranchNameInEn: "",
      branchDistrict: "",
      branchAddName: "",
      branchStr: "",
      branchBuildingNum: "",
      branchAddDesc: "",
      twitterAcc: "",
      igAcc: "",
      documents: {
        "Signed Contract": [],
        "Tax Certificate": [],
        "Restaurant Image": [],
        "Commercial License": [],
      },
      workingHours: [],
    },
    validationSchema: Yup.object({
      restaurantNameInEn: Yup.string().required(
        t("validation.restaurantNameInEn")
      ),
      restaurantNameInAr: Yup.string().required(
        t("validation.restaurantNameInAr")
      ),
      email: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.emailRequired")),
      bankIban: Yup.string().required(t("validation.bankIbanRequired")),
      password: Yup.string()
        .min(5, t("validation.passwordMin"))
        .required(t("validation.passwordRequired")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], t("validation.passwordsMustMatch"))
        .required(t("validation.confirmPasswordRequired")),
      restaurantType: Yup.string().required(
        t("validation.restaurantTypeRequired")
      ),
      commercialRegNum: Yup.string().required(
        t("validation.commercialRegNumRequired")
      ),
      operationRepEmail: Yup.string()
        .email(t("validation.invalidEmail"))
        .required(t("validation.operationRepEmailRequired")),
      operationRepPhone: Yup.string().required(
        t("validation.operationRepPhoneRequired")
      ),
      managementPhone: Yup.string().required(
        t("validation.managementPhoneRequired")
      ),
      documents: Yup.object().shape({
        "Signed Contract": Yup.array().min(1, "Signed Contract is required"),
        "Tax Certificate": Yup.array().min(1, "Tax Certificate is required"),
        "Restaurant Image": Yup.array().min(1, "Restaurant Image is required"),
        "Commercial License": Yup.array().min(
          1,
          "Commercial License is required"
        ),
      }),
      workingHours: Yup.array()
        .min(1, t("validation.workingHoursRequired"))
        .required(t("validation.workingHoursRequired")),
    }),
    onSubmit: handleSubmit,
  });

  console.log(formik.values, "values");

  return (
    <div className="container p-6 w-full min-w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-custom mb-2">{t("title")}</h1>
        <button
          className=" text-red-500 font-bold py-2 px-6 rounded-lg text-xl hover:rotate-3 transition-transform duration-300"
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "العربية" : "English"}
        </button>
        {/* <button
          className="bg-gradient-to-r from-red-300 to-red-600 text-white font-bold py-1 px-5 rounded-full shadow-md hover:opacity-90 transition-all duration-300"
          onClick={toggleLanguage}
        >
          {i18n.language === "en" ? "العربية" : "English"}
        </button> */}
      </div>

      <div className="grid md:grid-cols-2 gap-7 border border-gray-100 rounded-2xl divide-x divide-gray-200 rtl:divide-x-reverse p-4">
          <RestaurantForm formik={formik} />
          <Documents formik={formik} />    
       
      </div>

      <div className="flex flex-row-reverse hover:shrink-1">
        <button
          type="submit"
          className="relative overflow-hidden bg-red-500 text-white p-3 m-5 rounded-full font-medium font-poppins hover:bg-red-600 transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            const ripple = document.createElement("span");
            ripple.className =
              "absolute block w-20 h-20 bg-white opacity-30 rounded-full animate-ping";
            const rect = e.currentTarget.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - 40}px`;
            ripple.style.top = `${e.clientY - rect.top - 40}px`;
            e.currentTarget.appendChild(ripple);
            setTimeout(() => ripple.remove(), 400);
            formik.handleSubmit();
          }}
        >
          {t("form.createAccount")}
        </button>
      </div>
    </div>
  );
};

export default Registration;

