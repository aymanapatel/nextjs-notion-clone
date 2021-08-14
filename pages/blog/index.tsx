import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import orderby from 'lodash.orderby'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import PostPreview from '../../components/postPreview'
import { posts as postsFromCMS } from '../../content'

const Blog = ({ posts }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  )
}

Blog.defaultProps = {
  posts: [],
}

/**
 * Need to get the posts from the
 * fs and our CMS
 */
export function getStaticProps(ctx) {


  console.log(`@@ CTX/Preview in Index.tsx ${ctx.preview}`)

  // From CMS
  const cmsPosts = (ctx.preview ? postsFromCMS.draft : postsFromCMS.published).map((post) => {

    const { data } = matter(post)
    return data
  })

  const postPaths = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postPaths) // Next.JS allows FS. Client side React does not support FS.

  //  From File System
  const filePosts = fileNames.map((name) => {
    const fullPath = path.join(process.cwd(), 'posts', name)
    const file = fs.readFileSync(fullPath, 'utf-8')
    const { data } = matter(file)
    return data
  })


  const posts = [...cmsPosts, ...filePosts]

  return {
    props: { posts }  // passed to `<Blog posts={posts[]}/>`

  }
}

export default Blog

