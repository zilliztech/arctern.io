import React from "react";
import { Link } from "gatsby";
import locales from "../../consts/locales.js";
import "./localizedLink.scss";

export default ({
  locale,
  to,
  children,
  className = "link",
  _blank = false
}) => {
  const language = locales[locale];
  if (_blank) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        children={children}
        className={className}
      ></a>
    );
  }

  let path;

  language && !language.default ? (path = `/${locale}${to}`) : (path = to);
  return <Link className={className} children={children} to={path} />;
};
