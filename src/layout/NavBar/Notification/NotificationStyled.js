import styled from 'styled-components';
const NotificationWrapper = styled.div`
  &&& {
    .noti-dropdown {
      background-color: white;
      width: 30rem;
      border: solid 1px #ffe6e6;
      padding: 10px;
      display: flex;
      box-shadow: 2px 5px 5px #ffe6e6;
    }
    .img-column {
      display: flex;
      align-items: center;
      margin-right: 0.8rem;
    }
    .content-column {
      display: flex;
      flex-direction: column;
    }
    p {
      font-weight: bold;
    }
    .noti-time {
      color: grey;
    }
    .btn-view-all {
      height: 5rem;
      width: 30rem;
      color: red;
      font-weight: bold;
      background-color: white;
      &:hover {
        background-color: #ffe6e6;
      }
    }
    .noti-content-bold {
      font-weight: bold;
    }
  }
`;

export default NotificationWrapper;
