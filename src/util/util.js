const util = {}

// 定位新打开的页面在pageOpenedList中位置
util.indexOfCurrentPageOpened = function (name, pageOpenedList) {
  for (let index = 0; index < pageOpenedList.length; index++) {
    if (pageOpenedList[index].name === name) {
      return index
    }
  }
  return -1
}

// 初始化header中的面包屑路径
util.initCurrentPath = function (name, menuList) {
  if (!(menuList instanceof Array) || menuList.length === 0) {
    return null
  }
  let temp = []
  for (let item of menuList) {
    if (!item.children) {
      continue
    }
    temp = []
    if (name === 'home') {
      return temp
    }
    if (item.children.length === 1) {
      if (item.children[0].name === 'home') {
        continue
      } else {
        if (item.children[0].name === name) {
          temp.push(item.children[0].meta.title)
          break
        }
      }
    } else {
      let findTarget = false
      for (let child of item.children) {
        if (child.name === name) {
          if (temp.length === 0) {
            temp.push(item.meta.title)
          }
          temp.push(child.name)
          findTarget = true
          break
        }
      }
      if (findTarget) {
        break
      }
    }
  }
  if (temp.length === 0) {
    temp.push(name)
  }
  return temp
}

// 判断当前路由是否是左侧菜单中的路由
util.checkRouteInSiderRoutes = function (name, menuList) {
  if (!(menuList instanceof Array) || menuList.length === 0) {
    return null
  }
  for (let item of menuList) {
    if (!item.children) {
      continue
    }
    if (item.children.length === 1 && item.children[0].name === name) {
      return true
    } else {
      for (let child of item.children) {
        if (child.name === name) {
          return true
        }
      }
    }
  }
  return false
}

export default util
