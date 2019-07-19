<style lang="less" scoped>
@import "./main.less";
</style>

<template>
  <div class="wrapper main">
    <div class="main-sider">
      <img  src="../../assets/logo.png" alt="logo加载失败">
      <!--菜单最多支持三级菜单-->
      <sider-menu :menuList="menuList"></sider-menu>
    </div>
    <div class="main-header">
      <header-nav :currentPath="currentPath"
        :isFullScreen.sync="isFullScreen"
        :avatorUrl="avatorUrl"></header-nav>
      <tags-nav :pageOpenedList="pageOpenedList"
        :isOpenNewPage="isOpenNewPage"
        @closeTags="closeTags"
        @tagSelected="tagSelected"></tags-nav>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      isFullScreen: false,
      isOpenNewPage: false,
      avatorUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg'
    }
  },
  components: {
    'sider-menu': () => import('./components/sider-menu'),
    'header-nav': () => import('./components/header-nav'),
    'tags-nav': () => import('./components/tags-nav')
  },
  computed: {
    menuList () {
      return this.$store.state.app.menuList
    },
    currentPath () {
      return this.$store.state.app.currentPath
    },
    pageOpenedList () {
      return this.$store.state.app.pageOpenedList
    }
  },
  watch: {
    $route (to) {
      console.log(to)
      // 路由变化，更新PageOpenedList
      let index = this.$util.indexOfCurrentPageOpened(to.name, this.$store.state.app.pageOpenedList)
      this.$store.commit('setPageOpenedList', { route: to, index })
      this.isOpenNewPage = index < 0 ? true : false
      // 设置header的面包屑路径
      let currentPathArr = this.$util.initCurrentPath(to.name, this.menuList)
      this.$store.commit('setCurrentPath', currentPathArr)
      // 设置左侧菜单的选中项
      this.$store.commit('setCurrentMenuOpenNames', to.matched[0].name)
    }
  },
  methods: {
    init () {
      // 初始化PageOpenedList
      this.$store.commit('setPageOpenedList')
      // 设置header的面包屑路径
      let currentPathArr = this.$util.initCurrentPath(this.$route.name, this.menuList)
      this.$store.commit('setCurrentPath', currentPathArr)
      // 设置左侧菜单的选中项
      this.$store.commit('setCurrentMenuOpenNames', this.$route.matched[0].name)
    },
    closeTags (action) {
      let isRemoveSelected
      if (typeof action === 'number') {
        isRemoveSelected = this.$store.state.app.pageOpenedList[action].selected
      }
      this.$store.commit('removePageOpenedList', { route: this.$route, action })
      if (isRemoveSelected) {
        // 移除单个tag，导航到上一个tag的页面
        this.$router.push({
          name: this.$store.state.app.pageOpenedList[this.$store.state.app.pageOpenedList.length - 1].name
        })
      } else if (action === 'closeAll') {
        this.$router.push('/home')
      }
    },
    tagSelected (index) {
      this.$router.push({
        name: this.$store.state.app.pageOpenedList[index].name
      })
    }
  },
  created () {
    this.init()
  }
}
</script>
