<template>
  <li :class="{
      'has_wife': node.wife
    }">
    <a href="#" class="has_wife" v-if="node.wife">
      <div class="husband">{{node.name}}</div>
      <span></span>
      <div class="wife">{{node.wife}}</div>
    </a>
    <a href="#" v-else>{{node.name}}</a>
    <ul :class="{
      'has_wife': node.wife
    }" v-if="node.childNodes">
      <tree-node v-for="child in node.childNodes" :node="child" :key="child.name"></tree-node>
    </ul>
  </li>
</template>

<script type="text/jsx">
export default {
  name: 'TreeNode',

  componentName: 'TreeNode',

  props: {
    node: {
      default() {
        return {}
      }
    }
  },

  data() {
    return {}
  }
}
</script>
