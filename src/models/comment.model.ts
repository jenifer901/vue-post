export interface Comment {
  id: string
  postId: string
  userId: string
  body: string
  createdAt: string
  user?: User
}

export interface User {
  id: string
  name: string
}
