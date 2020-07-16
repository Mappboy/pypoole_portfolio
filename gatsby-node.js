const path = require(`path`)
const chalk = require('chalk');

exports.onCreateNode = ({ node, getNode,actions  }) => {
  const { createNodeField } = actions
  // Add a heading to our files from git til
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    if (fileNode.relativePath !== undefined) {
      createNodeField({
        node,
        name: `heading`,
        value: path.dirname(fileNode.relativePath),
      })
    }
  }
}

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const tagPage = path.resolve('src/templates/tags.js');
  const tagPosts = path.resolve('src/templates/tag.js');
  const postsByTag = {};
  const tilsByHeading = {};
  return graphql(`
    {
        allContentfulBlogPost {
        edges {
          node {
            id
              title
              description {
                childContentfulRichText {
                  html
                }
              }
              heroImage {
                description
                image: fluid(maxWidth: 396, quality: 100) {
                  src
                }
              }
              slug
              createdAt(formatString: "MMM YYYY")
              readingTime
              tags
          }
        }
      }
      allMarkdownRemark(filter: {frontmatter: {title: {ne: ""}}}
              sort: { order: DESC, fields: [frontmatter___date] }) {
    edges {
      node {
        fields{
          heading
        }
        frontmatter {
          title
          date
          slug
          tags
          categories
        }
        html
      }
    }
  }
}
  `).then(result => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query. ${result.errors}`)
      return
    }
    if (result.data === undefined || result.data.allMarkdownRemark === undefined ){
      reporter.panicOnBuild(`"No data in GraphQL???"`)
      return
    }
    result.data.allContentfulBlogPost.edges.forEach(({ node }) => {
        createPage({
            path: `blog/${node.slug}`,
            component: path.resolve(`./src/templates/blog-post.js`),
            context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: `${node.slug}`,
            },
    })
    if (node.tags) {
      node.tags.forEach(tag => {
        if (tag && !postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(node);
      })
    }
  })
  const tags = Object.keys(postsByTag);
  createPage({
    path: '/tags',
    component: tagPage,
    context: {
      tags: tags.sort(),
    },
  });
  tags.forEach(tagName => {
    if (tagName && tagName.trim()) {
      const posts = postsByTag[tagName];

      console.log(`${chalk.green(`Created tag ${tagName}`)}`)
      createPage({
        path: `/tags/${tagName}`,
        component: tagPosts,
        context: {
          posts,
          tagName,
        },
      })
    };
  });
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `til/${node.fields.heading.toLowerCase()}/${node.frontmatter.slug}`,
        component: path.resolve(`./src/templates/til.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: `${node.frontmatter.slug}`,
        },
      })
    })

  })
}
