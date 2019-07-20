<style lang="less" scoped>
.box1 {
  background-color: chartreuse;
  height: 200px;
  position: relative;
  .box2 {
    background-color: cornflowerblue;
    height: 100px;
    line-height: 100px;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    flex-wrap: nowrap;
  }
}
span {
  flex-shrink: 0;
  flex-grow: 0;
  display: inline-block;
  width: 100px;
  background-color: yellow;
  font-weight: bold;
  margin: 0 8px;
}
</style>

<template>
  <div>
    home
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: []
    }
  },
  watch: {
    test () {
      this.$nextTick(() => {
        console.log(this.$refs.box2.clientWidth)
      })
    }
  },
  methods: {
    add () {
      this.test.push('测试span')
    },
    remove () {
      this.test.pop()
    }
  }
}
</script>
