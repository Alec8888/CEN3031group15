export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'signUp', component: () => import('pages/signup.vue') },
      { path: 'pantry', component: () => import('pages/pantry-find-food.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]