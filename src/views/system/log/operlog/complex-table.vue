<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="24" class="seach-class">
        <el-card shadow="hover">
          <!-- 菜单栏 -->
          <searchs
            :seach-type="seachType"
            @handleFilter="handleFilter"
            @handleDownload="handleDownload"
            @refresh="refresh"
          />
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card shadow="hover">
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
            <!-- 日志编号 -->
            <el-table-column :label="$t('operlogtable.operId')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operId }}</span>
              </template>
            </el-table-column>

            <!-- 系统模块 -->
            <el-table-column :label="$t('operlogtable.title')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.title }}</span>
              </template>
            </el-table-column>

            <!-- 操作类型 -->
            <el-table-column :label="$t('operlogtable.operatorType')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operatorType }}</span>
              </template>
            </el-table-column>

            <!-- 操作人员 -->
            <el-table-column :label="$t('operlogtable.operName')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operName }}</span>
              </template>
            </el-table-column>

            <!-- 部门名称 -->
            <el-table-column :label="$t('operlogtable.deptName')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.deptName }}</span>
              </template>
            </el-table-column>

            <!-- 主机 -->
            <el-table-column :label="$t('operlogtable.operIp')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operIp }}</span>
              </template>
            </el-table-column>

            <!-- 操作地点 -->
            <el-table-column :label="$t('operlogtable.operLocation')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operLocation }}</span>
              </template>
            </el-table-column>

            <!-- 操作状态 -->
            <el-table-column :label="$t('operlogtable.status')" align="center">
              <template slot-scope="scope">
                <el-tag
                  effect="Plain"
                  :type="scope.row.status | statusFilter"
                >{{ statusAuthority[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>

            <!-- 操作时间 -->
            <el-table-column width="150" :label="$t('operlogtable.operTime')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.operTime?scope.row.operTime:'' | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="$t('operlogtable.actions')"
              align="center"
              width="180"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <!-- 操作/编辑 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  round
                  @click="handleUpdate(row)"
                >{{ $t('operlogtable.detailed') }}</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 页码 -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getOperLogList"
          />
        </el-card>
      </el-col>
    </el-row>
    <!-- 弹出层 -->
    <el-dialog v-el-drag-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- visible.sync：的意思是如果子组件的属性有变化，父组件则同步过来 -->
      <!-- 表单 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 操作模块 -->
        <el-form-item :label="$t('operlogtable.title')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <!-- 登录信息 -->
        <el-form-item :label="$t('operlogtable.title')" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>

        <!-- 请求地址 -->
        <el-form-item :label="$t('operlogtable.operUrl')" prop="operUrl">
          <el-input v-model="temp.operUrl" />
        </el-form-item>

        <!-- 操作方法 -->
        <el-form-item :label="$t('operlogtable.method')" prop="method">
          <el-input v-model="temp.method" />
        </el-form-item>

        <!-- 请求参数 -->
        <el-form-item :label="$t('operlogtable.operParam')" prop="operParam">
          <el-input v-model="temp.oper_param" />
        </el-form-item>

        <!-- 状态 -->
        <el-form-item :label="$t('operlogtable.status')">
          <el-select v-model="temp.status" placeholder="请选择用户状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('operlogtable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchOperLogList, fetchPv, deleteByOperLogs } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { checkMaxVal } from '@/utils/validator'
// import { format } from '@/utils/validator'
import Searchs from '@/components/Searchs'

// 弹出层dialog拖拽工具
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'ComplexTable',
  components: { Pagination, Searchs },
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
      seachType: 'operlog',
      rules: {
        dictName: [{ required: true, message: '请输入字典名称', trigger: ['blur'] }],
        dictType: [{ required: true, message: '请输入字典类型', trigger: ['blur'] }],
        date: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }]
      },
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
        sort: '+id'
      },
      temp: {},
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
    this.getOperLogList()
  },
  methods: {
    // 清空按钮
    empty() {
      this.listLoading = true
      deleteByOperLogs().then(response => {
        this.getOperLogList()
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.1 * 1000)
      })
    },
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8
      }
      await this.getOperLogList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getOperLogList() {
      this.listLoading = true
      fetchOperLogList(this.listQuery).then(response => {
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
      this.getOperLogList()
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
.seach-class {
  margin-bottom: 10px;
}
</style>
