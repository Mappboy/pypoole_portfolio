const { INLINES } = require('@contentful/rich-text-types')
const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID } = process.env;
const { client_config } = require('./client_secret.js')

module.exports = {
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
              [INLINES.ASSET_HYPERLINK]: node => {
                return `<img class='custom-asset' src="${
                  node.data.target.fields.file['en-US'].url
                }"/>`
              },
              [INLINES.EMBEDDED_ENTRY]: node => {
                return `<div class='custom-entry' />${
                  node.data.target.fields.name['en-US']
                }</div>`
              },
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
    {
      resolve: 'gatsby-source-google-sheets',
      options: {
          spreadsheetId: '16yxrlTSXQqHBAVXlUrRW8oxwCtuEDekdVirzZU7D_XI',
          worksheetTitle: 'Projects',
          credentials: client_config
      }
  },
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
      'gatsby-plugin-dark-mode',
      {
        resolve: '@fec/gatsby-plugin-advanced-feed',
        options: {
          feeds: [
            {
              // Configure the feed; smart defaults are choosen if not set
              author: undefined,      // default: site.siteMetadata.author
              copyright: undefined,   // default: "All rights reserved {year}, {site.siteMetadata.author}"
              description: undefined, // default: site.siteMetadata.description
              email: false,           // default: false ➞ no email in feed; undefined ➞ site.siteMetadata.email
              id: undefined,          // default: site.siteMetadata.siteUrl
              link: undefined,        // default: site.siteMetadata.siteUrl
              title: undefined,       // default: site.siteMetadata.title

              // Add <link> tags in <head> to feeds
              createLinkInHead: true, // `true` for all pages or regular expression to match pathnames

              // Number of articles to include in feed
              limit: 10,

              // Include all pages which `fileAbsolutePath` matches this regular expression
              match: '^/blog/',

              // File names of generated feeds
              output: {
                rss2: 'rss.xml',
                atom: 'atom.xml',
                json: 'feed.json',
              },
            },
            {
              // Configure the feed; smart defaults are choosen if not set
              author: undefined,      // default: site.siteMetadata.author
              copyright: undefined,   // default: "All rights reserved {year}, {site.siteMetadata.author}"
              description: undefined, // default: site.siteMetadata.description
              email: false,           // default: false ➞ no email in feed; undefined ➞ site.siteMetadata.email
              id: undefined,          // default: site.siteMetadata.siteUrl
              link: undefined,        // default: site.siteMetadata.siteUrl
              title: undefined,       // default: site.siteMetadata.title

              // Add <link> tags in <head> to feeds
              createLinkInHead: true, // `true` for all pages or regular expression to match pathnames

              // Number of articles to include in feed
              limit: 10,

              // Include all pages which `fileAbsolutePath` matches this regular expression
              match: '^/til/',

              // File names of generated feeds
              output: {
                rss2: 'rss-til.xml',
                atom: 'atom-til.xml',
                json: 'feed-til.json',
              },
            }
          ],
        }
      }
      // 'gatsby-plugin-theme-ui'
    ],
  };
