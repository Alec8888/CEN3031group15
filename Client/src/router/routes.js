export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'signin', component: () => import('pages/sign_in.vue') },
      { path: 'pantry', component: () => import('pages/pantry-find-food.vue') },
      { path: 'register', component: () => import('pages/register_form.vue') }

    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]