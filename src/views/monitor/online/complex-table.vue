<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:52
 * @LastEditors: anan
 * @LastEditTime: 2019-09-23 11:19:20
 -->
<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24" class="seach-class">
        <el-card shadow="hover">
          <!-- 菜单栏 -->
          <searchs
            :seach-type="seachType"
            @handleFilter="handleFilter"
            @handleCreate="handleCreate"
            @handleDownload="handleDownload"
            @refresh="refresh"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Searchs from '@/components/Searchs'
import { getOnlineUsers } from '@/api/article'

export default {

  components: { Searchs },
  data() {
    return {
      seachType: 'onlineUsers',
      refreshButton: 'el-icon-refresh',
      listQuery: {}
    }
  },
  methods: {
    handleFilter(data) {
      console.log(data)
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'

      this.disabled = true
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['部门ID', '父部门', '祖级列表', '部门名称', '显示顺序', '负责人', '联系电话', '邮箱', '部门状态', '删除标志', '创建者', '创建时间', '更新者', '更新时间']
        const filterVal = ['deptId', 'parentId', 'ancestors', 'deptName', 'orderNum', 'leader', 'phone', 'email', 'status', 'delFlag', 'createBy', 'createTime', 'updateBy', 'updateTime']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },

    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8,
        parentId: 0
      }
      await this.getOnline()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },

    getOnline() {
      this.listLoading = true
      getOnlineUsers(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    }
  }
}
</script>

<style>
</style>
