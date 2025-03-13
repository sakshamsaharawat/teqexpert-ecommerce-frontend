import { toast } from "react-toastify";

export const showError = (message: string | string[]) => {
    if (Array.isArray(message)) {
        toast.error(message[0]);
    } else {
        toast.error(message)
    }
}