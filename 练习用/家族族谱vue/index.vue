<template>
  <div class="tree">
    <ul>
      <!-- <div> -->
      <tree-node v-for="child in root.childNodes" :node="child" :key="child.name"></tree-node>
      <!-- </div> -->
    </ul>
  </div>
</template>

<script>
import TreeNode from "./tree-node";
export default {
  name: "tree",
  components: {
    TreeNode
  },
  data() {
    return {
      root: {
        childNodes: [
          {
            name: "吉万里",
            wife: "冯氏",
            childNodes: [
              {
                name: "吉会营",
                wife: "高玉荣",
                childNodes: [
                  {
                    name: "吉广志",
                    self: true,
                    wife: "陈静",
                    childNodes: [
                      {
                        name: "吉庆泽"
                      },
                      {
                        name: "吉小敏",
                        sex: "women"
                      }
                    ]
                  },
                  {
                    name: "吉广安",
                    wife: "聂琴",
                    childNodes: [
                      {
                        name: "吉又嘉",
                        sex: "women"
                      }
                    ]
                  },
                  {
                    name: "吉圆圆",
                    sex: "women"
                  }
                ]
              },
              {
                name: "吉思厂",
                wife: "石氏",
                childNodes: [
                  {
                    name: "吉平",
                    sex: "women"
                  },
                  {
                    name: "吉南南",
                    wife: "孙娜",
                    childNodes: [
                      {
                        name: "吉庆奥"
                      },
                      {
                        name: "吉梦娇",
                        sex: "women"
                      }
                    ]
                  },
                  {
                    name: "吉娜",
                    sex: "women"
                  },
                  {
                    name: "吉北北",
                    wife: "王晶",
                    childNodes: [
                      {
                        name: "吉庆恩"
                      },
                      {
                        name: "吉丹妮",
                        sex: "women"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }
};
</script>

<style>
.tree {
  width: 7000px;
}
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
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}

.tree li.has_wife::after {
  width: calc(50% + 130px);
  left: calc(50% - 130px);
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
.tree li:only-child {
  padding-top: 0;
  position: absolute;
  left: 0px;
}

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
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
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
  font-size: 11px;
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
}

.tree li a.has_wife {
  width: 450px;
  border: 0px;
  padding: 0px;
  position: relative;
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
  font-size: 11px;
  display: inline-block;

  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}

.tree li a.has_wife .husband {
  left: 0px;
}

.tree li a.has_wife .wife {
  left: 250px;
}

.tree li a.has_wife span {
  width: 50px;
  border-top: 1px solid #ccc;
  position: absolute;
  left: 200px;
  top: 50%;
}

/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
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

/*Connector styles on hover*/
.tree li a:hover + ul li::after,
.tree li a:hover + ul li::before,
.tree li a:hover + ul::before,
.tree li a:hover + ul ul::before {
  border-color: #94a0b4;
}
</style>