import { GoogleCircleFilled, FacebookFilled } from "@ant-design/icons";
import { Button } from "antd";
import { thirdLogin } from "apis/features/CommonAPI/AuthApi";
import { appId, clientId } from "configuration";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUtils from "utils/AuthUtils";
import LoginFacebookStyled from "./ThirdPartyLoginStyled";
import { LoadingAction } from "redux/features/loading/LoadingSlices";
import { setPreviousLogInUser } from "utils/AuthUtils";
import { AuthAction } from "redux/features/auth/AuthSlices";

const ThirdLogin = ({ setErrorMsg }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const responseFacebook = async (result) => {
    dispatch(LoadingAction.updateLoading(true));
    try {
      const response = await thirdLogin({
        provider: "facebook",
        token: result?.accessToken,
      });

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        setErrorMsg(message);
      } else {
        AuthUtils.setToken(data?.token);
        dispatch(AuthAction.updateUser(data?.user));
        //setPreviousLogInUser(data?.user);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      dispatch(LoadingAction.updateLoading(false));
    }
  };

  const onSuccess = async (result) => {
    dispatch(LoadingAction.updateLoading(true));
    try {
      const response = await thirdLogin({
        provider: "google",
        token: result?.tokenId,
      });

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        setErrorMsg(message);
      } else {
        AuthUtils.setToken(data?.token);
        dispatch(AuthAction.updateUser(data?.user));
        //setPreviousLogInUser(data?.user);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      dispatch(LoadingAction.updateLoading(false));
    }
  };

  const onFailure = (response) => {};

  return (
    <>
      <LoginFacebookStyled>
        <FacebookLogin
          id="buttonFB"
          appId={appId}
          fields="name,email,picture"
          callback={responseFacebook}
          icon={<FacebookFilled className="mg-right" />}
          textButton={"Continue with Facebook"}
        />
        <GoogleLogin
          clientId={clientId}
          render={(renderProps) => (
            <Button
              className="socialBtn mt-10 mb-10"
              style={{ backgroundColor: "#34a853" }}
              block
              onClick={renderProps.onClick}
            >
              {<GoogleCircleFilled />}
              Continue with Google
            </Button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
        />
      </LoginFacebookStyled>
    </>
  );
};

export default ThirdLogin;
