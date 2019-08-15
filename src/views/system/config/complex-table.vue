<template>
  <div class="app-container">
    <searchs
      :seach-type="seachType"
      @handleFilter="handleFilter"
      @handleCreate="handleCreate"
      @handleDownload="handleDownload"
      @refresh="refresh"
    />

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
      <!-- 参数主键 -->
      <el-table-column :label="$t('configtable.configId')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.configId }}</span>
        </template>
      </el-table-column>

      <!-- 参数名称 -->
      <el-table-column :label="$t('configtable.configName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.configName }}</span>
        </template>
      </el-table-column>

      <!-- 参数键名 -->
      <el-table-column :label="$t('configtable.configKey')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.configKey }}</span>
        </template>
      </el-table-column>

      <!-- 参数键值 -->
      <el-table-column :label="$t('configtable.configValue')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.configValue }}</span>
        </template>
      </el-table-column>

      <!-- 系统内置 -->
      <el-table-column :label="$t('configtable.configType')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.configType }}</span>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column width="200" :label="$t('configtable.remark')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column width="150" :label="$t('configtable.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('configtable.actions')"
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
          >{{ $t('configtable.edit') }}</el-button>

          <!-- 删除 -->
          <el-popover v-model="row.visible" placement="top" width="160" style="margin-left:10px;">
            <p>你确定要删除该用户吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(row,'deleted')">确定</el-button>
            </div>
            <el-button
              slot="reference"
              size="mini"
              round
              type="danger"
              icon="el-icon-delete"
            >{{ $t('configtable.delete') }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getConfigList"
    />

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
        <!-- 参数名称 -->
        <el-form-item :label="$t('configtable.configName')" prop="configName">
          <el-input v-model="temp.configName" />
        </el-form-item>

        <!-- 参数键名 -->
        <el-form-item :label="$t('configtable.configKey')" prop="configKey">
          <el-input v-model="temp.configKey" />
        </el-form-item>

        <!-- 参数键值 -->
        <el-form-item :label="$t('configtable.configValue')" prop="configValue">
          <el-input v-model="temp.configValue" />
        </el-form-item>

        <!-- 系统内置 -->
        <el-form-item :label="$t('configtable.configType')" prop="configType">
          <el-input v-model="temp.configType" />
        </el-form-item>

        <!-- 备注 -->
        <el-form-item :label="$t('configtable.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="该角色很懒，未写备注信息..."
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('configtable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('configtable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteByConfigId, updateRoleByRoleId, fetchConfigList, fetchPv, createConfigArticle, updateConfigArticle } from '@/api/article'
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
      seachType: 'config',
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
      value1: '',
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      visible: false,
      shenheren: true,
      total: 0,
      listLoading: true,
      dictType: [],
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      rules: {
        dictName: [{ required: true, message: '请输入字典名称', trigger: ['blur'] }],
        dictType: [{ required: true, message: '请输入字典类型', trigger: ['blur'] }],
        date: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  watch: {
    value1(data) {
      this.listQuery.startDate = data[0]
      this.listQuery.endDate = data[1]
    }
  },
  created() {
    this.getConfigList()
  },
  methods: {
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8
      }
      await this.getConfigList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取系统参数列表
    getConfigList() {
      this.listLoading = true
      fetchConfigList(this.listQuery).then(response => {
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
      this.getConfigList()
    },
    handleModifyStatus(row, status) {
      if (status === 'discontinuation') {
        // 停用
        row.status = '1'
        updateRoleByRoleId(row).then(response => {
          this.$message({
            message: '停用',
            type: 'success'
          })
          // 抛出错误，将停用的状态更改回来
          // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          row.status = '0'
        })
      } else if (status === 'enabling') {
        // 启用
        row.status = '0'
        updateRoleByRoleId(row).then(response => {
          this.$message({
            message: '启用',
            type: 'success'
          })
        })
      } else if (status === 'deleted') {
        // 删除
        row.visible = false
        deleteByConfigId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getConfigList()
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
    resetTemp() {
      this.temp = {
        id: undefined,
        remark: '',
        title: '',
        status: '0',
        type: '',
        dictName: '',
        dictType: '',
        dictId: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createConfigArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getConfigList()
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
          updateConfigArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getConfigList()
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
