import { SUBMIT_REGISTRATION, SUBMIT_REGISTRATION_FAILS, SUBMIT_REGISTRATION_SUCCESS } from "./registerActionType";

export const registerReducer = (
    state = {
            registerSubmit  : {
                fetching: false,
                error: { status: false, message: "" },
                success: {status: false, message: "" }
            }
        },  action) => {
            switch (action.type) {

            case SUBMIT_REGISTRATION:
                return {
                    ...state,
                    registerSubmit : {
                        ...state.registerSubmit,
                        fetching: false,
                        error: { status: false, message: "" },
                        success: {status: false, message: "" }
                    }
            };

            case SUBMIT_REGISTRATION_SUCCESS:
                return {
                    ...state,
                    registerSubmit : {
                        ...state.registerSubmit,
                        fetching: false,
                        error: { status: false, message: "" },
                        success: {status: true, message: action.payload }
                    }
            };

            case SUBMIT_REGISTRATION_FAILS:
                return {
                    ...state,
                    registerSubmit : {
                        ...state.registerSubmit,
                        fetching: false,
                        error: { status: true, message: action.payload },
                        success: {status: false, message: "" }
                    }
            };
            default:
            return state;
        }
}

