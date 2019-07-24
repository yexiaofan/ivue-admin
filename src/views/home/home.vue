<style lang="less" scoped>

</style>

<template>
  <div style="height: 1000px;">
    home
    {{$t("header.setting")}}
    <br>
    <a @click="$router.push({name: 'test11-2'})">go to home-child</a>
  </div>
</template>

<script>
export default {
}
</script>
