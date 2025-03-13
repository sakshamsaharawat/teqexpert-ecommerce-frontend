import { Dispatch } from 'redux';
import { UserData } from './interface/user-interface';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE } from './ActionType';
import { LoginData } from './interface/login-interface';
import axiosInstance from '../../utils/axiosInstance';
import { UserUpdateData } from './interface/updateUser.interface';
import { toast } from 'react-toastify';
import { showError } from '../../utils/showErrors';

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user: object, token: string) => ({ type: REGISTER_SUCCESS, payload: { user, token } });
const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axiosInstance.post("/user/signup", userData);
        localStorage.setItem("jwt", response.data.token);
        dispatch(registerSuccess(response.data.data, response.data.token))
        toast.success(response.data.message)
        return { success: true }
    } catch (error: any) {
        dispatch(registerFailure(error.data.message));
        showError(error.data.message);
        return { success: false, message: error.data.message };
    }
}

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user: object, token: string) => ({ type: LOGIN_SUCCESS, payload: { user, token } });
const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (UserData: LoginData) => async (dispatch: Dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axiosInstance.post("/user/login", UserData);
        const user = response.data;
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        } else {
            toast.error("jwt is undefined. Cannot save to localStorage.");
        }
        dispatch(loginSuccess(user, user.token));
        return { success: true, message: "User login successfully.", token: user.token }

    } catch (error: any) {
        dispatch(loginFailure(error));
        showError(error.data.message);
        return { success: false, message: error.message }
    }
}

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: object) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error: any) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = () => async (dispatch: Dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await axiosInstance.get("/user/profile");
        dispatch(getUserSuccess(response.data.data));

    } catch (error: any) {
        dispatch(getUserFailure(error.message));
        showError(error.data.message);
    }
}

const logoutRequest = () => ({ type: LOGOUT_REQUEST });
const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
const logoutFailure = (error: any) => ({ type: LOGOUT_FAILURE, payload: error });

export const logout = () => async (dispatch: Dispatch) => {
    dispatch(logoutRequest());
    try {
        localStorage.removeItem("jwt");
        dispatch(logoutSuccess());
    } catch (error: any) {
        dispatch(logoutFailure(error.message));
        showError(error.data.message);
    }
};

const updateRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateSuccess = (userData: UserUpdateData) => ({ type: UPDATE_USER_SUCCESS, payload: userData });
const updateFailure = (error: any) => ({ type: UPDATE_USER_FAILURE, payload: error });

export const updateUser = (userData: UserUpdateData) => async (dispatch: Dispatch) => {
    dispatch(updateRequest());
    try {
        const response = await axiosInstance.post("user/update", userData);
        dispatch(updateSuccess(response.data.data));
        return { success: true }
    } catch (error: any) {
        dispatch(updateFailure(error.message));
        showError(error.data.message);
    }
}

const deleteRequest = () => ({ type: DELETE_USER_REQUEST });
const deleteSuccess = () => ({ type: DELETE_USER_SUCCESS });
const deleteFailure = (error: any) => ({ type: DELETE_USER_FAILURE, payload: error });

export const deleteUser = () => async (dispatch: Dispatch) => {
    dispatch(deleteRequest());
    try {
        await axiosInstance.delete(`user`);
        dispatch(deleteSuccess());
        return { success: true }
    } catch (error: any) {
        dispatch(deleteFailure(error.message));
        showError(error.data.message);
    }
}