import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LocalizeLink from "../localizedLink/localizedLink";
import Logo from "../../images/logo/arctern.svg";
import "./header.scss";
import { globalHistory } from "@reach/router";
import {
  blog_site_cn,
  blog_site_en,
  link_quick_start,
  link_overview,
  link_mobi_why_milvus,
  link_mobi_blog,
  link_mobi_doc,
  link_mobi_gui
} from "../../consts/index";

const Header = ({ language, locale }) => {
  const { header } = language;
  const [screenWidth, setScreenWidth] = useState(null);
  const [mobileNav, setMobileNav] = useState(null);
  const l = locale === "cn" ? "en" : "cn";
  const to = globalHistory.location.pathname
    .replace("/en/", "/")
    .replace("/cn/", "/");
  const blogHref = locale === "cn" ? blog_site_cn : blog_site_en;
  useEffect(() => {
    const cb = () => setScreenWidth(document.body.clientWidth);
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
            <img src={Logo} alt="Milvos Logo"></img>
          </LocalizeLink>
        </div>

        {screenWidth > 1000 ? (
          <div className="right">
            <LocalizeLink
              locale={locale}
              to={link_quick_start}
              className="link"
            >
              {header.quick}
            </LocalizeLink>
            <LocalizeLink locale={locale} className="link" to={link_overview}>
              {header.doc}
            </LocalizeLink>
            <a
              href={blogHref}
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
        <LocalizeLink
          locale={locale}
          to={link_mobi_why_milvus}
          className="link"
        >
          {header.quick}
        </LocalizeLink>
        <LocalizeLink locale={locale} to={link_mobi_gui} className="link">
          {header.gui}
        </LocalizeLink>
        <LocalizeLink locale={locale} className="link" to={link_mobi_doc}>
          {header.doc}
        </LocalizeLink>
        <LocalizeLink locale={locale} className="link" to={link_mobi_blog}>
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
