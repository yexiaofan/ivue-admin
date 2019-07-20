<style lang="less" scoped>
@import "../../../base.less";
.header-nav {
  display: flex;
  align-items: center;
  height: 64px;
  color: @title-color;
  // display: grid;
  // grid-template-columns: 26px auto 264px;
  // column-gap: 24px;
  // align-items: center;
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
      <a class="dark-a" href="javascript:void(0)">
        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
          <Icon :type="isFullScreen ? 'md-contract' : 'md-expand'" :size="23"></Icon>
        </Tooltip>
      </a>
      <a class="dark-a" href="javascript:void(0)">
        <Tooltip content="设置" placement="bottom">
          <Icon type="md-settings" size="23" />
        </Tooltip>
      </a>
      <Dropdown class="avator-wrapper" style="margin-left: 20px">
        <a href="javascript:void(0)">
          admin
          <Icon type="md-arrow-dropdown" />
          <Avatar :src="avatorUrl"></Avatar>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>个人中心</DropdownItem>
          <DropdownItem>退出账号</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPath: {
      type: Array,
      default: () => ['首页']
    },
    isFullScreen: {
      type: Boolean,
      default: () => false
    },
    avatorUrl: {
      type: String,
      default: ''
    }
  }
}
</script>
