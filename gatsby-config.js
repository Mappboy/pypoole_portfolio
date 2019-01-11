const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ACCESS_TOKEN, SPACE_ID } = process.env;


module.exports = {
    plugins: [
      'gatsby-plugin-react-helmet',
      `@contentful/gatsby-transformer-contentful-richtext`,
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
      
        {
        resolve: `gatsby-plugin-google-fonts`,
        options: {
          fonts: [`cabin`,`Open Sans`],
        },
      },
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
        resolve: 'gatsby-plugin-html-attributes',
        options: {
          lang: 'en'
        }
      },
      'gatsby-transformer-remark',
      'gatsby-plugin-offline',
    ],
  };
