import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthAction } from "redux/features/auth/AuthSlices";
import AuthUtils from "utils/AuthUtils";
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(AuthAction.logout());
    AuthUtils.logout();
  };
  return {
    logout,
  };
};

export default useAuth;
