import axios from "axios";
export const getRegister = () => {
  return (dispatch) => {
    dispatch({ type: "get-register-pending" });
    axios
      .get("http://localhost:8001/register/get-register")
      .then((res) => {
        dispatch({ type: "get-register-success", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "get-register-failed", payload: err.message });
      });
  };
};
export const addRegister = (data) => {
  return (dispatch) => {
    dispatch({ type: "add-register-pending" });
    return axios
      .post("http://localhost:8001/register/add-register", data)
      .then((res) => {
        dispatch({ type: "add-register-success", payload: res.data });
        return Promise.resolve();
      })
      .catch((err) => {
        dispatch({ type: "add-register-failed", payload: err.message });
        return Promise.reject();
      });
  };
};
