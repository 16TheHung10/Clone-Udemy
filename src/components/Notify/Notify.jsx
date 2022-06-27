import { HubConnectionBuilder } from "@microsoft/signalr";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "redux/features/auth/AuthSelector";
export default function Notify() {
  const [connection, setConnection] = useState(null);
  const authUser = useSelector(authSelector.selectUser);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://mockcourse.azurewebsites.net/notify")
      .withAutomaticReconnect([0, 1000, 5000])
      .build();
    setConnection(connect);
  }, []);
  useEffect(() => {
    if (connection) {
      (async () => {
        await connection.start();
        if (!!authUser)
          await connection.invoke("addtogroup", `${authUser?.id}`);
        await connection.on("ReceiveMessage", (data) => {
          console.log("noti", data);
          message.success(data);
        });
      })();
    }

    // if (connection) {
    //   connection
    //     .start()
    //     .then(() => {
    //       if (!!authUser) return connection.invoke("addtogroup", authUser?.id);
    //     })
    //     .then(() => {
    //       connection.on("ReceiveMessage", (data) => {
    //         console.log("noti", data);
    //         message.success(data);
    //       });
    //     })
    //     .catch((error) => console.log(error));
    // }
  }, [connection, authUser]);
  return <></>;
}
