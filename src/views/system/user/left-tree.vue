<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" />
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="routesData"
          :check-on-click-node="checkNode"
          node-key="id"
          :show-checkbox="showCheckbox"
          :filter-node-method="filterNode"
          class="permission-tree"
          @node-click="handleNodeClick"
        />
        <!-- <div v-if="showButton" class="buttons">
          <el-button @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button @click="getCheckedKeys">通过 key 获取</el-button>
          <el-button @click="setCheckedNodes">通过 node 设置</el-button>
          <el-button @click="setCheckedKeys">通过 key 设置</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div> -->
      </el-col>
    </el-row>

    <!-- <el-col :span="24-span">
      <div class="vertical-line">
        <i class="el-icon-caret-left" />
      </div>
    </el-col>-->
    <!-- <el-button type="primary" @click="Checkbox">复选框</el-button>
    <el-button type="primary" @click="expand">{{ expandAll===true ? "展开":"合并" }}</el-button>-->
  </div>
</template>

<script>

import { fetchTreeList } from '@/api/article'

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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    // this.getList()
    this.getTreeList()
  },
  methods: {
    getTreeList() {
      this.listLoading = true
      fetchTreeList(this.listQuery).then(response => {
        this.routesData = response.data.items

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleNodeClick(data) {
      var test = this.$refs.tree.getCheckedKeys()
      console.log(test.length)
      // console.log(data.id)
      // this.$refs.tree.getCheckedKeys()
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
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      console.log('进来了')
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      var test = this.$refs.tree.getCheckedKeys()
      console.log(test)
      test.push(1)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
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
