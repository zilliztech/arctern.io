import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LocalizeLink from "../localizedLink/localizedLink";
import Logo from "../../images/logo/arctern.svg";
import "./header.scss";
import { globalHistory } from "@reach/router";
import {
  blog_site_cn,
  // blog_site_en,
  // link_quick_start,
  link_overview,
  // link_mobi_why_milvus,
  // link_mobi_blog,
  link_mobi_doc
  // link_mobi_gui,
} from "../../consts/index";
import { isMobile } from "../../Helper.js";

const Header = ({ language, locale }) => {
  const { header } = language;
  const [is_mobile, setIsMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(null);
  const l = locale === "cn" ? "en" : "cn";
  const to = globalHistory.location.pathname
    .replace("/en/", "/")
    .replace("/cn/", "/");
  useEffect(() => {
    const cb = () => setIsMobile(isMobile());
    cb();
    window.addEventListener("resize", cb);
    window.addEventListener("click", () => {
      setMobileNav(false);
    });
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);

  const handleClick = e => {
    e.stopPropagation();
    setMobileNav(v => !v);
  };

  const onChangeLocale = () => {
    window.localStorage.setItem("milvus.io.setlanguage", true);
  };

  return (
    <>
      <header className="header-wrapper">
        <div className="logo-wrapper">
          <LocalizeLink locale={locale} to={"/"}>
            <img src={Logo} alt="Arctern Logo"></img>
          </LocalizeLink>
        </div>

        {!is_mobile ? (
          <div className="right">
            {/* hide no quick start now */}
            {/* <LocalizeLink
              locale={locale}
              to={link_quick_start}
              className="link"
            >
              {header.quick}
            </LocalizeLink> */}
            <LocalizeLink
              locale={locale}
              className="link"
              to={link_overview}
              _blank={true}
            >
              {header.doc}
            </LocalizeLink>
            {/* hide no blog start now */}
            <a
              href={blog_site_cn}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {header.blog}
            </a>
            <LocalizeLink locale={l} to={to}>
              <span onClick={onChangeLocale}>
                {locale === "cn" ? "En" : "中"}
              </span>
            </LocalizeLink>
          </div>
        ) : (
          <div className="right">
            <LocalizeLink locale={l} to={to}>
              <span onClick={onChangeLocale}>
                {locale === "cn" ? "En" : "中"}
              </span>
            </LocalizeLink>
            <i className="fas fa-bars" onClick={handleClick}></i>
          </div>
        )}
      </header>
      <div className={`mobile-nav ${mobileNav && "open"}`}>
        {/* <LocalizeLink
          locale={locale}
          to={link_mobi_why_milvus}
          className="link"
        >
          {header.quick}
        </LocalizeLink> */}
        {/* <LocalizeLink locale={locale} to={link_mobi_gui} className="link">
          {header.gui}
        </LocalizeLink> */}
        <LocalizeLink
          locale={locale}
          className="link"
          to={link_mobi_doc}
          _blank={true}
        >
          {header.doc}
        </LocalizeLink>
        <LocalizeLink
          locale={locale}
          className="link"
          to={blog_site_cn}
          _blank={true}
        >
          {header.blog}
        </LocalizeLink>
      </div>
    </>
  );
};

Header.propTypes = {
  language: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired
};

export default Header;
