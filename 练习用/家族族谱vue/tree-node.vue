<template>
  <li
    :class="{
      'tree-node-root': root,
      'has_wife': node.wife,
      'women': node.sex === 'women',
      'left-node': !outLine && left,
      'right-node': !outLine && right
    }"
    :id="'tree-id-' + node.id"
  >
    <a href="#" class="has_wife" v-if="node.wife">
      <div class="husband">{{node.name}}</div>
      <span></span>
      <div class="wife">{{node.wife}}</div>
    </a>
    <a href="#" v-else>{{node.name}}</a>
    <ul :class="{
      'has_wife': node.wife
    }" v-if="node.childNodes">
      <tree-node v-for="(child, index) in node.childNodes" :node="child" :key="child.name" :zoom="zoom" :left="left && index == 0" :right="right && index == (node.childNodes.length - 1)" :outLine="outLine"></tree-node>
    </ul>
  </li>
</template>

<script type="text/jsx">
export default {
  name: 'TreeNode',

  componentName: 'TreeNode',

  props: ['zoom', 'node', 'root', 'left', 'right', 'outLine'],

  data() {
    return {}
  },

  created(){

  }
}
</script>
