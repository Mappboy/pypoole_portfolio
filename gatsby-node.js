const path = require(`path`)
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions  
  const tagPage = path.resolve('src/pages/tags.js');
  const tagPosts = path.resolve('src/templates/tag.js');
  const postsByTag = {};
  return graphql(`
    {
        allContentfulBlogPost {
        edges {
          node {
            id
              title
              description : subtitle{
                childMarkdownRemark {
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
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    if (result.data === undefined || result.data.allContentfulBlogPost === undefined ){
      throw new Error("No data in GraphQL???")
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
    node.tags.forEach(tag => {
      if (!postsByTag[tag]) {
      postsByTag[tag] = [];
    }
    postsByTag[tag].push(node);
  })
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
    const posts = postsByTag[tagName];

    createPage({
      path: `/tags/${tagName}`,
      component: tagPosts,
      context: {
        posts,
        tagName,
      },
    });
  });
})
}