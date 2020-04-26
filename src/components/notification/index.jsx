import React from "react";
import { link_join_slack } from "../../consts/index";
import "./index.scss";

const Notification = ({ locale }) => {
  const isMobile =
    document && document.body && document.body.clientWidth > 1000;
  const txt =
    locale === "en"
      ? `Join the Arctern Slack channel here ${
          isMobile ? "to interact with our community!" : "!"
        }`
      : "点击加入Arctern社区！";
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
