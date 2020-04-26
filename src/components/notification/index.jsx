import React from "react";
import { link_join_slack } from "../../consts/index";
import "./index.scss";

const Notification = (props) => {
  const isMobile =
    document && document.body && document.body.clientWidth > 1000;
  const txt = `Join the Arctern Slack channel here ${
    isMobile ? "to interact with our community!" : "!"
  }`;
  return (
    <div className="notification">
      <div className="wrapper">
        <span role="img" aria-label="" aria-labelledby="">
          👋
        </span>
        <a href={link_join_slack}>{txt}</a>
      </div>
    </div>
  );
};

export default Notification;
