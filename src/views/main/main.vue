<style lang="less" scoped>
@import "./main.less";
</style>

<template>
  <div class="main">
    <div class="main-sider menu-scrollbar" :style="siderStyles">
        <div class="logo">
          <Icon type="ios-water" />
          <template v-if="!shrink">
            LOGO
          </template>
        </div>
        <!--菜单最多支持二级菜单-->
        <sider-menu-shrinked v-if="shrink" :menuList="menuList"></sider-menu-shrinked>
        <sider-menu v-else :menuList="menuList" :openNames="openNames"></sider-menu>
    </div>
    <div class="main-header" :style="otherStyles">
      <header-nav :currentPath="currentPath"
        :avatorUrl="avatorUrl"
        :shrink="shrink"
        @toggleShrink="toggleShrink"></header-nav>
      <tags-nav :pageOpenedList="pageOpenedList"
        @closeTags="closeTags"
        @tagSelected="tagSelected"></tags-nav>
    </div>
    <div class="main-content common-scrollbar" :style="otherStyles">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      avatorUrl: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
      shrink: false
    }
  },
  components: {
    'sider-menu': () => import('./components/sider-menu'),
    'sider-menu-shrinked': () => import('./components/sider-menu-shrinked'),
    'header-nav': () => import('./components/header-nav'),
    'tags-nav': () => import('./components/tags-nav')
  },
  computed: {
    siderStyles () {
      return {
        width: this.shrink ? '64px' : '240px',
        overflow: this.shrink ? 'visible' : 'auto'
      }
    },
    otherStyles () {
      return {
        left: this.shrink ? '64px' : '240px'
      }
    },
    menuList () {
      return this.$store.state.app.menuList
    },
    currentPath () {
      return this.$store.state.app.currentPath
    },
    pageOpenedList () {
      return this.$store.state.app.pageOpenedList
    },
    openNames () {
      return this.$store.state.app.currentMenuOpenNames
    }
  },
  watch: {
    $route (to) {
      console.log(to)
      // 路由变化，更新PageOpenedList
      let index = this.$util.indexOfCurrentPageOpened(to.name, this.$store.state.app.pageOpenedList)
      this.$store.commit('setPageOpenedList', { route: to, index })
      // 设置header的面包屑路径
      let currentPathArr = this.$util.initCurrentPath(to.name, this.menuList)
      this.$store.commit('setCurrentPath', currentPathArr)
      // 设置左侧菜单的选中项
      this.$store.commit('setCurrentMenuOpenNames', to.matched)
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
      this.$store.commit('setCurrentMenuOpenNames', this.$route.matched)
    },
    closeTags (action) {
      let isRemoveSelected
      if (typeof action === 'number') {
        isRemoveSelected = this.$store.state.app.pageOpenedList[action].selected
      }
      this.$store.commit('removePageOpenedList', { route: this.$route, action })
      if (isRemoveSelected) {
        // 移除单个tag，导航到最后一个tag的页面
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
    },
    toggleShrink () {
      this.shrink = !this.shrink
      console.log(this.shrink)
    }
  },
  created () {
    this.init()
  }
}
</script>
