import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// /es/Wheel/demo/index.js
const components = import.meta.glob('/es/**/demo/index.js')
const nameReg = /es\/(\w+)\/demo\/index.js/

let match
let name: string

const demos: RouteRecordRaw[] = Object.keys(components).map(key => {
  match = nameReg.exec(key)

  if (match) {
    name = match[1]
  }

  return {
    path: '/' + name.toLocaleLowerCase() + '/:title?',
    name,
    component: components[key],
    meta: {
      name
    }
  }
})

const routes: RouteRecordRaw[] = [
  {
    path: '/:title?',
    name: 'Home',
    component: () => import('./views/Home'),
    meta: {
      name: '首页'
    }
  },
  ...demos
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router