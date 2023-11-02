export default [
  {
    path: '/',
    component: () => import('layouts/tabsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { title: 'Welcome' } },
      { path: 'signin', component: () => import('pages/sign_in.vue'), meta: { title: 'Sign In' } },
      { path: 'pantry', component: () => import('pages/pantry-find-food.vue'), meta: { title: 'Pantry' } },
      { path: 'register', component: () => import('pages/register_form.vue'), meta: { title: 'Register' } },
      { path: 'account', component: () => import('pages/account.vue'), meta: { title: 'Account' } },
      { path: 'donate', component: () => import('pages/donate.vue'), meta: { title: 'Donate' } },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'), meta: { title: 'Not Found' }
  }
]