export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { title: 'Welcome' } },
      { path: 'signin', component: () => import('pages/sign_in.vue'), meta: { title: 'Sign In' } },
      { path: 'pantry', component: () => import('pages/pantry-find-food.vue'), meta: { title: 'Pantry' } },
      { path: 'register', component: () => import('pages/register_form.vue'), meta: { title: 'Register' } }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'), meta: { title: 'Not Found' }
  }
]