import { SUBMIT_REGISTRATION, SUBMIT_REGISTRATION_FAILS, SUBMIT_REGISTRATION_SUCCESS } from "./registerActionType";


export const submitRegisterDetails = (data) => {
    return (dispatch, getState, {axiosInstance}) => {
      dispatch({
        type: SUBMIT_REGISTRATION,
  
      });
      axiosInstance.post('http://localhost:5000/user/user', data)
          .then(res => {
            dispatch({
              type: SUBMIT_REGISTRATION_SUCCESS,
              payload: res.data
            });
          })
          .catch(error => {
            dispatch({
              type: SUBMIT_REGISTRATION_FAILS,
              payload: error
            });
          })
      ;
  
    }
  }