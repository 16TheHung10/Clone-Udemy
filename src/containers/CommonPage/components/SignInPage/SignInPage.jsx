import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Typography,
} from "antd";
import { login } from "apis/features/CommonAPI/AuthApi";
import { setPreviousLogInUser } from "utils/AuthUtils";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthUtils from "utils/AuthUtils";
import * as yup from "yup";
import ThirdLogin from "./ThirdPartyLogin/ThirdPartyLogin";
import { useDispatch } from "react-redux";
import { LoadingAction } from "redux/features/loading/LoadingSlices";
import { AuthAction } from "redux/features/auth/AuthSlices";

const { Title } = Typography;

// Schema yup
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Format must be an e-mail")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Email must be correct with format abc@exampl.com"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Minimum must be greater 8 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password has at least one uppercase, one number, one special character and minimum 8 in length"
      ),
  })
  .required();

// Component
export default function SignInPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // handle submit form
  const onFinish = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        setErrorMsg(message);
      } else {
        dispatch(LoadingAction.updateLoading(true));
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
      reset();
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Col span={24} md={8}>
      <Form
        className="form-basic form-login"
        name="basic"
        onFinish={handleSubmit(onFinish)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Title className="headerForm" level={3}>
          Welcome Back
        </Title>
        <p className="subHeader">Log In to Your Edututs+ Account!</p>

        {errorMsg !== "" && <Alert message={errorMsg} type={"error"} />}

        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                prefix={<MailOutlined />}
                className="formInput"
                placeholder="Email Address"
                onFocus={() => setErrorMsg("")}
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                ref={passwordRef}
                {...register("password")}
                prefix={<KeyOutlined />}
                className="formInput"
                placeholder="Password"
                onFocus={() => setErrorMsg("")}
                {...field}
              />
            )}
          />
        </Form.Item>

        <div className="d-flex justify-content-start">
          <Form.Item className="formItem cursor-pointer color-primary">
            <span onClick={() => navigate("/forgot-pass")}>
              Forgot Password
            </span>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            className="signInBtn socialBtn"
            loading={isSubmitting}
            block
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
        <p style={{ marginTop: "-20px" }} className="text-center">
          Or login with
        </p>
        <ThirdLogin setErrorMsg={setErrorMsg} />

        <Divider />

        <Form.Item>
          <p className="signUpAcc">
            {`Don't have an account? `}
            <span onClick={() => navigate("/sign-up")}>Sign Up</span>
          </p>
        </Form.Item>
      </Form>
    </Col>
  );
}
