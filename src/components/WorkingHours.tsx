import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

interface WorkingHour {
  day: string;
  fromTime: string;
  toTime: string;
}

interface WorkingHourProps {
  workingHours: WorkingHour[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const WorkingHours: React.FC<WorkingHourProps> = ({
  workingHours,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const savedLang = localStorage.getItem("Language") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  return (
    <div className="mt-2">
      {workingHours.map((value, index) => (
        <div
          key={index}
          className="p-3 bg-gray-50 border rounded-2xl mb-2 mx-3 shadow-md"
        >
          <div>
            <p>
              <strong>{t("form.day")}:</strong> {value.day}
            </p>
            <p>
              <strong>{t("form.fromTime")}:</strong> {value.fromTime}
            </p>
            <p>
              <strong>{t("form.toTime")}:</strong> {value.toTime}
            </p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => onEdit(index)}>
              <img
                src="src/images/icons8-edit-24.png"
                alt={t("form.edit")}
                className="w-4 h-4"
              />
            </button>
            <button onClick={() => onDelete(index)}>
              <img
                src="src/images/icons8-trash-can-24.png"
                alt={t("form.delete")}
                className="w-4 h-4 text-red-500"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkingHours;
