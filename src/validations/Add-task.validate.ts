import * as Yup from "yup";

const AddProductValidation = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/, "Title cannot have consecutive spaces.")
        .min(3, "Title must be at least 3 characters"),

    description: Yup.string()
        .required("Description is required")
        .matches(/^(?!.*\s{2,})[A-Za-z0-9.,'-]+(?: [A-Za-z0-9.,'-]+)*$/, "Description cannot have consecutive spaces."),

    image_url: Yup.string().optional(),
    price: Yup.number().positive("Price must be positive number").required("Price is required")
});

export default AddProductValidation;