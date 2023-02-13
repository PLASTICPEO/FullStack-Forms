import { useEffect, useState } from "react";
import "./notification.css";

const Notification = ({ message }) => {
  const [messageType, setMessageType] = useState("");
  console.log(message);
  useEffect(() => {
    if (message.from === "delete") {
      setMessageType("error");
    } else {
      setMessageType("successful");
    }
  }, [message]);
  if (message.from === null) {
    return null;
  }

  return <div className={messageType}>{message.message}</div>;
};

export default Notification;
