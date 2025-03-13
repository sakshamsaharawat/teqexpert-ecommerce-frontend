import { UserUpdateData } from "./updateUser.interface";

export type UserInitialState = {
    user: UserUpdateData | null
    jwt: string | null;
    isLoading: boolean;
    error: string | null;
};