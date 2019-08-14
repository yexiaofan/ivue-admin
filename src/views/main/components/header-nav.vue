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
      font-size: 1.25rem
        /* 20/16 */
      ;
    }

    .config-wrapper {
      flex: 0 0 264px;
      line-height: 32px;
      text-align: left;

      a {
        i {
          font-size: 1.25rem
            /* 20/16 */
          ;
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
        font-size: .875rem
          /* 14/16 */
        ;
        margin-left: 4px;
        font-weight: bold;
      }
    }

    .setting-label {
      font-size: .8125rem
        /* 13/16 */
      ;
      margin: 4px 0;
    }
  }

</style>

<template>
  <div class="header-nav">
    <Icon type="ios-menu-outline" size="32" :style="styles" @click="toggleShrink" />
    <div class="bread-crumb">
      <Breadcrumb>
        <BreadcrumbItem v-for="(path, index) in currentPath" :key="index" style="font-size: 0.875rem;">{{path}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="config-wrapper clear-float">
      <a class="dark-a" href="javascript:void(0)" @click="toggleFullScreen">
        <Tooltip :content="isFullScreen ? $t('header.exitFullscreen') : $t('header.fullScreen')" placement="bottom">
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
import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        browserKernel: '',
        canFullScreen: false,
        isFullScreen: false,
        isSettingOpened: false,
        img: () => import('../../../assets/zh.png'),
        setting: {
          langs: [{
              title: this.$t('header.zhTip'),
              lang: 'zh_CN',
              img: require('../../../assets/zh.png')
            },
            {
              title: this.$t('header.enTip'),
              lang: 'en_US',
              img: require('../../../assets/en.jpg')
            },
            {
              title: this.$t('header.jaTip'),
              lang: 'ja_JP',
              img: require('../../../assets/ja.png')
            },
            {
              title: this.$t('header.koTip'),
              lang: 'ko_KR',
              img: require('../../../assets/ko.png')
            }
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
      },
      shrink: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      styles() {
        return {
          transform: this.shrink ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer'
        }
      }
    },
    methods: {
      openSetting() {
        this.isSettingOpened = true
      },
      setLang(lang) {
        this.$i18n.locale = lang
      },
      toggleFullScreen() {
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
      requestFullScreen(element) {
        // 判断各种浏览器，找到正确的方法
        const requestMethod = element.requestFullScreen || // W3C
          element.webkitRequestFullScreen || // Chrome, safari
          element.mozRequestFullScreen || // FireFox
          element.msRequestFullscreen // IE11
        if (requestMethod) {
          requestMethod.call(element)
        }
      },
      exitFullScreen() {
        var exitMethod = document.exitFullscreen || // W3C
          document.mozCancelFullScreen || // FireFox
          document.webkitExitFullscreen || // Chrome等
          document.msExitFullscreen // IE11
        if (exitMethod) {
          exitMethod.call(document)
        }
      },
      addFullScreenListener() {
        const self = this
        document.onkeydown = function (e) {
          if (e && e.keyCode == 122) { // 捕捉F11键盘动作
            e.preventDefault() // 阻止F11默认动作
            self.toggleFullScreen()
          }
        }
        // 监听不同浏览器的全屏事件，并件执行相应的代码
        switch (self.browserKernel) {
          case 'webkit':
            document.onwebkitfullscreenchange = function () {
              if (document.webkitIsFullScreen) {
              self.isFullScreen = true
              } else {
                self.isFullScreen = false
              }
            }
            break
          case 'gecko':
            document.onmozfullscreenchange = function () {
              if (document.mozFullScreen) {
                self.isFullScreen = true
              } else {
                self.isFullScreen = false
              }
            }
            break
          case 'trident':
            document.onmsfullscreenchange = function () {
              if (document.msFullscreenElement) {
                self.isFullScreen = true
              } else {
                self.isFullScreen = false
              }
            }
            break
          case 'others':
            document.onfullscreenchange = function () {
              if (document.fullscreen) {
                self.isFullScreen = true
              } else {
                self.isFullScreen = false
              }
            }
            break
          default:
            break
        }
      },
      handleClick(action) {
        switch (action) {
          case 'logout':
            this.$store.commit('logout')
            this.$router.push('/login')
            break
          default:
            break
        }
      },
      toggleShrink() {
        this.$emit('toggleShrink')
      }
    },
    created() {
      // 检查浏览器是否支持全屏
      this.canFullScreen = document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      if (document.webkitFullscreenEnabled) {
        this.browserKernel = 'webkit'
      } else if (document.mozFullScreenEnabled) {
        this.browserKernel = 'gecko'
      } else if (document.msFullscreenEnabled) {
        this.browserKernel = 'trident'
      } else if (document.fullscreenEnabled) {
        this.browserKernel = 'others'
      }
      if (this.canFullScreen) {
        this.addFullScreenListener()
      }
    },
    destroyed() {
      document.onkeydown = null
      switch (this.browserKernel) {
        case 'webkit':
          document.onwebkitfullscreenchange = null
          break
        case 'gecko':
          document.onmozfullscreenchange = null
          break
        case 'trident':
          document.onmsfullscreenchange = null
          break
        case 'others':
          document.onfullscreenchange = null
          break
        default:
          break
      }
    }
  }

</script>
