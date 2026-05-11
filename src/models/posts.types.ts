import type { Post } from './post.model'

export type PostsWhereFilter = {
  userId?: { eq: string }
  tags?: { contains: string }
  or?: Array<{
    title?: { contains: string }
    body?: { contains: string }
  }>
}

export type PostsQueryParams = {
  _page: number
  _per_page: number
  _sort: string
  _embed: string
  _where?: string
}

export type PostsApiResponse = {
  data: Post[]
  pages: number
  items: number
}

export type CreatePostDto = {
  title: string
  body: string
  tags?: string[]
}
