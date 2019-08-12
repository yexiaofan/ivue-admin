import { getMenuList, getMenuRoutes } from './dynamic-routes'
/**
 * 分为三种路由：
 * 1.路由出口在App.vue
 * 2.路由出口在main.vue
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 */

// 1.路由出口在App.vue
const singleRoutes = [
  {
    // 设置初始页面
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/error-pages/404.vue')
  }
]

// 3.路由出口在main.vue，且为sider菜单项，静态配置菜单目前只支持二级菜单显示
const siderTree = [
  {
    path: '/main',
    name: 'main-home',
    title: '首页',
    icon: 'ios-paper',
    type: 'menu',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        title: '首页',
        icon: 'ios-paper',
        type: 'menu',
        component: () => import('../views/home/home.vue')
      }
    ]
  }
  // {
  //   path: '/test',
  //   name: 'test',
  //   title: '测试',
  //   icon: 'ios-paper',
  //   type: 'menu',
  //   component: () => import('../views/main/main.vue'),
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'test1',
  //       title: '测试1',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test.vue')
  //     },
  //     {
  //       path: 'test2',
  //       name: 'test2',
  //       title: '测试2',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test2.vue')
  //     },
  //     {
  //       path: 'test3',
  //       name: 'test3',
  //       title: '测试3',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test3.vue')
  //     },
  //     {
  //       path: 'test4',
  //       name: 'test4',
  //       title: '测试4',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test4.vue')
  //     },
  //     {
  //       path: 'test5',
  //       name: 'test5',
  //       title: '测试5',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test5.vue')
  //     },
  //     {
  //       path: 'test8',
  //       name: 'test8',
  //       title: '测试8',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test8.vue')
  //     },
  //     {
  //       path: 'test9',
  //       name: 'test9',
  //       title: '测试9测试9测试9测试9测试9测试9',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test9.vue')
  //     },
  //     {
  //       path: 'test10',
  //       name: 'test10',
  //       title: '测试10',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test10.vue')
  //     },
  //     {
  //       // 二级菜单
  //       path: '',
  //       name: 'test11',
  //       title: '测试11',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: '',
  //       children: [
  //         {
  //           path: 'test11-1',
  //           name: 'test11-1',
  //           title: '测试11-1测试11-1测试11-1测试11-1',
  //           icon: 'ios-paper',
  //           type: 'menu',
  //           component: () => import('../views/test/test11.vue')
  //         },
  //         {
  //           path: 'test11-2',
  //           name: 'test11-2',
  //           title: '测试11-2',
  //           component: () => import('../views/home/home-child.vue')
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/main',
  //   name: 'main-q',
  //   title: '测试模块2',
  //   icon: 'ios-paper',
  //   type: 'menu',
  //   component: () => import('../views/main/main.vue'),
  //   children: [
  //     {
  //       path: '/test-q',
  //       name: 'test-q',
  //       title: '测试模块2',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test-q.vue')
  //     },
  //     {
  //       path: 'test6',
  //       name: 'test6',
  //       title: '测试6',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test6.vue')
  //     },
  //     {
  //       path: 'test7',
  //       name: 'test7',
  //       title: '测试7',
  //       icon: 'ios-paper',
  //       type: 'menu',
  //       component: () => import('../views/test/test7.vue')
  //     }
  //   ]
  // }
]
const staticMenuList = getMenuList(siderTree)
const staticSiderRoutes = getMenuRoutes(siderTree)

// 汇总所有的路由
const staticRoutes = [...staticSiderRoutes, ...singleRoutes]

export { staticRoutes, staticMenuList, staticSiderRoutes, singleRoutes }
