<style lang="less" scoped>
@import '../../../base.less';
.sider-menu {
  text-align: left;
  font-size: 32px;
  .menu-item-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;/**不换行**/
    display: inline-block;
  }
  .menu-slected {
    background-color: @theme-color!important;
    color: @white !important;
  }
}
</style>

<template>
  <div class="sider-menu">
    <Menu theme="dark" :open-names="['test']" accordion width="200" :active-name="activeName" @on-select="menuSlected">
      <template v-for="(menu_1, index) in menuList">
        <template v-if="menu_1.children.length === 1">
          <MenuItem :name="menu_1.children[0].name" :key="'menu_1_' + index"
            :class="[activeName === menu_1.children[0].name ? 'menu-slected' : '']">
            <span class="menu-item-title"><Icon :type="menu_1.children[0].meta.icon" />&nbsp;{{menu_1.children[0].meta.title}}</span>
          </MenuItem>
        </template>
        <template v-else>
          <Submenu :name="menu_1.name" :key="'menu_1_' + index">
            <template slot="title">
              <span class="menu-item-title">
                <Icon :type="menu_1.meta.icon" />&nbsp;{{menu_1.meta.title}}
              </span>
            </template>
            <template v-for="(menu_2, index) in menu_1.children">
              <MenuItem :name="menu_2.name" :key="'menu_2_' + index">
                <span class="menu-item-title"><Icon :type="menu_2.meta.icon" />&nbsp;{{menu_2.meta.title}}</span>
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    menuList: {
      type: Array
    }
  },
  computed: {
    activeName () {
      return this.$route.name
    }
  },
  methods: {
    menuSlected (name) {
      this.$router.push({ name })
    }
  }
}
</script>
