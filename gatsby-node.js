const locales = require("./src/constants/locales");
const express = require("express");

exports.onCreateDevServer = ({ app }) => {
  app.use(express.static("public"));
};

// the version is same for different lang, so we only need one
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  return new Promise((resolve) => {
    deletePage(page);
    Object.keys(locales).map((lang) => {
      let localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path;
      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
        },
      });
    });
    resolve();
  });
};
