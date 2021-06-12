const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/Registi',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Registi.vue') }
    ]
  },

  {
    path: '/Attori',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Attori.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
