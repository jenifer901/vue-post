import type { User } from './user.model'

export interface Post {
  id: string | null
  userId: string
  title: string
  body: string
  tags: string[]
  createdAt: Date
  user?: User
  comment?: Comment
}
