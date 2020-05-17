<template>
  <div class="tree-parent" :style="parentStyle">
    <div :class="{
    'tree':true
  }" :style="style" ref="root">
      <ul>
        <tree-node
          v-for="child in root.childNodes"
          :node="child"
          :key="child.id"
          :zoom="zoom"
          :root="true"
          :left="true"
          :right="true"
          :outLine="outLine"
        ></tree-node>
      </ul>
    </div>
  </div>
</template>

<script>
import TreeNode from './tree-node'
export default {
  name: 'tree',
  components: {
    TreeNode
  },
  props: ['zoom', 'root', 'offset', 'outLine', 'setOffset'],

  methods: {},

  computed: {
    parentStyle: function() {
      let right = this.offset.right > this.offset.right1 ? this.offset.right : this.offset.right1
      let scaleWidth = 1
      let scaleHeight = 1
      if (this.outLine) {
        let offsetWidth = right - this.offset.left * 2
        let offsetHeight = this.offset.height ? parseInt(this.offset.height) : 0
        scaleWidth = 240 / offsetWidth
        scaleHeight = 120 / offsetHeight
      } else {
        scaleWidth = this.zoom / 5
        scaleHeight = this.zoom / 5
      }
      let width = (right - this.offset.left * 2) * scaleWidth + 'px'
      let height = this.offset.height * scaleHeight + 'px'

      return {
        width,
        height
      }
    },
    style: function() {
      let width = this.offset && this.offset.width ? this.offset.width + 'px' : '10000px'
      let right = this.offset.right > this.offset.right1 ? this.offset.right : this.offset.right1
      let scaleWidth = ''
      let scaleHeight = ''
      let transform = ''
      let marginLeft = ''
      let left = ''

      if (this.outLine) {
        let offsetWidth = right - this.offset.left * 2
        let offsetHeight = this.offset.height ? parseInt(this.offset.height) : 0
        scaleWidth = 240 / offsetWidth
        scaleHeight = 120 / offsetHeight
        transform = 'scale(' + scaleWidth + ', ' + scaleHeight + ')'
      } else {
        scaleWidth = this.zoom / 5
        transform = 'scale(' + scaleWidth + ')'
      }
      marginLeft = ((scaleWidth - 1) / 2) * parseInt(this.offset.width) + 'px'

      left = -1 * this.offset.left * scaleWidth + 'px'
      return {
        width: width,
        left: left,
        transform: transform,
        marginLeft: marginLeft
      }
    }
  },

  updated() {},

  mounted() {
    if (!this.outLine) {
      function getWidth(dom) {
        return parseInt(getComputedStyle(dom).getPropertyValue('width'))
      }
      function getHeight(dom) {
        return parseInt(getComputedStyle(dom).getPropertyValue('height'))
      }

      function getLeft(dom) {
        var offset = dom.offsetLeft
        if (dom.offsetParent != null && dom.className != 'tree') offset += getLeft(dom.offsetParent)
        return offset
      }

      function getTop(dom) {
        var offset = dom.offsetTop
        if (dom.offsetParent != null && dom.className != 'tree') offset += getTop(dom.offsetParent)
        return offset
      }

      // 获取内容区的宽和高
      let rootDom = this.$refs.root
      let width = getWidth(rootDom.getElementsByClassName('tree-node-root')[0])
      let height = getHeight(rootDom.getElementsByClassName('tree-node-root')[0])

      // 获取最左侧以及最右侧相对tree的便宜
      let leftNodes = document.getElementsByClassName('left-node')
      let leftNode = null
      let left = 0
      if (leftNodes.length > 0) {
        leftNode = leftNodes[leftNodes.length - 1]
        left = getLeft(leftNode)
      }

      let rightNodes = document.getElementsByClassName('right-node')
      let rightNode = null
      let right = 0
      let rightNode1 = null
      let right1 = 0

      if (leftNodes.length > 0) {
        rightNode = rightNodes[rightNodes.length - 1]
        right = getLeft(rightNode) + getWidth(rightNode) + 5
        right1 = right
        if (leftNodes.length > 1) {
          rightNode1 = rightNodes[rightNodes.length - 2]
          right1 = getLeft(rightNode1) + getWidth(rightNode1) + 5
        }
      }

      this.setOffset({
        width,
        height,
        left,
        right,
        right1
      })
      console.log('width', width, 'height', height, 'left', left, 'right', right, 'right1', right1)
    }
  }
}
</script>

<style>
/* 变动的样式 begin */
.tree-parent {
  position: relative;
  overflow: hidden;
}
.tree {
  width: 10000px;
  position: absolute;
  --man: green; /* 默认男性背景色 */
  --woman: red; /* 默认女性背景色 */
  --wife: yellow; /* 默认妻子背景色 */
}

.tree li.tree-node-root {
  padding-bottom: 100px;
}
.tree li.has_wife::after {
  width: calc(50% + 130px);
  left: calc(50% - 130px);
}

.tree li li:only-child::before {
  display: inline-block;
  content: '';
  position: absolute;
  top: 0;
  left: calc(50% - 5px);
  border-right: 1px solid #ccc;
  width: 0;
  height: 20px;
}

.tree li:only-child {
  /* padding-top: 0; */
  position: absolute;
  left: 0px;
}

.tree li.has_wife:last-child::before {
  right: calc(50% + 125px);
}

.tree ul.has_wife {
  padding-right: 250px;
}

.tree ul .has_wife > ul::before {
  left: calc(50% - 130px);
  top: -5px;
  height: 25px;
}

.tree li a {
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-decoration: none;
  color: #666;
  font-family: arial, verdana, tahoma;
  font-zoom: 11px;
  display: inline-block;

  width: 200px;
  height: 100px;

  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;

  box-sizing: border-box;

  background: var(--man);
}

.tree li.women a {
  background: var(--woman);
}

.tree li a.has_wife {
  width: 450px;
  border: 0px;
  padding: 0px;
  margin: 0px 5px;
  position: relative;
  background: none;
}

.tree li a.has_wife div {
  width: 200px;
  height: 100px;
  box-sizing: border-box;
  position: absolute;

  border: 1px solid #ccc;
  padding: 5px 10px;
  text-decoration: none;
  color: #666;
  font-family: arial, verdana, tahoma;
  font-zoom: 11px;
  display: inline-block;

  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}

.tree li a.has_wife .husband {
  left: 0px;
  background: var(--man);
}

.tree li a.has_wife .wife {
  left: 250px;
  background: var(--wife);
}

.tree li a.has_wife span {
  width: 50px;
  border-top: 1px solid #ccc;
  position: absolute;
  left: 200px;
  top: 50%;
}

.tree li a:hover,
.tree li a.has_wife:hover div,
.tree li a:hover + ul li a,
.tree li a:hover + ul li a.has_wife div {
  background: #c8e4f8;
  color: #000;
  border: 1px solid #94a0b4;
}

.tree li a.has_wife:hover,
.tree li a:hover + ul li a.has_wife {
  background: none;
  border: 0px;
}

/* 变动的样式 end */

/* 原有的样式 begin */
.tree ul {
  padding-top: 20px;
  position: relative;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}

/*We need to remove left-right connectors from elements without  
any siblings*/
.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/

/*Remove left connector from first child and  
right connector from last child*/
.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}

/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}

.tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
}

/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/

/*Connector styles on hover*/
.tree li a:hover + ul li::after,
.tree li a:hover + ul li::before,
.tree li a:hover + ul::before,
.tree li a:hover + ul ul::before {
  border-color: #94a0b4;
}

/* 原有的样式 end */

/* 其他样式 begin */
.plus {
  position: fixed;
  right: 50px;
  top: 50px;
}

.minus {
  position: fixed;
  right: 50px;
  top: 100px;
}

/* 其他样式 end */
</style>