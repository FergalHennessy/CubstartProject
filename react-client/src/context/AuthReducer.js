//some function returning either 1. a user 2. current state 3. new state based on action taken
const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: action.payload,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            following: [...state.user.following, action.payload],
          },
        };
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter(
              (following) => following !== action.payload
            ),
          },
        };
      case "UPDATE_PROFILE":
        return {
          ...state,
          user: {
            ...state.user,
            profilePicture: action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  