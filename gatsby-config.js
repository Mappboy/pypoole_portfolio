const { INLINES } = require('@contentful/rich-text-types')
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID } = process.env;
const { client_config } = require('./client_secret.js')

module.exports = {
  siteMetadata: {
    title: `PyPoole`,
    author: `Cameron`,
    email: `Cameron.j.poole@gmail.com`,
    siteUrl: `https://www.pypoole.com`,
    description: `Thoughts from Cameron Poole`,
    image: "/media/icon.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@cpoolerun",
  },
    plugins: [
      'gatsby-plugin-react-helmet',
      {
        resolve: '@contentful/gatsby-transformer-contentful-richtext',
        options: {
          renderOptions: {
            /*
             * Defines custom html string for each node type like heading, embedded entries etc..
             */
            renderNode: {
              // Example
              [INLINES.ASSET_HYPERLINK]: node => `<img class='custom-asset' src="${
                  node.data.target.fields.file['en-US'].url
                }"/>`,
              [INLINES.EMBEDDED_ENTRY]: node => `<div class='custom-entry' />${
                  node.data.target.fields.name['en-US']
                }</div>`,
            },
          },
        },
      },
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-plugin-typography`,
        options: {
           pathToConfigModule: `src/typography`,
        }
       },
      {
        resolve: `gatsby-plugin-sharp`,
        options: {
          stripMetadata: true,
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: manifestConfig,
      },
      'gatsby-plugin-styled-components',
    //   {
    //     resolve: 'gatsby-source-google-sheets',
    //     options: {
    //         spreadsheetId: '16yxrlTSXQqHBAVXlUrRW8oxwCtuEDekdVirzZU7D_XI',
    //         worksheetTitle: 'Cards',
    //         credentials: client_config
    //     }
    // },
    //   {
    //     resolve: 'gatsby-source-google-sheets',
    //     options: {
    //         spreadsheetId: '16yxrlTSXQqHBAVXlUrRW8oxwCtuEDekdVirzZU7D_XI',
    //         worksheetTitle: 'Projects',
    //         credentials: client_config
    //     }
    // },
      //   {
      //   resolve: `gatsby-plugin-google-fonts`,
      //   options: {
      //     fonts: [`cabin`,`Open Sans`],
      //   },
      // },
      // {
      //   resolve: `gatsby-plugin-prefetch-google-fonts`,
      //   options: {
      //     fonts: [
      //       {family:`cabin`},
      //       {family:`Open Sans`}
      //     ],
      //   },
      // },
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: SPACE_ID,
          accessToken: ACCESS_TOKEN,
        },
      },
      {
        resolve: `gatsby-source-git`,
        options: {
          name: 'til',
          remote: `https://github.com/Mappboy/til.git`,
          patterns: [`**/*.md`, '!*README.md']
        }
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `data`,
          path: `${__dirname}/src/data/`,
          ignore: [`**/\.*`], // ignore files starting with a dot
        },
      },
      {
        resolve: 'gatsby-plugin-html-attributes',
        options: {
          lang: 'en'
        }
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            `gatsby-remark-prismjs`,
          ]
        }
        },
      'gatsby-plugin-offline',
      'gatsby-plugin-netlify',
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
          feeds: [
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map(edge => Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.title,
                    date: new Date(edge.node.frontmatter.date),
                    url: `${site.siteMetadata.siteUrl  }/til/${edge.node.fields.heading.toLowerCase()}/${edge.node.frontmatter.slug}`,
                    guid: `${site.siteMetadata.siteUrl  }/til/${edge.node.fields.heading.toLowerCase()}/${  edge.node.frontmatter.slug}`,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                  })),
              query: `
              {
                allMarkdownRemark(
                limit:10,
                filter: {frontmatter: {title: {ne: ""}}},
                 sort: {order: DESC, fields: [frontmatter___date]}) {
                    edges {
                      node {
                      fields {
                      heading
                      }
                        frontmatter {
                          title
                          date
                          slug
                        }
                       html
                    }
                  }
                }
              }
            `,
              output: "/rss.xml",
              title: "PyPoole Today I Learned",
              // optional configuration to insert feed reference in pages:
              // if `string` is used, it will be used to create RegExp and then test if pathname of
              // current page satisfied this regular expression;
              // if not provided or `undefined`, all pages will have feed reference inserted
              match: "^/til/",
              // optional configuration to specify external rss feed, such as feedburner
            },
          ],
        },
      },
    ],
  };
