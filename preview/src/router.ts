import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { INavGroup } from './components/HomeNav'

const components = import.meta.glob('./views/components/**/index.tsx')
const nameReg = /.\/views\/components\/([\W\w]+)\/index.tsx/

let match
let name: string
let path: string

const routeMap: {
  [path: string]: {
    title: string
    path: string
  }
} = {}

const routes: RouteRecordRaw[] = Object.keys(components).map(key => {
  match = nameReg.exec(key)

  if (match) {
    name = match[1]
  }

  path = '/' + name.toLocaleLowerCase()

  routeMap[path] = {
    path,
    title: name
  }

  return {
    path,
    name,
    component: components[key],
    meta: {
      name
    }
  }
})

const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path: '/',
      name: '首页',
      component: () => import('./views/Home'),
      meta: {
        name: '首页'
      }
    },
    ...routes
  ]
})

export default router

/**
 * 这里定义的是显示在首页的菜单导航信息
 */
export const homeNav: INavGroup[] = [
  {
    name: '互动组件',
    children: routes.map(route => {
      return {
        title: route.name as string,
        path: route.path
      }
    })
  }
]
