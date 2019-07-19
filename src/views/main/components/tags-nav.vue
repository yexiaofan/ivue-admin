<style lang="less" scoped>
@import "../../../base.less";
.tags-nav {
  display: grid;
  grid-template-columns: 20px auto 20px 24px;
  grid-gap: 2px;
  justify-items: stretch;
  align-items: center;
  background-color: @divider-color;
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
    position: relative;
    .tags-wrapper-scroll {
      background-color: aqua;
      height: 36px;
      display: flex;
      position: absolute;
      top: -18px;
      left: 0;
      z-index: 0;
      white-space: nowrap;
      .tag {
        flex-shrink: 0;
      }
    }
  }
}
</style>

<template>
  <div class="tags-nav">
    <a>
      <Icon type="ios-arrow-back" size="16" />
    </a>
    <div class="tags-wrapper" ref="tagsWrapper" id="test">
      <div
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
    <a>
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
import { setTimeout, clearTimeout, setImmediate } from 'timers';
export default {
  data () {
    return {
      currentPageOpenedName: null,
      tagsWrapperWidth: 0,
      scrollWrapperWidth: 0,
      tagClosedWidth: 0,
      leftPosition: 0
    };
  },
  props: {
    pageOpenedList: {
      type: Array
    },
    isOpenNewPage: {
      type: Boolean
    }
  },
  watch: {
    currentPageOpenedName () {
      this.$nextTick(() => {
        this.setScrollWrapperWidth()
        const isTagVisible = this.checkTagIsVisible(this.currentPageOpenedName)
        if (!isTagVisible) {
          console.log(isTagVisible)
          this.setTagSelectedPosition()
        }
      })
    },
    leftPosition () {
      console.log('^^^^^^^^^^^^')
      console.log(this.leftPosition)
      this.leftPosition = this.leftPosition > 0 ? 0 : this.leftPosition
    },
    $route (to) {
      this.currentPageOpenedName = to.name
    } 
  },
  methods: {
    closeTags (action) {
      this.leftPosition = 0
      this.$emit("closeTags", action)
    },
    closeTag (index) {
      // 移除单个tag，且首页的tag无法移除
      if (index !== 0) {
        this.$emit("closeTags", index)
      }
      if (this.$refs.tagsPageOpened[index].name !== this.currentPageOpenedName) {
        this.tagClosedWidth = event.target.parentNode.clientWidth
        this.setScrollWrapperWidth(this.tagClosedWidth)
        this.compouteScrollWrapperPosition(this.tagClosedWidth)
      }
    },
    tagSelected (index) {
      this.$emit("tagSelected", index);
    },
    checkTagIsVisible (name) {
      let isVisible = false
      const refsTagList = this.$refs.tagsPageOpened
      const length = refsTagList.length

      if (refsTagList[length - 1].name === this.currentPageOpenedName) {
        return isVisible
      }

      let tagSelectedWidth = 0
      let tagSelectedOffsetLeft = 0
      for (let i = 0; i < length; i++) {
        if (name === refsTagList[i].name) {
          tagSelectedWidth = refsTagList[i].$el.clientWidth
          tagSelectedOffsetLeft = refsTagList[i].$el.offsetLeft
          break
        }
      }
      const leftDiffValue = tagSelectedOffsetLeft + this.leftPosition
      const rightDiffValue = this.tagsWrapperWidth - (leftDiffValue + tagSelectedWidth)
      if (leftDiffValue >= 0 && rightDiffValue >= 0) {
        isVisible = true
      }
      return isVisible
    },
    setTagSelectedPosition () {
      const refsTagList = this.$refs.tagsPageOpened
      const length = refsTagList.length
      let tagSelectedOffsetLeft = 0
      for (let i = 0; i < length; i++) {
        if (this.currentPageOpenedName === refsTagList[i].name) {
          console.log(this.currentPageOpenedName)
          console.log(this.leftPosition)
          console.log(this.scrollWrapperWidth)
          console.log(this.tagsWrapperWidth)
          if (i === length - 1) {
            this.leftPosition += -(this.scrollWrapperWidth - this.tagsWrapperWidth + this.leftPosition)
            console.log(this.leftPosition)
          } else {
            // 多减1个像素，防止重边
            console.log('175')
            this.leftPosition = -(refsTagList[i+1].$el.offsetLeft - this.tagsWrapperWidth - 1)
          }
          break
        }
      }
    },
    setScrollWrapperWidth (tagClosedWidth) {
      this.tagsWrapperWidth = this.$refs.tagsWrapper.clientWidth
      let scrollWrapperWidth = this.$refs.tagsWrapperScroll.clientWidth
      // 重新渲染后实际tagsWrapperScroll的宽度
      scrollWrapperWidth = tagClosedWidth
        ? scrollWrapperWidth - tagClosedWidth - 4
        : scrollWrapperWidth
      this.scrollWrapperWidth = scrollWrapperWidth
    },
    compouteScrollWrapperPosition (tagClosedWidth) {
      if (tagClosedWidth) {
        // closeTag event
        if (this.scrollWrapperWidth > this.tagsWrapperWidth) {
          console.log('***********')
          let diff_value = this.leftPosition + tagClosedWidth
          if (diff_value < 0) {
            // 偏移距离误差修正
            const diff_x = this.computeOffsetError()
            console.log(diff_x)
            diff_value += diff_x
          }
          this.$nextTick(() => { 
            setTimeout(() => {
              console.log('205')
              this.leftPosition = Math.min(diff_value, 0)
              // 
            }, 200)
          })
        } else {
          console.log('$$$$$$$$$$')
          this.$nextTick(() => {
            setTimeout(() => {
              console.log('214')
              this.leftPosition = 0
            }, 200)
          })
        }
      }
    },
    computeOffsetError () {
      const refsTagList = this.$refs.tagsPageOpened
      const length = refsTagList.length
      const tagNodeSelected = refsTagList[length - 1].$el
      // 检查最后一个tag是否可见
      const isTagVisible = this.checkTagIsVisible(refsTagList[length - 1].name)
      console.log(isTagVisible)
      if (isTagVisible) {
        // 获取偏移误差 W-(offset-|left|+tagWidth)
        const diff_x = this.tagsWrapperWidth - (tagNodeSelected.offsetLeft + this.leftPosition + tagNodeSelected.clientWidth)
        return diff_x
      }
    }
  },
  created () {
    this.currentPageOpenedName = this.$route.name
  }
}
</script>
