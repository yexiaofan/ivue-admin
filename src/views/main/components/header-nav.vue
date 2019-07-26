<style lang="less" scoped>
@import "../../../base.less";
.header-nav {
  display: flex;
  align-items: center;
  height: 64px;
  color: @title-color;
  padding: 0 @padding;
  .bread-crumb {
    flex: 1 1 auto;
    margin-left: 16px;
    text-align: left;
    font-size: 20px;
  }
  .config-wrapper {
    flex: 0 0 264px;
    line-height: 32px;
    text-align: left;
    a {
      i {
        font-size: 20px;
      }
    }
    .dark-a {
      margin-right: 16px;
    }
    .avator-wrapper {
      float: right;
    }
  }
  li {
    text-align: center;
  }
}
.setting-wrapper {
  img {
    width: 100%;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.4);
  }
  header {
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      margin-left: 4px;
      font-weight: bold;
    }
  }
  .setting-label {
    font-size: 13px;
    margin: 4px 0;
  }
}
</style>

<template>
  <div class="header-nav">
    <Icon type="ios-menu-outline" size="32" />
    <div class="bread-crumb">
      <Breadcrumb>
        <BreadcrumbItem
          v-for="(path, index) in currentPath"
          :key="index"
          style="font-size: 14px;"
        >{{path}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="config-wrapper clear-float">
      <a class="dark-a" href="javascript:void(0)" @click="toggleFullScreen">
        <Tooltip :content="isFullScreen ? $t('header.exitFullScreen') : $t('header.fullScreen')" placement="bottom">
          <Icon :type="isFullScreen ? 'md-contract' : 'md-expand'" :size="23"></Icon>
        </Tooltip>
      </a>
      <a class="dark-a" href="javascript:void(0)" @click="openSetting">
        <Tooltip :content="$t('header.setting')" placement="bottom">
          <Icon type="md-settings" size="23" />
        </Tooltip>
      </a>
      <Dropdown class="avator-wrapper" style="margin-left: 20px" @on-click="handleClick">
        <a href="javascript:void(0)">
          admin
          <Icon type="md-arrow-dropdown" />
          <Avatar :src="avatorUrl"></Avatar>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="userCenter">{{$t('header.userCenter')}}</DropdownItem>
          <DropdownItem name="logout">{{$t('header.logout')}}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <Drawer class="setting-wrapper" width="320" :closable="true" v-model="isSettingOpened">
      <header slot="header">
        <Icon type="md-settings" size="19" />
        <span>{{$t('header.setting')}}</span>
      </header>
      <p class="setting-label">{{$t('header.langLabel')}}</p>
      <Row :gutter="8">
        <template v-for="item in setting.langs">
          <i-col span="6" :key="item.lang">
            <Tooltip :content="item.title">
              <a href="javascript:void(0)" @click="setLang(item.lang)">
                <img :src="item.img" alt="">
              </a>
            </Tooltip>
          </i-col>
        </template>
      </Row>
    </Drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      canFullScreen: false,
      isFullScreen: false,
      isSettingOpened: false,
      img: () => import('../../../assets/zh.png'),
      setting: {
        langs: [
          { title: this.$t('header.zhTip'), lang: 'zh_CN', img: require('../../../assets/zh.png') },
          { title: this.$t('header.enTip'), lang: 'en_US', img: require('../../../assets/en.jpg') },
          { title: this.$t('header.jaTip'), lang: 'ja_JP', img: require('../../../assets/ja.png') },
          { title: this.$t('header.koTip'), lang: 'ko_KR', img: require('../../../assets/ko.png') }
        ]
      }
    }
  },
  props: {
    currentPath: {
      type: Array,
      default: () => ['首页']
    },
    avatorUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    openSetting () {
      this.isSettingOpened = true
    },
    setLang (lang) {
      this.$i18n.locale = lang
    },
    toggleFullScreen () {
      if (this.canFullScreen) {
        if (this.isFullScreen) {
          // 关闭全屏
          this.exitFullScreen()
          this.isFullScreen = false
        } else {
          // 打开全屏
          this.requestFullScreen(document.documentElement)
          this.isFullScreen = true
        }
      } else {
        this.$Message.warning({
          content: '当前浏览器暂不支持全屏模式，请切换浏览器后重新尝试！',
          duration: 3
        })
      }
    },
    requestFullScreen (element) {
      // 判断各种浏览器，找到正确的方法
      const requestMethod = element.requestFullScreen || //W3C
        element.webkitRequestFullScreen || //Chrome, safari
        element.mozRequestFullScreen || //FireFox
        element.msRequestFullScreen; //IE11
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    exitFullScreen () {
      var exitMethod = document.exitFullscreen || //W3C
        document.mozCancelFullScreen || //FireFox
        document.webkitExitFullscreen || //Chrome等
        document.msExitFullscreen; //IE11
      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") { //for Internet Explorer
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
        
      }
    },
    addFullScreenListener () {
      const self = this
      window.onresize = function() {
        self.isFullScreen = self.checkFullScreen()
      }
    },
    checkFullScreen () {
      let isFullScreen = document.fullscreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement
      if (isFullScreen === undefined) {
        isFullScreen = false
      }
      return isFullScreen
    },
    handleClick (action) {
      switch (action) {
        case 'logout':
          this.$store.commit('logout')
          this.$router.push('/login')
          break;
      
        default:
          break;
      }
    }
  },
  created () {
    // 检查浏览器是否支持全屏
    this.canFullScreen = document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    if (this.canFullScreen) {
      this.addFullScreenListener()
    }
  }
}
</script>
