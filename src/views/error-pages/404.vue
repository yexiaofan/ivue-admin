<style lang="less" scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-of-type {
    font-size: 184px;
    font-weight: bold;
    text-shadow: 5px 1px 5px rgba(0, 0, 0, 1)
  }
  span:last-of-type {
    font-size: 32px;
  }
  a {
    font-size: 20px;
  }
}
</style>

<template>
  <div class="wrapper page-404">
    <span>404</span>
    <span>您访问的页面暂不在地球服务区内！o(ㄒoㄒ)o</span><br>
    <a href="javascript:void(0)" @click="$router.push('/home')">返回首页</a>
  </div>
</template>

<script>
export default {}
</script>
