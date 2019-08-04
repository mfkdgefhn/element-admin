<template>
  <div class="app-container">
    <!-- 菜单栏 -->
    <div class="filter-container">
      <!-- 登录地址 -->
      <el-input
        v-model="listQuery.loginLocation"
        :placeholder="$t('loginlogtable.loginLocation')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录名称 -->
      <el-input
        v-model="listQuery.loginName"
        :placeholder="$t('loginlogtable.loginName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('loginlogtable.status')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 登录时间 -->
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="-"
        :start-placeholder="$t('loginlogtable.startDate')"
        :end-placeholder="$t('loginlogtable.endDate')"
        style="width:250px;padding:0px 10px;"
        value-format="yyyyMMdd"
      />

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('loginlogtable.search') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('loginlogtable.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refreshList()" />

      <!-- 清空 -->
      <el-popover v-model="visible" placement="top" width="160">
        <p>
          <span style="color:red;font-weight:900;display:block;font-size:20px">(危险操作)</span>
          你确定要清空登录信息吗？
        </p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="empty()">确定</el-button>
        </div>
        <!-- <el-button slot="reference">删除</el-button> -->
        <el-button slot="reference" type="danger" icon="el-icon-delete" circle />
      </el-popover>
    </div>

    <!-- 表格 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!-- 访问编号 -->
      <el-table-column :label="$t('loginlogtable.infoId')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.infoId }}</span>
        </template>
      </el-table-column>

      <!-- 登录名称 -->
      <el-table-column :label="$t('loginlogtable.loginName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>

      <!-- 登录地址 -->
      <el-table-column :label="$t('loginlogtable.ipaddr')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ipaddr }}</span>
        </template>
      </el-table-column>

      <!-- 登录地点 -->
      <el-table-column :label="$t('loginlogtable.loginLocation')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginLocation }}</span>
        </template>
      </el-table-column>

      <!-- 浏览器 -->
      <el-table-column :label="$t('loginlogtable.browser')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.browser }}</span>
        </template>
      </el-table-column>

      <!-- 操作系统 -->
      <el-table-column :label="$t('loginlogtable.os')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.os }}</span>
        </template>
      </el-table-column>

      <!-- 登录状态 -->
      <el-table-column :label="$t('loginlogtable.status')" align="center">
        <template slot-scope="scope">
          <el-tag
            effect="Plain"
            :type="scope.row.status | statusFilter"
          >{{ statusAuthority[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <!-- 操作信息--提示信息 -->
      <el-table-column :label="$t('loginlogtable.msg')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.msg }}</span>
        </template>
      </el-table-column>

      <!-- 登录时间 -->
      <el-table-column width="150" :label="$t('loginlogtable.loginTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginTime?scope.row.loginTime:'' | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getLogininforList"
    />
  </div>
</template>

<script>
import { deleteByDictCode, fetchLogininforList, fetchPv, createDictDataArticle, updateDictDataArticle, deleteByLogininfors } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { checkMaxVal } from '@/utils/validator'
// import { format } from '@/utils/validator'

// 弹出层dialog拖拽工具
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves, elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      value1: '',
      visible: false,
      closeOnClickModal: false,
      scopeAuthority: [
        { key: '1', value: '全部数据权限' },
        { key: '2', value: '自定数据权限' },
        { key: '3', value: '本部门数据权限' },
        { key: '4', value: '本部门及以下数据权限' }
      ],
      statusAuthority: {
        '0': '正常',
        '1': '停用'
      },
      pvData: [],
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      shenheren: true,
      total: 0,
      listLoading: true,
      dictType: [],
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id',
        loginLocation: undefined,
        loginName: undefined,
        status: undefined
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      downloadLoading: false
    }
  },
  created() {
    this.getLogininforList()
  },
  methods: {
    // 清空按钮
    empty() {
      this.listLoading = true
      deleteByLogininfors().then(response => {
        this.getLogininforList()
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    // 刷新按钮
    async refreshList() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery.page = 1
      this.listQuery.limit = 8
      this.listQuery.status = ''
      this.listQuery.loginLocation = ''
      this.listQuery.loginName = ''
      this.listQuery.status = ''
      await this.getLogininforList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getLogininforList() {
      this.listLoading = true
      fetchLogininforList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getLogininforList()
    },
    handleModifyStatus(row, status) {
      if (status === 'deleted') {
        // 删除
        row.visible = false
        deleteByDictCode(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getLogininforList()
          }, 1 * 1000)
        })
      }
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createDictDataArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getLogininforList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTime = new Date()
          updateDictDataArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getLogininforList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },

    // 弹出权限分配窗口
    handleFetchPv(row) {
      this.temp = Object.assign({}, row) // copy obj
      fetchPv(row).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['部门名称', '部门编码', '显示顺序', '状态', '创建时间', '修改时间', '备注']
        const filterVal = ['postName', 'postCode', 'postSort', 'status', 'createTime', 'updateTime', 'remark']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>
.el-dialog {
  min-width: 530px;
}
.dialog-dietRole {
  min-width: 1000px;
}
</style>
