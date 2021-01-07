module.exports = {
  siteMetadata: {
    title: `Why Withfriends`,
    description: `Why and how you should build a membership program that engages and retains your most dedicated customers and supporters.`,
    author: `Withfriends`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "WFAPI",
        fieldName: "wfapi",
        url: process.env.GATSBY_GRAPHQL_API,
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_JWT}`,
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-fullstory`,
      options: {
        fs_org: "J4FPZ",
      },
    },
    `gatsby-plugin-use-query-params`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 92,
              isIconAfterHeader: false,
            },
          },
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-classes`,
            options: {
              listitem: "ml-1",
              classMap: {
                paragraph: "prose prose-md",
                "heading[depth=1]": "text-lg max-w-prose mx-auto",
                "heading[depth=2]": "text-md max-w-prose mx-auto",
                "heading[depth=3]": "text-sm max-w-prose mx-auto",
                "list[ordered=false]":
                  "prose prose-md sm:prose-lg list-disc text-md max-w-prose mx-auto",
                "list[ordered=true]":
                  "prose prose-md sm:prose-lg list-decimal text-md max-w-prose mx-auto",
              },
            },
          },
        ],
      },
    },
    `gatsby-theme-apollo`,
    `gatsby-plugin-graphql-config`,
    {
      resolve: `gatsby-plugin-hubspot`,
      options: {
        trackingCode: `6328349`,
        respectDNT: false,
        productionOnly: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
