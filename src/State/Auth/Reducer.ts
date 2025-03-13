import { DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType"
import { UserInitialState } from "./interface/user-state.interface";

const initialState: UserInitialState = {
    user: null,
    jwt: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
}
export const authReducer = (state: UserInitialState = initialState, action: any): UserInitialState => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                user: state.user,
                isLoading: true,
                error: null
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                user: state.user,
                isLoading: true,
                error: null
            }
        case GET_USER_REQUEST:
            return {
                ...state,
                user: state.user,
                isLoading: true,
                error: null
            }

        case UPDATE_USER_REQUEST:
            return {
                ...state,
                user: state.user,
                isLoading: true,
                error: null
            }
        case DELETE_USER_REQUEST:
            return {
                ...state,
                user: state.user,
                isLoading: true,
                error: null
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: { ...action.payload },
                jwt: action.payload.token,
                isLoading: false,
                error: null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                jwt: action.payload.token,
                isLoading: false, error: null
            }

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: { ...action.payload },
                isLoading: false,
                error: null
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                user: null,
                isLoading: false,
                error: null
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: state.user,
                error: action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: state.user,
                error: action.payload
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                user: state.user,
                isLoading: false,
                error: action.payload
            }
        case UPDATE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                user: state.user,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
                jwt: null,
                isLoading: false,
                error: null
            };

        default:
            return state;
    }
}