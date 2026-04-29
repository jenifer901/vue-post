import { createRouter, createWebHistory } from 'vue-router'

const MainLayout = () => import('@/layouts/MainLayout.vue');
const Login = () => import('@/views/LoginView.vue');
const Posts = () => import('@/views/PostsView.vue');
const PostDetail = () => import('@/views/PostsDetailView.vue');
const PostEdit = () => import('@/views/PostsEditView.vue');
const PostCreate = () => import('@/views/PostsCreateView.vue');


const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'login',
        component: Login,
        meta: { requiresAuth: false },
      },
      {
        path: 'posts',
        component: Posts,
        meta: { requiresAuth: true },
      },
      {
        path: 'posts/new',
        component: PostCreate,
        meta: { requiresAuth: true },
      },
      {
        path: 'posts/:id',
        component: PostDetail,
        meta: { requiresAuth: true },
      },
      {
        path: 'posts/:id/edit',
        component: PostEdit,
        meta: { requiresAuth: true },
      },
      // redirect base
      {
        path: '/:pathMatch(.*)*',
        redirect: '/posts',
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // si necesita auth y no hay token
  if (to.meta.requiresAuth && !token) {
    next('/login');
    return;
  }

  // si ya está logueado y va a login
  if (to.path === '/login' && token) {
    next('/posts');
    return;
  }

  next();
});

export default router
