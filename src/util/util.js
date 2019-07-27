import axios from 'axios'
import vm from '../main'
import JSEncrypt from 'jsencrypt'

const util = {}
console.log(process.env.NODE_ENV)
localStorage.token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJjc2NwLmF1dGhvcml0eSxjc2NwLmxvZ2dpbmcsY3NjcC5sb2dnaW5nLmxvZ2luLGNzY3AubG9nZ2luZy5vcGVyYXRpb24sY3NjcC5vcmcsY3NjcC5vcmcuZWRpdCxjc2NwLm9yZy5xdWVyeSxjc2NwLnJvbGUsY3NjcC5yb2xlLmFkZCxjc2NwLnJvbGUuZGVsLGNzY3Aucm9sZS5lZGl0LGNzY3Aucm9sZS5xdWVyeSxjc2NwLnVzZXIsY3NjcC51c2VyLmFkZCxjc2NwLnVzZXIuZGVsLGNzY3AudXNlci5lZGl0LGNzY3AudXNlci5xdWVyeSxjc2NwLndnLGNzY3Aud2cuYWRkLGNzY3Aud2cuZGVsLGNzY3Aud2cuZWRpdCxjc2NwLndnLnF1ZXJ5IiwicmVtIjowLCJpZCI6MSwiZXhwIjoxNTYzODQ3NDQ3fQ.PHuDia6dX0pXducgwlsPjuYHu3s8n7ju_UvnElswljbGywg7LwndTiehrtFaEUYRTFGavhmp25qgStYPL-kaGw'

util.baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : 'http://localhost:9000'

util.http = axios.create({
  baseURL: util.baseUrl,
  timeout: 30000
})

// http请求拦截
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.token
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})
// http响应拦截
axios.interceptors.response.use(function (res) {
  // 在这里对返回的数据进行处理
  if (!res.config.url.includes('refreshToken')) {
    // 记录ajax调用的时间
    sessionStorage.lastAjaxTime = new Date().getTime()
  }
  return res
}, function (error) {
  // Do something with response error
  if (error.response.data.status === 401) {
    if (vm.$route.name !== 'login') {
      vm.$Notice.warning({
        title: vm.$t('身份认证信息已失效，请重新登录。'),
        desc: '',
        duration: 3
      })
      vm.$router.push({
        name: 'login'
      })
    }
  } else {
    if (error.response.data.status === 403) {
      vm.$Notice.warning({
        title: error.response.data.message,
        desc: '',
        duration: 3
      })
    }
  }
  return Promise.reject(error)
})

util.http = function (method = 'get', url, params = {}, headers = {}) {
  let Params = {}
  let Data = {}
  let reg1 = /^(G|g)(E|e)(T|t)$/
  let reg2 = /^(D|d)(E|e)(L|l)(E|e)(T|t)(E|e)$/
  if (reg1.test(method) || reg2.test(method)) {
    Params = params
  } else {
    Data = params
  }
  return new Promise((resolve, reject) => {
    axios({
      baseURL: util.baseUrl,
      timeout: 30000,
      method,
      params: Params,
      data: Data,
      headers
    }).then(resposne => {
      resolve(resposne.data)
    }).catch(error => {
      reject(error)
    })
  })
}

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
          temp.push(item.children[0].title)
          break
        }
      }
    } else {
      let findTarget = false
      for (let child of item.children) {
        if (child.name === name) {
          if (temp.length === 0) {
            temp.push(item.title)
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

// 检查是否有相关按钮权限
util.isHasPermission = function (code) {
  if (util.permissionSwitch) {
    return localStorage['btnPermissionCode'].indexOf(code) >= 0
  } else {
    return true
  }
}

// 数据加密方法
const rsaPubKey = ''
util.encryptPassword = function (str) {
  if (rsaPubKey) {
    // 对密码进行加密
    let encryptor = new JSEncrypt() // 新建JSEncrypt对象
    encryptor.setPublicKey(rsaPubKey) // 设置公钥
    return encryptor.encrypt(str) // 加密
  } else {
    return str
  }
}

/***
 * 对比两个Routes数组的内容是否一致, 返回不一样的数据
 * 参数revers: boolean
 * false表示正向，即找出需要动态添加的路由数据
 * true表示反向，即找出不可访问的路由（因为已经动态添加的路由没法移除，除非刷新操作）
 * 注意： 这部分逻辑只针对两层的路由嵌套
 */
util.martchRoutes = function (targetArr, sourceArr) {
  const temp = []
  targetArr.forEach(target => {
    // 重置一下状态
    target.active = true
    const cloneTarget = JSON.parse(JSON.stringify(target))
    for (let source of sourceArr) {
      if (cloneTarget.name === source.name) {
        if (cloneTarget.children && source.children) {
          // 继续对比children数组
          const newChildren = util.martchRoutes(cloneTarget.children, source.children)
          if (newChildren.length > 0) {
            cloneTarget.children = newChildren
            cloneTarget.active = true
          } else {
            cloneTarget.active = false
          }
        } else {
          cloneTarget.active = false
        }
        break
      }
    }
    if (cloneTarget.active) {
      temp.push(cloneTarget)
    }
  })
  return temp
}

// 检查当前路由是否可访问
util.canRouteAcccess = function (name, sourceArr) {
  console.log(sourceArr)
  // 目标路由是否可访问
  if (sourceArr.length === 0) {
    return true
  }
  for (let item of sourceArr) {
    if (item.children) {
      for (let child of item.children) {
        if (child.name === name) {
          return false
        }
      }
    } else {
      if (item.name === name) {
        return false
      }
    }
  }
  console.log('不会到这里！')
  return true
}

export default util
