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

exports.createPages = async ({ graphql, actions }) => {
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

  const primerSegments = await graphql(
    `
  query {
    markets: allMarketsYaml {
      edges {
        node {
          slug
        }
      }
    }

    platforms: allPlatformsYaml {
      edges {
        node {
          slug
        }
      }
    }

    builds: allBuildsYaml {
      edges {
        node {
          slug
        }
      }
    }
  }`)

  // /organizers/build/-memberships-/for/-online_store-/using/-shopify-/
  primerSegments.data.markets.edges.forEach(({ node: market }) => {
    primerSegments.data.platforms.edges.forEach(({ node: platform }) => {
      primerSegments.data.builds.edges.forEach(({ node: build }) => {
        createPage({
          path: `organizers/${market.slug}/${platform.slug}/${build.slug}`,
          component: path.resolve(`./src/templates/primers.js`),
          context: {
            market: market.slug,
            platform: platform.slug,
            build: build.slug,
          }
        })
      })
    })
  })

  createPage({
    path: `/`,
    component: path.resolve(`./src/templates/primers.js`),
    context: {
      market: "bookstores",
      platform: "native",
      build: "memberships",
    }
  })

  createPage({
    path: `organizers`,
    component: path.resolve(`./src/templates/primers.js`),
    context: {
      market: "online_store",
      platform: "native",
      build: "subscription_box",
    }
  })
}

