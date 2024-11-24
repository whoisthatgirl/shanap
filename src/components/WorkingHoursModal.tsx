import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface WorkingHoursModalProps {
  isOpen: boolean;
  day: string;
  fromTime: string;
  toTime: string;
  onClose: () => void;
  onAdd: () => void;
  isEditing: boolean;
  onDayChange: (event: any) => void;
  onFromTimeChange: (event: any) => void;
  onToTimeChange: (event: any) => void;
}

const WorkingHoursModal: React.FC<WorkingHoursModalProps> = ({
  isOpen,
  day,
  fromTime,
  toTime,
  onClose,
  onDayChange,
  onFromTimeChange,
  onToTimeChange,
  onAdd,
  isEditing,
  
}) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const savedLang = localStorage.getItem("Language") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 w-full sm:w-[400px] md:w-[500px] lg:w-[670px] shadow-xl border-2 border-gray-500 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-xl text-red-500">
            {isEditing
              ? t("form.editWorkingDetails")
              : t("form.addWorkingDetails")}
          </h1>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-red-500 hover:bg-red-200"
          >
            <img
              src="src/images/icons8-macos-close-30.png"
              alt={t("form.close")}
            />
          </button>
        </div>
        <p className="text-black mb-4 font-normal text-sm border-r-4 border-red-500 pl-3">
          {t("form.shiftInstructions")}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 ml-5">
          <label className="mb-2 sm:mb-0">{t("form.day")}:</label>
          <select
            className="border border-gray-300 rounded-md p-2 mb-2 sm:mb-0"
            value={day}
            onChange={onDayChange}
          >
            {[
              "sunday",
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
            ].map((dayKey) => (
              <option key={dayKey} value={t(`form.${dayKey}`)}>
                {t(`form.${dayKey}`)}
              </option>
            ))}
          </select>
          <label className="mb-2 sm:mb-0">{t("form.from")}:</label>
          <input
            type="time"
            value={fromTime}
            onChange={onFromTimeChange}
            className="border border-gray-300 p-2 rounded-md mb-2 sm:mb-0"
          />
          <label className="mb-2 sm:mb-0">{t("form.to")}:</label>
          <input
            type="time"
            value={toTime}
            onChange={onToTimeChange}
            className="border border-gray-300 p-2 rounded-md mb-2 sm:mb-0"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className="px-8 py-2 font-medium border-2 border-red-500 text-red-500 rounded-full hover:bg-red-100"
            onClick={onClose}
          >
            {t("form.cancel")}
          </button>
          <button
            className="px-10 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 font-medium"
            onClick={onAdd}
          >
            {isEditing ? t("form.edit") : t("form.add")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursModal;
