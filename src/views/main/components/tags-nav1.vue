<style lang="less" scoped>
@import "../../../base.less";
.tags-nav {
  display: flex;
  align-items: center;
  height: 36px;
  background-color: @background-color;
  a {
    margin-right: 1px;
  }
  a,
  .dropdown-btn {
    display: inline-block;
    color: @title-color;
    background-color: @white;
    text-align: center;
    height: 34px;
    line-height: 34px;
    position: relative;
    z-index: 10;
  }
  .tags-wrapper {
    flex: 1 1 auto;
    position: relative;
    // word-wrap: none;
    .tags-wrapper-scroll {
      display: flex;
      position: absolute;
      top: -18px;
      left: 0;
      z-index: 0;
      height: 36px;
      white-space: nowrap;
      transition: all .3s ease-in-out;
      .tag {
        flex-shrink: 0;
      }
    }
  }
}
</style>

<template>
  <div class="tags-nav">
    <a href="javascript:void(0)" @click="handleScroll('left')">
      <Icon type="ios-arrow-back" size="16" />
    </a>
    <div class="tags-wrapper" ref="tagsWrapper">
      <div
        id="test"
        class="tags-wrapper-scroll"
        ref="tagsWrapperScroll"
        :style="{ left: leftPosition + 'px' }"
      >
        <transition-group name="slide-fade">
          <Tag
            class="tag slide-fade-item"
            ref="tagsPageOpened"
            v-for="(tag, index) in pageOpenedList"
            :key="'tag_' + index"
            type="dot"
            closable
            checkable
            :name="tag.name"
            :color="tag.selected ? 'primary': 'default'"
            @on-close="closeTag(index)"
            @on-change="tagSelected(index)"
          >{{tag.title}}</Tag>
        </transition-group>
      </div>
    </div>
    <a href="javascript:void(0)" @click="handleScroll('right')">
      <Icon type="ios-arrow-forward" size="16" />
    </a>
    <Dropdown class="dropdown-btn" placement="bottom-end" @on-click="closeTags">
      <a href="javascript:void(0)">
        <Icon type="ios-arrow-down" size="16" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="closeOthers">关闭其他</DropdownItem>
        <DropdownItem name="closeAll">关闭所有</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPageOpenedName: null,
      tagsWrapperWidth: 0,
      scrollWrapperWidth: 0,
      tagClosedWidth: 0,
      leftPosition: 0,
      isTagClosedEvent: false
    }
  },
  props: {
    pageOpenedList: {
      type: Array
    }
  },
  watch: {
    currentPageOpenedName () {
      this.$nextTick(() => {
        this.setTagsWrapperScrollPosition()
      })
    },
    $route (to) {
      this.currentPageOpenedName = to.name
    }
  },
  methods: {
    closeTags (action) {
      this.isTagClosedEvent = true
      this.$emit('closeTags', action)

      this.$nextTick(() => {
        this.setTagsWrapperScrollPosition()
      })
    },
    closeTag (index) {
      this.isTagClosedEvent = true
      // 移除单个tag，且首页的tag无法移除
      if (index !== 0) {
        this.$emit('closeTags', index)
      }
      if (this.$refs.tagsPageOpened[index].name !== this.currentPageOpenedName) {
        this.$nextTick(() => {
          this.setTagsWrapperScrollPosition()
        })
      }
    },
    tagSelected (index) {
      this.$emit('tagSelected', index)
    },
    setTagsWrapperScrollPosition () {
      this.initTagsWrapperWidth().then(() => {
        this.compouteScrollWrapperPosition()
      })
    },
    initTagsWrapperWidth () {
      return new Promise((resolve, reject) => {
        this.tagsWrapperWidth = this.$refs.tagsWrapper.clientWidth
        let scrollWrapperWidth = this.$refs.tagsWrapperScroll.clientWidth
        if (this.isTagClosedEvent) {
          // 因为像素取整会存在误差，所以认为差值为10以内都是相同的值
          let interval = setInterval(() => {
            scrollWrapperWidth = this.$refs.tagsWrapperScroll.clientWidth
            if (Math.abs(scrollWrapperWidth - this.scrollWrapperWidth) > 10) {
              this.scrollWrapperWidth = scrollWrapperWidth
              this.isTagClosedEvent = false
              clearInterval(interval)
              resolve()
            }
          }, 0)
        } else {
          this.scrollWrapperWidth = scrollWrapperWidth
          this.isTagClosedEvent = false
          resolve()
        }
      })
    },
    compouteScrollWrapperPosition () {
      const refsTagList = this.$refs.tagsPageOpened
      const length = refsTagList.length
      if (this.scrollWrapperWidth >= this.tagsWrapperWidth) {
        // 如果当前路由对应最后一个tag
        if (this.currentPageOpenedName === refsTagList[length - 1].name) {
          this.leftPosition = -(this.scrollWrapperWidth - this.tagsWrapperWidth)
        } else {
          // 检查当前的tag是否处在可视区域
          let tagSelected
          for (let tag of refsTagList) {
            if (this.currentPageOpenedName === tag.name) {
              tagSelected = tag
              break
            }
          }
          const visible = this.checkTagIsVisible(tagSelected.$el)
          if (!visible.isVisible) {
            // 若不在可视区，则需要调整定位
            const diffValue = visible.position === 'left'
              ? -tagSelected.$el.offsetLeft
              : this.tagsWrapperWidth - tagSelected.$el.offsetLeft - tagSelected.$el.clientWidth - 4
            this.leftPosition = diffValue
          }
        }
      } else {
        this.leftPosition = 0
      }
    },
    checkTagIsVisible (tagSelectedNode) {
      let visible = {
        isVisible: false,
        position: 'left'
      }
      const leftDiffValue = tagSelectedNode.offsetLeft + this.leftPosition
      const rightDiffValue = this.tagsWrapperWidth - this.leftPosition - tagSelectedNode.clientWidth - tagSelectedNode.offsetLeft
      if (leftDiffValue >= 0 && rightDiffValue >= 0) {
        visible.isVisible = true
      } else {
        visible.position = rightDiffValue < 0 ? 'right' : 'left'
      }
      return visible
    },
    handleScroll (direaction) {
      if (this.scrollWrapperWidth >= this.tagsWrapperWidth) {
        // 获取在可视区域临界的tag
        let criticalTag = this.getCriticalTag(direaction)
        switch (direaction) {
          case 'left':
            this.leftPosition = Math.min(this.tagsWrapperWidth - criticalTag.$el.offsetLeft, 0)
            break
          case 'right':
            const diffValue1 = -(criticalTag.$el.offsetLeft + criticalTag.$el.clientWidth)
            const diffvalue2 = -(this.scrollWrapperWidth - this.tagsWrapperWidth)
            this.leftPosition = Math.max(diffValue1, diffvalue2)
            break
          default:
            break
        }
      }
    },
    getCriticalTag (direaction) {
      let criticalTag
      const refsTagList = this.$refs.tagsPageOpened
      for (let tag of refsTagList) {
        // 检查tag是否在可视区
        if (this.checkTagIsVisible(tag.$el).isVisible) {
          criticalTag = tag
          if (direaction === 'left') {
            break
          }
        }
      }
      return criticalTag
    }
  },
  created () {
    this.currentPageOpenedName = this.$route.name
  }
}
</script>
