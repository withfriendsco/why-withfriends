import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Post = ({ data }) => {
  const post = data?.markdownRemark
  return (
    <Layout>
      <article className="prose prose-m mt-16">
        <h1 className="mb-4">{post.frontmatter.title}</h1>
        <div className="text-wfGray-600 text-sm pb-4 mb-4">
          Posted on {post.frontmatter.date} by {post.frontmatter.author}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="border-wfGray-300 border-b pb-4 mb-4 block" />
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        author
      }
    }
  }
`

export default Post
