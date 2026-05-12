import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/shared/layouts/MainLayout.vue')
const Login = () => import('@/views/LoginView.vue')
const Posts = () => import('@/views/PostsView.vue')
const PostDetail = () => import('@/views/PostsDetailView.vue')
const FormPost = () => import('@/views/FormPost.vue')

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/posts',
      },
      {
        path: 'login',
        component: Login,
        name: 'login',
        meta: { requiresAuth: false },
      },
      {
        path: 'posts',
        name: 'posts',
        component: Posts,
        meta: { requiresAuth: true },
      },
      {
        path: 'post/new',
        component: FormPost,
        name: 'new',
        meta: { requiresAuth: true },
      },
      {
        path: 'post/:id',
        component: PostDetail,
        name: 'post',
        meta: { requiresAuth: true },
      },
      {
        path: 'post/:id/edit',
        name: 'edit',
        component: FormPost,
        meta: { requiresAuth: true },
      },
      // redirect base
      {
        path: '/:pathMatch(.*)*',
        redirect: '/posts',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// guards autentication, isOwner in is-owner.guard.ts (beforeEnter in routers)
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  // si necesita auth y no hay token
  if (to.meta.requiresAuth && !token) {
    return { path: '/login' }
  }

  // si ya está logueado y va a login
  if (to.path === '/login' && token) {
    return { path: '/posts' }
  }

  return true
})

export default router
