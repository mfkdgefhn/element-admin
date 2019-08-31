<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" type="width:80%" />
        <div class="tree">
          <el-tree
            ref="menuList"
            :props="defaultProps"
            :data="data"
            show-checkbox
            default-expand-all
            :expand-on-click-node="expandOnClickNode"
            node-key="menuId"
            empty-text="没有菜单"
            highlight-current
            check-on-click-node
            :default-checked-keys="menuData"
            class="memu-tree"
            @current-change="currentChange"
          />
          <!-- @node-click="handleNodeClick" -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchMenuList } from '@/api/article'

export default {
  props: {
    roleId: {
      type: Number,
      default: null
    },
    menuData: {
      type: Array,
      default: () => []
    },
    sure: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 8
      },
      span: 24,
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      defaultCheckedKey: [],
      expandOnClickNode: false
    }
  },
  watch: {
    menuData(val) {
      this.$refs.menuList.setCheckedKeys([])
      this.defaultCheckedKey = val
    },
    sure(val) {
      // 向父组件传值
      this.$emit('editMenu', this.$refs.menuList.getCheckedNodes())
    }
  },
  mounted() {
    this.initMenuList()
  },
  methods: {
    // 初始化部门列表
    initMenuList() {
      this.listLoading = true
      fetchMenuList(this.listQuery).then(response => {
        this.data = response.data // [0].children
      })
    },
    // 节点选中变动触发的节点
    // 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象
    currentChange(a, b) {
      // console.log(this.$refs.menuList.getCheckedNodes())
    },
    // 点击树节点获取用户列表
    handleNodeClick(data) {
      // this.listLoading = true
      // 遍历部门及下级部门的所有ID
      // var depts = []
      // this.retrievalTree(this.routesData, data, depts)
      // 获取该部门下所有ID进一个数组内
      // var deptIds = []
      // this.retrievalDeptId(depts, deptIds)
      // 获取后台数据
      // getUserByDeptIds(deptIds.join(',')).then(response => {
      //   this.deptUser = response.data
      //   this.$store.dispatch('user/SET_USERLIST', response.data)
      //   setTimeout(() => {
      //     this.listLoading = false
      //   }, 1.5 * 1000)
      // })

      // var test = this.$refs.deptList.getCheckedKeys()

    }
  }
}
</script>

<style>
.left-tree {
  border: 1px solid #e6ebf5;
  border-radius: 5px;
}

.tree-margin {
  margin: 0px;
  text-align: center;
}
.tree-input {
  width: 90%;
  margin-top: 15px;
  margin-bottom: 10px;
}

.menu-tree {
  margin-bottom: 30px;
}
.vertical-line {
  color: #409eff;
  height: 200px;
  width: 100%;
  border: 1px solid #000;
}
.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block;
}
.tree {
  overflow-y: auto;
  overflow-x: scroll;
  height: 400px;
}
</style>
