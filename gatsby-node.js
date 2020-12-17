/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ node, graphql, actions }) => {
  const { createPage, createNodeField } = actions
  const result = await graphql(`
    fragment AdjacentPost on MarkdownRemark {
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        author
      }
    }

    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            ...AdjacentPost
          }
          previous {
            ...AdjacentPost
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `posts${node.fields.slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: node.fields.slug,
        next,
        previous,
      },
    })
  })
}
