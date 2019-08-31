<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-select v-model="dataPermissions" placeholder="请选择" class="select" @change="show">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div v-show="dataPermissions==='2'" class="tree">
          <el-tree
            ref="deptList"
            :props="defaultProps"
            :data="data"
            show-checkbox
            default-expand-all
            :expand-on-click-node="expandOnClickNode"
            node-key="deptId"
            empty-text="没有菜单"
            highlight-current
            check-on-click-node
            :default-checked-keys="defaultCheckedKey"
            class="dept-tree"
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { fetchDeptList } from '@/api/article'

export default {
  props: {
    roleId: {
      type: Number,
      default: null
    },
    deptData: {
      type: Array,
      default: () => []
    },
    sure: {
      type: Number,
      default: 0
    },
    dataScope: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 8
      },
      options: [{
        value: '1',
        label: '全部数据权限'
      }, {
        value: '2',
        label: '自定数据权限'
      }, {
        value: '3',
        label: '本部门数据权限'
      }, {
        value: '4',
        label: '本部门及以下数据权限'
      }],
      dataPermissions: '',
      span: 24,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      defaultCheckedKey: [],
      expandOnClickNode: false
    }
  },
  watch: {
    deptData(val) {
      // 获取部门全部树节点
      this.$refs.deptList.setCheckedKeys([])
      // 重置默认所属部门
      this.defaultCheckedKey = val
    },
    sure(val) {
      // 向父组件传值

      switch (this.dataPermissions) {
        case '1':
          this.$emit('editDept', '1')
          break
        case '2':
          this.$emit('editDept', this.$refs.deptList.getCheckedNodes())
          break
        case '3':
          this.$emit('editDept', '3')
          break
        case '4':
          this.$emit('editDept', '4')
          break
      }
    },
    dataScope: {
      immediate: true, // 这句重要
      handler(val) {
        this.dataPermissions = val
      }
    }
  },
  mounted() {
    this.initDeptList()
  },
  methods: {
    show() {
      // console.log(this.dataPermissions)
    },
    // 初始化部门列表
    initDeptList() {
      this.listLoading = true
      fetchDeptList(this.listQuery).then(response => {
        this.data = response.data // [0].children
      })
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
.select {
  width: 90%;
  margin-top: 15px;
  margin-bottom: 10px;
}

.dept-tree {
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
