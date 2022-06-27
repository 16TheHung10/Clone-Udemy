import { useState } from "react";
import { Layout, Col, Row } from "antd";
import { ReactComponent as CurSusLogo } from "assets/svg/logo.svg";
import bgSignIn from "assets/svg/sign.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonProvider } from "context/CommonPageContext";
import { ReactComponent as CursusLogo } from "assets/svg/logo.svg";

// css
import Wrapper from "./CommonPageStyled";

const { Header, Content, Footer } = Layout;

// Component
const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  return (
    <CommonProvider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      <Wrapper background={bgSignIn}>
        <div className="headerLogIn">
          <CurSusLogo
            width="135"
            style={{ cursor: "pointer" }}
            onClick={(e) => navigate("/")}
          />
        </div>
        <Row className="contentLogIn" justify="center">
          <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Outlet />
          </Col>
        </Row>
        <div className="footerSignUp">
          <CursusLogo width="80" />
          <span>© 2022 . All Rights Reserved.</span>
        </div>
      </Wrapper>
    </CommonProvider>
  );
};

export default SignInPage;
