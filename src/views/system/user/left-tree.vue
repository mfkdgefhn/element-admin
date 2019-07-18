<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" />
        <el-tree
          ref="deptList"
          :check-strictly="checkStrictly"
          :data="routesData"
          :check-on-click-node="checkNode"
          node-key="id"
          :show-checkbox="showCheckbox"
          :filter-node-method="filterNode"
          class="permission-tree"
          @node-click="handleNodeClick"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchTreeList, getDeptList, getUserByDeptId } from '@/api/article'
// import { getDeptList } from '@/api/system'

export default {
  data() {
    return {
      span: 24,
      filterText: '',
      expandAll: false,
      checkNode: true,
      showCheckbox: false,
      checkStrictly: false,
      routesData: [],
      deptUser: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.deptList.filter(val)
    }
  },
  created() {
    // this.getList()
    // this.getTreeList()
    this.initDeptList()
  },
  methods: {
    initDeptList() {
      this.listLoading = true
      getDeptList(this.listQuery).then(response => {
        // console.log(response.data[0])
        this.routesData = response.data// [0].children
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getTreeList() {
      // this.listLoading = true
      fetchTreeList(this.listQuery).then(response => {
        console.log(response.data.items)
        // this.routesData = response.data.items

        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleNodeClick(data) {
      console.log(data.deptId)
      this.listLoading = true
      getUserByDeptId(data.deptId).then(response => {
        this.deptUser = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })

      // var test = this.$refs.deptList.getCheckedKeys()
    },
    Checkbox() {
      this.showCheckbox = !this.showCheckbox
    },
    expand() {
      this.expandAll = !this.expandAll
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCheckedNodes() {
      console.log(this.$refs.deptList.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.deptList.getCheckedKeys())
    },
    setCheckedNodes() {
      // console.log('进来了')
      this.$refs.deptList.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      var test = this.$refs.deptList.getCheckedKeys()
      // console.log(test)
      test.push(1)
    },
    resetChecked() {
      this.$refs.deptList.setCheckedKeys([])
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

.permission-tree {
  margin-bottom: 30px;
}
.vertical-line {
  color: #409eff;
  height: 200px;
  width: 100%;
  border: 1px solid #000;
}
/* .el-input {
  margin: 10px;
} */
</style>
