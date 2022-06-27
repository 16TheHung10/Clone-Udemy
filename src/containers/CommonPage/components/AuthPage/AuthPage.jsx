import { useState } from "react";
import { Layout } from "antd";
import { ReactComponent as CurSusLogo } from "assets/svg/logo.svg";
import bgSignIn from "assets/svg/sign.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { CommonProvider } from "context/CommonPageContext";
import { ReactComponent as CursusLogo } from "assets/svg/logo.svg";

// css
import Wrapper from "./CommonPageStyled";

const { Header, Content, Footer } = Layout;

// Component
const AuthPage = () => {
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
        <Layout>
          <Header className="headerLogIn">
            <CurSusLogo
              width="135"
              style={{ cursor: "pointer" }}
              onClick={(e) => navigate("/")}
            />
          </Header>
          <Content className="contentLogIn">
            <Outlet />
          </Content>
          <Footer className="footerSignUp">
            <CursusLogo width="80" />
            <span>© 2022 . All Rights Reserved.</span>
          </Footer>
        </Layout>
      </Wrapper>
    </CommonProvider>
  );
};

export default AuthPage;
