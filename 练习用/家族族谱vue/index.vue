<template>
  <div class="root-div">
    <div class="tree-div">
      <tree :zoom="zoom" :root="root" :offset="offset" :outLine="false" :setOffset="setOffset"></tree>
    </div>
    <outline
      :zoom="zoom"
      :root="root"
      :plus="plus"
      :minus="minus"
      :zoomLength="zoomLength"
      :minZoom="minZoom"
      :offset="offset"
    ></outline>
  </div>
</template>

<script>
import Tree from './tree'
import Outline from './outline'
export default {
  name: 'tree-index',
  components: {
    Tree,
    Outline
  },

  computed: {
    zoomLength: function() {
      return this.maxZoom - this.minZoom + 1
    }
  },
  data() {
    return {
      zoom: 5,
      maxZoom: 8,
      minZoom: 2,
      offset: {
        width: 10000,
        left: 0,
        right: 10000,
        right1: 10000
      },
      root: {
        childNodes: [
          {
            name: '吉万里',
            id: '1',
            wife: '冯氏',
            childNodes: [
              {
                name: '吉会营',
                id: '2',
                wife: '高玉荣',
                childNodes: [
                  {
                    name: '吉广志',
                    id: '3',
                    self: true,
                    wife: '陈静',
                    childNodes: [
                      {
                        name: '吉庆泽',
                        id: '4'
                      },
                      {
                        name: '吉小敏',
                        id: '5',
                        sex: 'women'
                      }
                    ]
                  },
                  {
                    name: '吉广安',
                    id: '6',
                    wife: '聂琴',
                    childNodes: [
                      {
                        name: '吉又嘉',
                        id: '7',
                        sex: 'women'
                      }
                    ]
                  },
                  {
                    name: '吉圆圆',
                    id: '8',
                    sex: 'women'
                  }
                ]
              },
              {
                name: '吉思厂',
                id: '9',
                wife: '石氏',
                childNodes: [
                  {
                    name: '吉平',
                    id: '10',
                    sex: 'women'
                  },
                  {
                    name: '吉南南',
                    id: '11',
                    wife: '孙娜',
                    childNodes: [
                      {
                        name: '吉庆奥',
                        id: '12'
                      },
                      {
                        name: '吉梦娇',
                        id: '13',
                        sex: 'women'
                      }
                    ]
                  },
                  {
                    name: '吉娜',
                    id: '14',
                    sex: 'women'
                  },
                  {
                    name: '吉北北',
                    id: '15',
                    wife: '王晶',
                    childNodes: [
                      {
                        name: '吉庆恩',
                        id: '16'
                      },
                      {
                        name: '吉丹妮',
                        id: '17',
                        sex: 'women'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },

  methods: {
    plus() {
      if (this.zoom < this.maxZoom) {
        this.zoom += 1
      }
    },
    minus() {
      if (this.zoom > this.minZoom) {
        this.zoom -= 1
      }
    },
    setOffset(offset) {
      console.log('offset', offset)
      this.offset = offset
    }
  }
}
</script>

<style scoped>
.root-div {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.tree-div {
  width: calc(100% - 300px);
  height: 100%;
  overflow: auto;
  left: 300px;
  position: relative;
}
</style>