import React, { useEffect } from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";
import LocalizedLink from "../components/localizedLink/localizedLink";
import Notification from "../components/notification";
import "../scss/index.scss";
import availabilityIcon from "../images/features/availability.svg";
import cloudIcon from "../images/features/cloud.svg";
import costIcon from "../images/features/cost.svg";
import crudIcon from "../images/features/crud.svg";
import hybridIcon from "../images/features/hybrid.svg";
import performenceIcon from "../images/features/performence.svg";
import realtimeIcon from "../images/features/realtime.svg";
import scalableIcon from "../images/features/scalable.svg";
import supportIcon from "../images/features/support.svg";
import metricsIcon from "../images/features/metrics.svg";
import searchIcon from "../images/features/search.svg";

import GithubLogo from "../images/icon/github-white.svg";
import LearnLogo from "../images/icon/learn.svg";
import Qcode from "../images/qrcode.jpeg";
import MilvusUserWechat from "../images/milvus-user-wechat.png";
import GithubButton from "react-github-button";
import "react-github-button/assets/style.css";

const icons = {
  availability: availabilityIcon,
  cloud: cloudIcon,
  support: supportIcon,
  scalable: scalableIcon,
  realtime: realtimeIcon,
  performence: performenceIcon,
  hybrid: hybridIcon,
  crud: crudIcon,
  cost: costIcon,
  search: searchIcon,
  metrics: metricsIcon,
};

const users = [];
const resources = [];
function importAllPics(r, type) {
  r.keys().forEach((key) => {
    const m = r(key);
    const matchs = key.match(/.\/(\S*).svg/);
    let href = "";
    let order = 0;
    if (type === "resources" && matchs.length) {
      switch (matchs[1]) {
        case "bilibili":
          order = 4;
          href =
            "https://space.bilibili.com/478166626?from=search&seid=1306120686699362786";
          break;
        case "medium":
          order = 2;
          href = "https://medium.com/@milvusio";
          break;
        case "slack":
          order = 0;
          href =
            "https://join.slack.com/t/milvusio/shared_invite/enQtNzY1OTQ0NDI3NjMzLWNmYmM1NmNjOTQ5MGI5NDhhYmRhMGU5M2NhNzhhMDMzY2MzNDdlYjM5ODQ5MmE3ODFlYzU3YjJkNmVlNDQ2ZTk";
          break;
        case "twitter":
          order = 1;
          href = "https://twitter.com/milvusio";
          break;
        case "zhihu":
          order = 5;
          href = "https://zhuanlan.zhihu.com/ai-search";
          break;
        case "wechat":
          order = 3;
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
  require.context("../images/website/users", false, /\.jpg$/),
  "users"
);
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
      <Notification></Notification>
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
              className="primary white-color"
              to="/docs/guides/get_started/install_milvus/install_milvus.md"
              locale={locale}
            >
              {section1.link2}
            </LocalizedLink>
            <LocalizedLink
              className="primary white-color"
              to="/docs/about_milvus/overview.md"
              locale={locale}
            >
              {section1.link}
            </LocalizedLink>
          </div>
        </section>
        <section className="section3">
          {/* <h2>{section3.title}</h2> */}
          <ul className="feature-wrapper">
            {section3.list.map((v) => (
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
              style={{ color: "#4eb8f0" }}
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
                      src={MilvusUserWechat}
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
