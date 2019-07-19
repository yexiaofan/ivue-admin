<style lang="less" scoped>
.welcome {
  background-image: url("../assets/welcome-bg.jpg");
  background-size: 100% 100%;
  text-align: center;
  color: white;

  h1 {
    padding-top: 30vh;
    font-size: 5rem;
    letter-spacing: 12px;
  }

  h2 {
    font-size: 56px;
    letter-spacing: 4px;
  }

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 18px;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    color: white;
  }
}
</style>

<template>
  <div class="wrapper welcome">
    <h1>欢迎使用比翼平台模板工程</h1>
    <h2>CODE&DESIGNER</h2>
    <a href="#" @click.prevent="startUsing">开始使用 >></a>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  methods: {
    startUsing () {
      this.$router.push('/home')
    }
  }
}
</script>
