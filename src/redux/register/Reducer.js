const initialState = {
  registers: [],
  register: {},
  success: false,
  error: null,
  isLoading: false,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get-register-pending":
      return {
        ...state,
        isLoading: true,
      };
    case "get-register-success":
      return {
        ...state,
        isLoading: false,
        registers: action.payload,
      };
    case "get-register-failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "add-register-pending":
      return {
        ...state,
        isLoading: true,
      };
    case "add-register-success":
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case "add-register-failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default registerReducer;
