const menus1 = [
  {
    id: 1,
    parentId: 0,
    url: '/main',
    name: 'main-q',
    title: '测试模块2',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/main/main.vue'
  },
  {
    id: 2,
    parentId: 1,
    url: '/test-q',
    name: 'test-q',
    title: '测试模块2',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test-q.vue'
  },
  {
    id: 9,
    parentId: 1,
    url: '/test6',
    name: 'test6',
    title: '测试6',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test6.vue'
  },
  {
    id: 10,
    parentId: 1,
    url: '/test7',
    name: 'test7',
    title: '测试7',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test7.vue'
  }
]

const menus2 = [
  {
    id: 3,
    parentId: 0,
    url: '/test',
    name: 'test',
    title: '测试',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/main/main.vue'
  },
  {
    id: 4,
    parentId: 3,
    url: '/test1',
    name: 'test1',
    title: '测试1',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test.vue'
  },
  {
    id: 5,
    parentId: 3,
    url: '/test2',
    name: 'test2',
    title: '测试2',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test2.vue'
  },
  {
    id: 6,
    parentId: 3,
    url: '/test3',
    name: 'test3',
    title: '测试3',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test3.vue'
  },
  {
    id: 7,
    parentId: 3,
    url: '/test4',
    name: 'test4',
    title: '测试4',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test4.vue'
  },
  {
    id: 8,
    parentId: 3,
    url: '/test5',
    name: 'test5',
    title: '测试5',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test5.vue'
  },
  {
    id: 11,
    parentId: 3,
    url: '/test8',
    name: 'test8',
    title: '测试8',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test8.vue'
  },
  {
    id: 12,
    parentId: 3,
    url: '/test9',
    name: 'test9',
    title: '测试9',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test9.vue'
  },
  {
    id: 13,
    parentId: 3,
    url: '/test10',
    name: 'test10',
    title: '测试101111111111111',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test10.vue'
  },
  {
    id: 14,
    parentId: 3,
    url: '',
    name: '',
    title: '测试11111111111111111111111111111111111',
    icon: 'ios-paper',
    type: 'menu',
    component: ''
  },
  {
    id: 15,
    parentId: 14,
    url: '/test11-1',
    name: 'test11-1',
    title: '测试11-11111111111111111111111111111111',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test11.vue'
  },
  {
    id: 16,
    parentId: 14,
    url: '/test11-2',
    name: 'test11-2',
    title: '测试11-22222222222222222222222222222222',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test12.vue'
  },
  {
    id: 17,
    parentId: 14,
    url: '/test11-3',
    name: 'test11-3',
    title: '测试11-3',
    icon: 'ios-paper',
    type: 'menu',
    component: 'views/test/test13.vue'
  },
  {
    id: 18,
    parentId: 14,
    path: 'home-child',
    name: 'home-child',
    title: '测试home-child',
    component: 'views/home/home-child.vue'
  }
]

let menus = [...menus1, ...menus2]
// setTimeout(() => {
//   console.log('change to menus2')
//   menus = menus2
// }, 5000)

async function getDynamicMenusRes () {
  const menus = await getDynamicMenus()
  const dynamicMenuRes = initMenuTree(menus)
  return dynamicMenuRes
}

function getDynamicMenus () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('成功获取menus')
      resolve(menus)
    }, 1000)
    // 错误 reject([])
  })
}

function initMenuTree (menus) {
  const cloneMenus = JSON.parse(JSON.stringify(menus))
  const tree = []
  let leaves = []
  cloneMenus.forEach(menu => {
    if (menu.parentId === 0) {
      tree.push(menu)
    } else {
      leaves.push(menu)
    }
  })
  buildTree(tree, leaves)
  const menuList = getMenuList(tree)
  const menuRoutes = getMenuRoutes(tree)
  return {
    menuList,
    menuRoutes
  }
}

function buildTree (tree, leaves) {
  leaves = deleteUselessElement(leaves)
  while (leaves.length > 0) {
    leaves.forEach((leaf, index) => {
      if (leaf) {
        addLeaf(tree, leaf, index, leaves)
      }
    })
    leaves = deleteUselessElement(leaves)
  }
}

function addLeaf (parents, leaf, index, leaves) {
  for (const parent of parents) {
    if (parent.id === leaf.parentId) {
      if (parent.children && Array.isArray(parent.children)) {
        parent.children.push(leaf)
      } else {
        parent.children = []
        parent.children.push(leaf)
      }
      // 将leaf标记为null
      leaves[index] = null
      break
    } else {
      if (parent.children && Array.isArray(parent.children)) {
        addLeaf(parent.children, leaf, index, leaves)
      }
    }
  }
}

function deleteUselessElement (array) {
  let temp = []
  array.forEach(ele => {
    if (ele) {
      temp.push(ele)
    }
  })
  return temp
}

export function getMenuList (menus) {
  const tempList = []
  menus.forEach(ele => {
    if (ele.type && ele.type === 'menu') {
      const tempObj = {}
      if (ele.children) {
        tempObj.children = getMenuList(ele.children)
      }
      tempObj.name = ele.name
      tempObj.icon = ele.icon || 'ios-cube-outline'
      tempObj.title = ele.title
      tempList.push(tempObj)
    }
  })
  return tempList
}

export function getMenuRoutes (tree) {
  const menuRoutes = buildMenuRoutesStep1(tree)
  buildMenuRoutesStep2(menuRoutes)
  buildMenuRoutesStep3(menuRoutes)
  return menuRoutes
}

function buildMenuRoutesStep1 (menus) {
  const tempRoutes = []
  menus.forEach(ele => {
    const tempObj = {}
    if (ele.children) {
      tempObj.children = buildMenuRoutesStep1(ele.children)
    }
    tempObj.path = ele.url || ele.path
    tempObj.name = ele.name
    tempObj.meta = {
      title: ele.title
    }
    if (typeof ele.component === 'string' && ele.component.length > 0) {
      tempObj.component = () => import(`@/${ele.component}`)
    } else {
      tempObj.component = ele.component
    }
    tempRoutes.push(tempObj)
  })
  return tempRoutes
}

function buildMenuRoutesStep2 (routes, parent) {
  routes.forEach(ele => {
    if (ele.children) {
      buildMenuRoutesStep2(ele.children, ele)
      if (!ele.component && parent) {
        ele.children.forEach(item => {
          // 将二级菜单的信息放入子路由中
          item.meta.parentName = ele.name
        })
        parent.children = parent.children.concat(ele.children)
      }
    }
  })
}

function buildMenuRoutesStep3 (routes) {
  routes.forEach((ele, index) => {
    if (ele.children) {
      buildMenuRoutesStep3(ele.children)
    }
    if (!ele.component) {
      routes.splice(index, 1)
    }
  })
}

export default getDynamicMenusRes
