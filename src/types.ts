// import * as Yup from "yup";
// import { useTranslation } from "react-i18next";

// export const formValue = (onSubmit: any) => {
//   const { t } = useTranslation();

//   return {
//     initialValues: {
//       restaurantNameInEn: "",
//       restaurantNameInAr: "",
//       email: "",
//       bankIban: "",
//       password: "",
//       confirmPassword: "",
//       restaurantType: "",
//       commercialRegNum: "",
//       operationRepEmail: "",
//       operationRepPhone: "",
//       managementPhone: "",
//       mainBranchNameInAr: "",
//       mainBranchNameInEn: "",
//       branchDistrict: "",
//       branchAddName: "",
//       branchStr: "",
//       branchBuildingNum: "",
//       branchAddDesc: "",
//       twitterAcc: "",
//       igAcc: "",
//     },
//     validationSchema: Yup.object({
//       restaurantNameInEn: Yup.string().required(t("Restaurant name in English is required")),
//       email: Yup.string()
//         .email(t("Invalid email address"))
//         .required(t("Email is required")),
//       password: Yup.string()
//         .min(5, t("Password must be at least 5 characters"))
//         .required(t("Password is required")),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref("password"), undefined], t("Passwords must match"))
//         .required(t("Please confirm your password")),
//       restaurantType: Yup.string().required(t("Restaurant type is required")),
//     }),
//     onSubmit,
//   };
// };
