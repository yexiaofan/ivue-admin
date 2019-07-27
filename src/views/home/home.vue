<style lang="less" scoped>

</style>

<template>
  <div style="height: 1000px;">
    home
    {{$t("header.setting")}}
    <br>
    <a @click="$router.push({name: 'test11-2'})">go to home-child</a>
    <br>
    <a @click="$router.push({name: 'test6'})">go to test6</a>
  </div>
</template>

<script>
export default {
}
</script>
