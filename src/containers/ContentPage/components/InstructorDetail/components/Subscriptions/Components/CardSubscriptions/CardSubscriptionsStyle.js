import styled from "styled-components";

const CardSubscriptionsWrapper = styled.div`
  &&& {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 320px;
    h3 {
      font-size: 16px;
      font-weight: 501;
      font-family: "Roboto", sans-serif;
      color: #333;
      margin-top:8px
    }
    p {
      font-size: 13px;
      color: #686f7a;
      margin-top: 8px;
      font-family: "Roboto", sans-serif;
      font-weight: 400;
      margin-bottom: 17px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export default CardSubscriptionsWrapper;
