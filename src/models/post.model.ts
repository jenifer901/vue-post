import type { User } from './user.model'

export interface Post {
  id: string
  userId: string
  title: string
  body: string
  tags: string[]
  createdAt: string
  user?: User
  comment?: Comment
}
