<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import './base.less';

html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}

#app {
  width: 100%;
  height: 100%;
}

.ivu-select-dropdown {
  ul {
    max-width: 120px;
    padding-top: 8px;
    li {
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;/**不换行**/
      display: inline-block;
    }
  }
}
</style>
