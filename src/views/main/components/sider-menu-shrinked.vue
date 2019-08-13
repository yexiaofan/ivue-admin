<style lang="less" scoped>
  @import '../../../base.less';

  .sider-menu-shrinked {
    font-size: 20px;
    color: @white;
    &-item {
      cursor: pointer;
      margin-bottom: 16px;
      text-align: center;
      .sing-shrink-menu {
        padding-bottom: 4px;
      }
      .menu-slected {
        background-color: @theme-color;
      }
    }
  }

</style>

<template>
  <div class="sider-menu-shrinked">
    <template v-for="(menu_1, index) in menuList">
      <div class="sider-menu-shrinked-item" :key="'shrinked_menu_1_' + index">
        <template v-if="menu_1.children && menu_1.children.length > 1">
          <Dropdown placement="right-start" @on-click="navigateRoute">
            <Icon :type="menu_1.icon"></Icon>
            <DropdownMenu slot="list">
              <template v-for="(menu_2, index) in menu_1.children">
                <template v-if="menu_2.children">
                  <Dropdown placement="right-start" :key="'shrink_menu_2_' + index">
                    <DropdownItem :name="menu_2.name" :selected="activeName === menu_2.name">
                      {{menu_2.title}}
                    </DropdownItem>
                    <template v-for="(menu_3, index) in menu_2.children">
                      <DropdownMenu slot="list" :key="'shrink_menu_3_' + index">
                        <DropdownItem :name="menu_3.name" :selected="activeName === menu_3.name">{{menu_3.title}}</DropdownItem>
                      </DropdownMenu>
                    </template>
                  </Dropdown>
                </template>
                <template v-else>
                  <DropdownItem :name="menu_2.name" :key="'shrink_menu_2_' + index"  :selected="activeName === menu_2.name">{{menu_2.title}}</DropdownItem>
                </template>
              </template>
            </DropdownMenu>
          </Dropdown>
        </template>
        <template v-else>
          <div class="sing-shrink-menu" @click="navigateRoute(menu_1.children[0].name)"
            :class="[activeName === menu_1.children[0].name ? 'menu-slected' : '']">
            <Tooltip :content="menu_1.children[0].title" placement="right-start">
              <Icon :type="menu_1.children[0].icon" />
            </Tooltip>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
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
    },
    openChange (openNames) {
      this.$store.commit('setCurrentMenuOpenNames', openNames)
    },
    navigateRoute (name) {
      this.$router.push({ name })
    }
  },
  created() {
    console.log(this.menuList) 
  }
}
</script>
