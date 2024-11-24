import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/registration");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("Language", newLang);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md rounded-sm shadow-md">
        <button
          className=" text-red-500  font-bold font-poppins  py-2 px-6 rounded-lg  hover:rotate-3 transition-transform duration-300"
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

          <h2 className="text-center font-poppins  font-bold rtl:text-end text-xl mb-3">
            {t("Welcome to Your Restaurant Hub")}
          </h2>
          <p className="text-center text-sm font-poppins text-rtl:text-end text-gray-700 ">
            <Trans>
              Where all your restaurant{" "}
              <span className="font-bold text-red-500  bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text animate-pulse">
                magic
              </span>{" "}
              <br />
              happens
            </Trans>

            <br />
            {t("Ready to start?")}
          </p>
        </div>

        <button
          onClick={handleGetStarted}
          className="w-64 py-2 mx-auto flex justify-center mb-2 bg-gradient-to-r bg-customred  text-black font-poppins rounded-2xl text-sm font-semibold hover:from-red-500 hover:to-red-700   transition duration-300 transform"
        >
          {t("Get Started")}
        </button>

        <p className=" mt-3 mb-9 flex justify-center text-sm font-poppins  text-black font-medium">
          <button onClick={handleLoginRedirect}>
            {t("I already have an account")}{" "}
          </button>
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
