<template>
  <div class="tree-outline">
    <div class="outline-box">
      <tree :zoom="zoom" :root="root" :offset="offset" :outLine="true"></tree>
    </div>
    <div class="outline-bottom">
      <a-icon class="outline-icon" @click="minus" type="minus" title="缩小" />
      <div class="outline-progress-box">
        <div
          :style="{
            width: (192 / zoomLength) * (zoom - minZoom + 1)  + 'px'
          }"
          class="outline-progress"
        />
      </div>
      <a-icon class="outline-icon" @click="plus" type="plus" title="放大" />
    </div>
  </div>
</template>

<script>
import Tree from './tree'
export default {
  name: 'tree-index',
  components: {
    Tree
  },

  props: ['zoom', 'root', 'minus', 'plus', 'zoomLength', 'minZoom', 'offset'],

  methods: {}
}
</script>

<style scope>
.tree-outline {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #fff;
}
.outline-box {
  position: relative;
  width: 242px;
  height: 122px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
}

.outline-box-content {
  position: relative;
  overflow: hidden;
  background: red;
}

.outline-icon {
  width: 14px;
  height: 14px;
  color: red;
}

.outline-progress-box {
  position: relative;
  margin-left: 5px;
  margin-right: 5px;
  width: 192px;
  height: 2px;
  background-color: #d8d8d8;
  display: inline-block;
}

.outline-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: #ee2223;
  cursor: pointer;
}
</style>