import * as Yup from "yup";

export const updateUserValidation = Yup.object({
    first_name: Yup.string()
        .trim()
        .min(3, "First Name must be at least 3 characters"),
    last_name: Yup.string()
        .trim()
        .min(3, "Last Name must be at least 3 characters"),
    email: Yup.string()
        .trim()
        .matches(/^\S+@\S+\.\S+$/, "Email cannot contain spaces and must be valid.")
        .required("Email is required"),
    phone_code: Yup.string()
        .optional()
        .trim()
        .matches(/^\+\d{1,4}$/, "Invalid phone code format"),
    phone_number: Yup.string()
        .matches(/^\d{7,15}$/, "Phone number must be between 7 to 15 digits")
        .optional()
        .trim(),
    gender: Yup.string()
        .optional()
        .trim()
        .oneOf(["male", "female", "prefer no to say"], "Invalid gender"),
    country: Yup.string()
        .optional()
        .trim()
        .min(2, "Country name must be at least 2 characters"),
    city: Yup.string()
        .optional()
        .trim()
        .min(2, "City name must be at least 2 characters"),
    dob: Yup.date()
        .optional()
        .max(new Date(), "Date of Birth cannot be in the future"),
    address: Yup.string()
        .optional()
        .trim()
        .min(5, "Address must be at least 5 characters"),
});
