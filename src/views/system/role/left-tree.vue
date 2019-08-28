<template>
  <div>
    <el-row class="left-tree">
      <el-col :span="span" class="tree-margin">
        <el-input v-model="filterText" placeholder="过滤" class="tree-input" type="width:80%" />
        <el-tree
          ref="menuList"
          :props="defaultProps"
          :data="routesData"
          node-key="id"
          class="memu-tree"
        />
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
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 8
      },
      defaultProps: {
        lable: 'menuName'
      },
      span: 24,
      filterText: '',
      routesData: [{
        id: 1,
        'menuName': '一级 1',
        children: [{
          id: 4,
          'menuName': '二级 1-1',
          children: [{
            id: 9,
            'menuName': '三级 1-1-1'
          }, {
            id: 10,
            'menuName': '三级 1-1-2'
          }]
        }]
      }]
    }
  },
  mounted() {
    // this.initMenuList()
  },
  methods: {
    // 初始化部门列表
    initMenuList() {
      this.listLoading = true
      fetchMenuList(this.listQuery).then(response => {
        console.log('成功')
        console.log(response.data)
        this.routesData = response.data// [0].children
        this.routesData.forEach(menu => {
          console.log(menu.menuName)
        })
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
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
</style>
