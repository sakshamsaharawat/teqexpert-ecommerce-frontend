import * as Yup from "yup";

export const signupValidation = Yup.object({
    first_name: Yup.string()
        .trim()
        .required("First Name is required")
        .matches(/^\S*$/, "First Name cannot contain spaces.")
        .min(3, "First Name must be at least 3 characters'"),
    last_name: Yup.string()
        .trim()
        .required("Last Name is required")
        .matches(/^\S*$/, "Last Name cannot contain spaces.")
        .min(3, "Last Name must be at least 3 characters'"),
    email: Yup.string()
        .trim()
        .matches(/^\S+@\S+\.\S+$/, "Email cannot contain spaces and must be valid.")
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .required("Password is required")
        .min(4, "Enter a valid password address.")
        .matches(/^\S*$/, "Password cannot contain spaces.")
})