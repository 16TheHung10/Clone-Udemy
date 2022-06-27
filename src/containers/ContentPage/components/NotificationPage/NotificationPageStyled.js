import styled from "styled-components";

const Wrapper = styled.div`
  &&& {
    padding: 30px 20px;
    min-height:60vh;
    .title-noti h2 {
      font-size: 20px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
    }
    .button-setting {
      margin-top: 40px;
    }
    .noti-area {
      background: #fff;
      margin-top: 30px;
      padding: 0;
      float: left;
      width: 100%;
      overflow-y:scroll;
      height:35vh
    }
  }
`;

export default Wrapper;
