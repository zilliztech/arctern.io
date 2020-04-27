import React, { useEffect } from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";
import LocalizedLink from "../components/localizedLink/localizedLink";
import Notification from "../components/notification";
import "../scss/index.scss";

import rocketIcon from "../images/features/rocket-solid.svg";
import atomIcon from "../images/features/atom-solid.svg";
import expandArrowIcon from "../images/features/expand-arrows-alt-solid.svg";
import databaseIcon from "../images/features/database-solid.svg";
import cubesIcon from "../images/features/cubes-solid.svg";
import exchangeIcon from "../images/features/exchange-alt-solid.svg";
import { link_join_slack, link_zhihu, link_quick_start,link_bilibili, link_medium, link_twitter } from "../consts/index";
import GithubLogo from "../images/icon/github-white.svg";
import LearnLogo from "../images/icon/learn.svg";
import Qcode from "../images/qrcode.jpeg";
import ArcternUserWechat from "../images/user-wechat.png";
import GithubButton from "react-github-button";
import "react-github-button/assets/style.css";

const icons = {
  rocket: rocketIcon,
  atom: atomIcon,
  "expand-arrows-alt": expandArrowIcon,
  database: databaseIcon,
  cubes: cubesIcon,
  "exchange-alt": exchangeIcon
};

const users = [];
const resources = [];
function importAllPics(r, type) {
  r.keys().forEach(key => {
    const m = r(key);
    const matchs = key.match(/.\/(\S*).svg/);
    let href = "";
    let order = null;
    if (type === "resources" && matchs.length) {
      switch (matchs[1]) {
        case "slack":
          order = 0;
          href = link_join_slack;
          break;
        case "bilibili":
          order = 5;
          href =link_bilibili;
          break;
        case "medium":
          order = 2;
          href = link_medium;
          break;
        case "twitter":
          order = 1;
          href = link_twitter;
          break;
        case "zhihu":
          order = 3;
          href = link_zhihu;
          break;
        case "wechat":
          order = 4;
          href = "#";
          break;
        default:
          href = "#";
          break;
      }
    }
    type === "users"
      ? users.push(m)
      : (resources[order] = { src: m, name: matchs && matchs[1], href });
  });
}
importAllPics(
  require.context("../images/website/community", false, /\.svg$/),
  "resources"
);
const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return "en";
  }

  const lang =
    navigator && navigator.language && navigator.language.split("-")[0];
  if (!lang) return "en";

  switch (lang) {
    case "zh":
      return "cn";
    default:
      return "en";
  }
};

const IndexPage = ({ data, pageContext }) => {
  const language = data.allFile.edges[0].node.childLayoutJson.layout;
  const { locale } = pageContext;
  const { section1, section3, section4, section7 } = language.home;
  useEffect(() => {
    const urlLang = getRedirectLanguage();
    const set = window.localStorage.getItem("milvus.io.setlanguage");

    if (!set && urlLang !== locale) {
      navigate(`/${urlLang}/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout language={language} locale={locale}>
      <SEO title="Arctern" />
      <Notification locale={locale}></Notification>
      <main className="home-wrapper">
        <section className="section1">
          <div className="githubicon">
            <GithubButton
              type="stargazers"
              size="large"
              namespace="zilliztech"
              repo="arctern"
            />
          </div>
          <h1>{section1.desc1}</h1>
          <h3 dangerouslySetInnerHTML={{ __html: section1.desc2 }}></h3>
          <div className="btn-wrapper">
            <LocalizedLink
              className="primary color-primary"
              to={link_quick_start}
              locale={locale}
              _blank={true}
            >
              {section1.link2}
            </LocalizedLink>
            {/* <LocalizedLink
              className="primary white-color"
              to="/docs/about_milvus/overview.md"
              locale={locale}
            >
              {section1.link}
            </LocalizedLink> */}
          </div>
        </section>
        <section className="section3">
          {/* <h2>{section3.title}</h2> */}
          <ul className="feature-wrapper">
            {section3.list.map(v => (
              <li className="feature-item" key={v.title}>
                <div className="title-wrapper">
                  <img src={icons[v.img]} alt="icon"></img>
                  <p className="title">{v.title}</p>
                </div>
                <p
                  className="content"
                  dangerouslySetInnerHTML={{ __html: v.content }}
                ></p>
              </li>
            ))}
          </ul>
        </section>
        <section className="section4">
          <h2>{section4.title}</h2>
          <p>{section4.desc1}</p>
          <p>{section4.desc2}</p>
          <div className="btn-wrapper">
            <a
              className="primary primary-color with-icon"
              href="https://github.com/zilliztech/arctern"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubLogo} alt="github"></img>
              <span>{section4.contribute}</span>
            </a>
            <a
              className="primary with-icon"
              href="https://github.com/zilliztech/arctern/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ED1C24" }}
            >
              <img src={LearnLogo} alt="learn more"></img>
              <span>{section4.bootcamp}</span>
            </a>
          </div>
        </section>
        <section className="section7">
          <h2>{section7.title}</h2>
          <p>{section7.desc}</p>
          <ul>
            {resources.map((v, i) => (
              <li key={v.name} className={v.name}>
                <a target="_blank" rel="noopener noreferrer" href={v.href}>
                  <img src={v.src} alt="resouce"></img>
                </a>
                <p>{v.name}</p>
                {v.name === "wechat" && (
                  <div className="wechatqr">
                    <img
                      style={{ maxWidth: "initial" }}
                      width="150"
                      height="150"
                      src={ArcternUserWechat}
                      alt="二维码"
                    />
                    <img
                      style={{ maxWidth: "initial" }}
                      width="150"
                      height="150"
                      src={Qcode}
                      alt="二维码"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
};

export const Query = graphql`
  query HomeQuery($locale: String) {
    allFile(filter: { name: { eq: $locale } }) {
      edges {
        node {
          childLayoutJson {
            layout {
              header {
                quick
                why
                gui
                about
                doc
                blog
                try
                loading
                noresult
                tutorial
              }
              footer {
                product {
                  title
                  txt1
                  txt2
                }
                doc {
                  title
                  txt1
                  txt2
                  txt3
                }
                tool {
                  title
                  txt1
                }
                resource {
                  title
                  txt1
                  txt2
                  txt3
                  txt4
                }
                contact {
                  title
                  wechat
                }
              }
              home {
                section1 {
                  desc1
                  desc2
                  link
                  link2
                }
                section2 {
                  title
                  content
                  link
                }
                section3 {
                  title
                  list {
                    title
                    content
                    img
                  }
                }
                section4 {
                  title
                  desc1
                  desc2
                  contribute
                  bootcamp
                }
                section7 {
                  title
                  desc
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
