export interface UserUpdateData {
    first_name: string;
    last_name: string;
    email: string;
    phone_code: string;
    phone_number: string;
    gender: string;
    country: string;
    city: string;
    dob: string;
    address: string;
    profileImage: string;
}

export interface userUpdatePayload extends UserUpdateData {
    id: string;
}