import { useTranslation } from "react-i18next";
import WorkingHours from "./WorkingHours";
import WorkingHoursModal from "./WorkingHoursModal";
import FormFields from "./FormFields";
import i18n from "../i18n";
import { useEffect, useState } from "react";

interface WorkingHour {
  day: string;
  fromTime: string;
  toTime: string;
}

export interface formValues {
  restaurantNameInEn: string;
  restaurantNameInAr: string;
  email: string;
  bankIban: string;
  password: string;
  confirmPassword: string;
  restaurantType: string;
  commercialRegNum: string;
  operationRepEmail: string;
  operationRepPhone: string;
  managementPhone: string;
  mainBranchNameInAr: string;
  mainBranchNameInEn: string;
  branchDistrict: string;
  branchAddName: string;
  branchStr: string;
  branchBuildingNum: string;
  branchAddDesc: string;
  twitterAcc: string;
  igAcc: string;
  documents: {
    "Signed Contract": { file: File; base64: string }[];
    "Tax Certificate": { file: File; base64: string }[];
    "Restaurant Image": { file: File; base64: string }[];
    "Commercial License": { file: File; base64: string }[];
  };
}

type RestaurantFormProps = {
  formik: any;
};

const RestaurantForm: React.FC<RestaurantFormProps> = ({ formik }) => {
  const { t, i18n } = useTranslation();
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [day, setDay] = useState<string>(t("form.sunday"));
  const [fromTime, setFromTime] = useState<string>("12:00");
  const [toTime, setToTime] = useState<string>("12:30");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setError("");
  };

  const addWorkingHour = () => {
    const fromHour = parseInt(fromTime.split(":")[0]);
    const fromMinutes = parseInt(fromTime.split(":")[1]);
    const toHour = parseInt(toTime.split(":")[0]);
    const toMinutes = parseInt(toTime.split(":")[1]);

    if (
      toHour < fromHour ||
      (toHour === fromHour && toMinutes <= fromMinutes)
    ) {
      const firstShift: WorkingHour = { day, fromTime, toTime: "23:59" };
      const secondShift: WorkingHour = {
        day: getNextDay(day),
        fromTime: "00:00",
        toTime,
      };

      if (editIndex !== null) {
        const updatedHours = [...workingHours];
        updatedHours[editIndex] = firstShift;
        updatedHours.splice(editIndex + 1, 0, secondShift);
        setWorkingHours(updatedHours);
        formik.setFieldValue("workingHours", updatedHours);
        setEditIndex(null);
      } else {
        const updatedHours = [...workingHours, firstShift, secondShift];
        setWorkingHours(updatedHours);
        formik.setFieldValue("workingHours", updatedHours);
      }

      toggleModal();
      return;
    }
    const newHour: WorkingHour = { day, fromTime, toTime };

    const duplicate = workingHours.some(
      (hour) =>
        hour.day === newHour.day &&
        hour.fromTime === newHour.fromTime &&
        hour.toTime === newHour.toTime
    );

    if (duplicate) {
      setError("duplicate");
      return;
    }

    if (editIndex !== null) {
      const updatedHours = [...workingHours];
      updatedHours[editIndex] = newHour;
      setWorkingHours(updatedHours);
      formik.setFieldValue("workingHours", updatedHours);
      setEditIndex(null);
    } else {
      const updatedHours = [...workingHours, newHour];
      setWorkingHours(updatedHours);
      formik.setFieldValue("workingHours", updatedHours);
    }

    toggleModal();
  };

  const getNextDay = (currentDay: string): string => {
    const daysOfWeek = [
      t("form.sunday"),
      t("form.monday"),
      t("form.tuesday"),
      t("form.wednesday"),
      t("form.thursday"),
      t("form.friday"),
      t("form.saturday"),
    ];
    const currentIndex = daysOfWeek.indexOf(currentDay);
    const nextIndex = (currentIndex + 1) % 7;
    return daysOfWeek[nextIndex];
  };

  const handleEdit = (index: number) => {
    const hourToEdit = workingHours[index];
    setDay(hourToEdit.day);
    setFromTime(hourToEdit.fromTime);
    setToTime(hourToEdit.toTime);
    setEditIndex(index);
    setIsOpen(true);
  };

  const handleDelete = (index: number) => {
    setWorkingHours(workingHours.filter((_, i) => i !== index));
    formik.setFieldValue(
      "workingHours",
      workingHours.filter((_, i) => i !== index)
    );
  };

  const formFields = [
    {
      name: "restaurantNameInEn",
      label: t("form.restaurantNameInEn"),
      placeholder: t("form.restaurantNameInEnPlaceholder"),
    },
    {
      name: "restaurantNameInAr",
      label: t("form.restaurantNameInAr"),
      placeholder: t("form.restaurantNameInArPlaceholder"),
    },
    {
      name: "email",
      label: t("form.email"),
      placeholder: t("form.emailPlaceholder"),
      type: "email",
    },
    {
      name: "bankIban",
      label: t("form.bankIban"),
      placeholder: t("form.bankIbanPlaceholder"),
    },
    {
      name: "password",
      label: t("form.password"),
      placeholder: t("form.passwordPlaceholder"),
      type: "password",
    },
    {
      name: "confirmPassword",
      label: t("form.confirmPassword"),
      placeholder: t("form.confirmPasswordPlaceholder"),
      type: "password",
    },
    {
      name: "restaurantType",
      label: t("form.restaurantType"),
      placeholder: t("form.restaurantTypePlaceholder"),
    },
    {
      name: "commercialRegNum",
      label: t("form.commercialRegNum"),
      placeholder: t("form.commercialRegNumPlaceholder"),
    },
    {
      name: "operationRepEmail",
      label: t("form.operationRepEmail"),
      placeholder: t("form.operationRepEmailPlaceholder"),
      type: "email",
    },
    {
      name: "operationRepPhone",
      label: t("form.operationRepPhone"),
      placeholder: t("form.operationRepPhonePlaceholder"),
    },
    {
      name: "managementPhone",
      label: t("form.managementPhone"),
      placeholder: t("form.managementPhonePlaceholder"),
    },
    {
      name: "mainBranchNameInAr",
      label: t("form.mainBranchNameInAr"),
      placeholder: t("form.mainBranchNameInArPlaceholder"),
    },
    {
      name: "mainBranchNameInEn",
      label: t("form.mainBranchNameInEn"),
      placeholder: t("form.mainBranchNameInEnPlaceholder"),
    },
    {
      name: "branchDistrict",
      label: t("form.branchDistrict"),
      placeholder: t("form.branchDistrictPlaceholder"),
    },
    {
      name: "branchAddName",
      label: t("form.branchAddName"),
      placeholder: t("form.branchAddNamePlaceholder"),
    },
    {
      name: "branchStr",
      label: t("form.branchStr"),
      placeholder: t("form.branchStrPlaceholder"),
    },
    {
      name: "branchBuildingNum",
      label: t("form.branchBuildingNum"),
      placeholder: t("form.branchBuildingNumPlaceholder"),
    },
    {
      name: "branchAddDesc",
      label: t("form.branchAddDesc"),
      placeholder: t("form.branchAddDescPlaceholder"),
    },
    {
      name: "twitterAcc",
      label: t("form.twitterAcc"),
      placeholder: t("form.twitterAccPlaceholder"),
    },
    {
      name: "igAcc",
      label: t("form.igAcc"),
      placeholder: t("form.igAccPlaceholder"),
    },
  ];

  return (
    <div className="p-4 rounded-lg">
      <div className="flex items-center m-2">
        <img src="src/images/1-logo.svg" alt="logo" className="mr-2" />
        <h2 className="text-xl font-custom">{t("fillOutRestaurantForm")}</h2>
      </div>

      <p className="mb-2 text-gray-500 text-sm font-custom">
        {t("fillOutPersonalInfo")}
      </p>

      <form
        onSubmit={formik.handleSubmit}
        className="grid gap-6 md:grid-cols-2"
      >
        <FormFields formFields={formFields} formik={formik} />
        <WorkingHours
          workingHours={workingHours}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="flex items-center space-x-2">
          <label className="text-sm font-custom">
            {t("form.workingHours")}:
          </label>
          {formik.errors.workingHours && formik.touched.workingHours && (
            <span className="text-red-500 text-xs">
              {formik.errors.workingHours}
            </span>
          )}
          <button
            type="button"
            className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={toggleModal}
          >
            <img
              src="src/images/icons8-add-30.png"
              alt="addHours"
              className="w-4 h-4"
            />
          </button>
        </div>
      </form>

      <WorkingHoursModal
        isOpen={isOpen}
        day={day}
        fromTime={fromTime}
        toTime={toTime}
        onClose={() => {
          toggleModal();
          setEditIndex(null);
        }}
        onDayChange={(e: any) => setDay(e.target.value)}
        onFromTimeChange={(e) => setFromTime(e.target.value)}
        onToTimeChange={(e) => setToTime(e.target.value)}
        onAdd={addWorkingHour}
        isEditing={editIndex !== null}
      />
    </div>
  );
};

export default RestaurantForm;
