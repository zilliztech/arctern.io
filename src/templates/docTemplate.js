// import React, { useState, useEffect } from "react";
// import Layout from "../components/docLayout";
// import SEO from "../components/seo";
// import { graphql } from "gatsby";
// import hljs from "highlight.js";
// import "highlight.js/styles/atom-one-dark.css";
// import "./docTemplate.scss";

// export default function Template({
//   data,
//   pageContext, // this prop will be injected by the GraphQL query below.
// }) {
//   const {
//     locale,
//     version,
//     versions,
//     headings = [],
//     allMenus,
//     isBlog,
//     isBenchmark = false,
//   } = pageContext;
//   const layout = data.allFile.edges[0].node.childLayoutJson.layout;
//   const menuList = allMenus.find(
//     (v) =>
//       v.absolutePath.includes(version) &&
//       isBlog === v.isBlog &&
//       locale === v.lang
//   );
//   const nav = {
//     current: "doc",
//   };
//   useEffect(() => {
//     document.querySelectorAll("pre code").forEach((block) => {
//       hljs.highlightBlock(block);
//     });
//   }, []);

//   return (
//     <Layout
//       language={layout}
//       locale={locale}
//       nav={nav}
//       pageContext={pageContext}
//       menuList={menuList}
//       version={version}
//       headings={headings}
//       versions={versions}
//       isBenchMark={isBenchmark}
//     >
//       <SEO title={`${headings[0] && headings[0].value}`} lang={locale} />
//       <div className="doc-post-container">
//         <div className="doc-post">
//           <div
//             className="doc-post-content"
//             // dangerouslySetInnerHTML={{ __html: html }}
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export const pageQuery = graphql`
//   query($locale: String, $fileAbsolutePath: String) {
//     allFile(
//       filter: {
//         name: { eq: $locale }
//         relativeDirectory: { regex: "/(?:layout)/" }
//       }
//     ) {
//       edges {
//         node {
//           relativeDirectory
//           childLayoutJson {
//             layout {
//               header {
//                 quick
//                 why
//                 gui
//                 about
//                 doc
//                 blog
//                 try
//                 loading
//                 noresult
//                 tutorial
//               }
//               footer {
//                 product {
//                   title
//                   txt1
//                   txt2
//                 }
//                 doc {
//                   title
//                   txt1
//                   txt2
//                   txt3
//                 }
//                 tool {
//                   title
//                   txt1
//                 }
//                 resource {
//                   title
//                   txt1
//                   txt2
//                   txt3
//                   txt4
//                 }
//                 contact {
//                   title
//                   wechat
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
