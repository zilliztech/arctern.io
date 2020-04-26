import React, { useState, useEffect } from "react";
import { link_join_slack } from "../../consts/index";
import { isMobile } from "../../Helper";
import "./index.scss";

const Notification = ({ locale }) => {
  const [is_mobile, setIsMobile] = useState(false);
  const txt =
    locale === "en"
      ? `Join the Arctern Slack channel here ${
          is_mobile ? "!" : "to interact with our community!"
        }`
      : "点击加入Arctern社区！";
  useEffect(() => {
    setIsMobile(isMobile());
  }, []);
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
