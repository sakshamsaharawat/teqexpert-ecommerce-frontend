import * as Yup from "yup";

export const loginValidation = Yup.object({
    email: Yup.string()
        .trim()
        .matches(/^\S+@\S+\.\S+$/, "Email cannot contain spaces and must be valid.")
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .required("Password is required.")
        .min(4, "Enter a valid password address.")
        .matches(/^\S*$/, "Password cannot contain spaces.")
})