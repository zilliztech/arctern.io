import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LocalizeLink from "../localizedLink/localizedLink";
import Logo from "../../images/logo/arctern.svg";
import "./header.scss";
import { globalHistory } from "@reach/router";

const Header = ({ language, locale }) => {
  const { header } = language;
  const [screenWidth, setScreenWidth] = useState(null);
  const [mobileNav, setMobileNav] = useState(null);
  const l = locale === "cn" ? "en" : "cn";
  const to = globalHistory.location.pathname
    .replace("/en/", "/")
    .replace("/cn/", "/");
  const blogHref =
    locale === "cn"
      ? "http://zilliz.blog.csdn.net"
      : "https://medium.com/@milvusio";
  useEffect(() => {
    const cb = () => {
      setScreenWidth(document.body.clientWidth);
    };
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
    window.localStorage.setItem('milvus.io.setlanguage', true);
  }

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
              to="/docs/guides/get_started/install_milvus/install_milvus.md"
              className="link"
            >
              {header.quick}
            </LocalizeLink>
            <LocalizeLink
              locale={locale}
              className="link"
              to={"/docs/about_milvus/overview.md"}
            >
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
              <span onClick={onChangeLocale}>{locale === "cn" ? "En" : "中"}</span>
            </LocalizeLink>
          </div>
        ) : (
          <div className="right">
            <LocalizeLink locale={l} to={to}>
              <span onClick={onChangeLocale}>{locale === "cn" ? "En" : "中"}</span>
            </LocalizeLink>
            <i className="fas fa-bars" onClick={handleClick}></i>
          </div>
        )}
      </header>
      <div className={`mobile-nav ${mobileNav && "open"}`}>
        <LocalizeLink locale={locale} to="/#whymilvus" className="link">
          {header.quick}
        </LocalizeLink>
        <LocalizeLink locale={locale} to="/gui" className="link">
          {header.gui}
        </LocalizeLink>
        <LocalizeLink locale={locale} className="link" to="/scenarios">
          {header.solution}
        </LocalizeLink>
        <LocalizeLink
          locale={locale}
          className="link"
          to={"/docs/guides/get_started/install_milvus/install_milvus.md"}
        >
          {header.doc}
        </LocalizeLink>
        <LocalizeLink
          locale={locale}
          className="link"
          to={"/blogs/2019-08-26-vector-search-million.md"}
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
