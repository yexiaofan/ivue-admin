/**
 * 分为三种路由：
 * 1.路由出口在App.vue
 * 2.路由出口在main.vue，但非左侧菜单项
 * 3.路由出口在main.vue，且为左侧菜单项
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 * 注意：为避免不必要的错误，每个路由需设置name属性！！！
 */

// 1.路由出口在App.vue
const singleRoutes = [
  {
    // 设置初始页面
    path: '',
    redirect: '/home'
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/welcome.vue')
  }
]

// 2.路由出口在main.vue，但非sider菜单项
const otherRoutes = {
  path: 'main',
  name: 'otherRoutes',
  component: () => import('../views/main/main.vue'),
  children: []
}

// 3.路由出口在main.vue，且为sider菜单项
export const siderRoutes = [
  {
    path: '/main',
    name: 'main-home',
    meta: {
      title: '首页',
      icon: 'ios-paper'
    },
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'ios-paper'
        },
        component: () => import('../views/home/home.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试',
      icon: 'ios-paper'
    },
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: 'test1',
        name: 'test1',
        meta: {
          title: '测试1',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test.vue')
      },
      {
        path: 'test2',
        name: 'test2',
        meta: {
          title: '测试2',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test2.vue')
      },
      {
        path: 'test3',
        name: 'test3',
        meta: {
          title: '测试3',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test3.vue')
      },
      {
        path: 'test4',
        name: 'test4',
        meta: {
          title: '测试4',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test4.vue')
      },
      {
        path: 'test5',
        name: 'test5',
        meta: {
          title: '测试5',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test5.vue')
      },
      {
        path: 'test6',
        name: 'test6',
        meta: {
          title: '测试6',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test6.vue')
      },
      {
        path: 'test7',
        name: 'test7',
        meta: {
          title: '测试7',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test7.vue')
      },
      {
        path: 'test8',
        name: 'test8',
        meta: {
          title: '测试8',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test8.vue')
      },
      {
        path: 'test9',
        name: 'test9',
        meta: {
          title: '测试9',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test9.vue')
      },
      {
        path: 'test10',
        name: 'test10',
        meta: {
          title: '测试10测试10测试10测试10测试10',
          icon: 'ios-paper'
        },
        component: () => import('../views/test/test10.vue')
      }
    ]
  },
  {
    path: '/main',
    name: 'main-q',
    meta: {
      title: '测试模块2',
      icon: 'ios-paper'
    },
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: '/test-q',
        name: 'test-q',
        meta: {
          title: '测试模块2测试模块2测试模块2测试模块2测试模块2',
          icon: 'ios-paper'
        },
        component: () => import('../views/test-q.vue')
      }
    ]
  }
]

// 汇总所有的路由
export const staticRoutes = [otherRoutes, ...siderRoutes, ...singleRoutes]
