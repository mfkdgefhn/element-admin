<template>
  <div class="app-container">
    <!-- 菜单栏 -->
    <div class="filter-container">
      <!-- 字典编码 -->
      <el-input
        v-model="listQuery.dictCode"
        :placeholder="$t('dictdatatable.dictCode')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 字典标签 -->
      <el-input
        v-model="listQuery.dictLabel"
        :placeholder="$t('dictdatatable.dictLabel')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 数据状态 -->
      <el-input
        v-model="listQuery.status"
        :placeholder="$t('dictdatatable.status')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 搜索按钮 -->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('dictdatatable.search') }}</el-button>

      <!-- 添加 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('dictdatatable.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('dictdatatable.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refreshPostList()" />
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
      <!-- 字典编码 -->
      <el-table-column
        type="index"
        width="40"
        align="center"
        :label="$t('dictdatatable.dictCode')"
      />

      <!-- 字典标签 -->
      <el-table-column :label="$t('dictdatatable.dictLabel')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictLabel }}</span>
        </template>
      </el-table-column>

      <!-- 字典键值 -->
      <el-table-column :label="$t('dictdatatable.dictValue')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictValue }}</span>
        </template>
      </el-table-column>

      <!-- 字典排序 -->
      <el-table-column :label="$t('dictdatatable.dictSort')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dictSort }}</span>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column :label="$t('dictdatatable.status')" align="center">
        <template slot-scope="scope">
          <el-tag
            effect="Plain"
            :type="scope.row.status | statusFilter"
          >{{ statusAuthority[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>

      <!-- 备注 -->
      <el-table-column :label="$t('dictdatatable.remark')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column width="150" :label="$t('dictdatatable.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('dictdatatable.actions')"
        align="center"
        width="230"
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
          >编辑</el-button>

          <!-- 删除 -->
          <el-popover v-model="row.visible" placement="top" width="160" style="margin-left:10px;">
            <p>你确定要删除该用户吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(row,'deleted')">确定</el-button>
            </div>
            <el-button slot="reference" size="mini" round type="danger" icon="el-icon-delete">删除</el-button>
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
      @pagination="getDictDataList"
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
        <!-- 字典标签 -->
        <el-form-item :label="$t('dictdatatable.dictLabel')" prop="dictLabel">
          <el-input v-model="temp.dictLabel" />
        </el-form-item>

        <!-- 字典键值 -->
        <el-form-item :label="$t('dictdatatable.dictValue')" prop="dictValue">
          <el-input v-model="temp.dictValue" />
        </el-form-item>

        <!-- 字典类型 -->
        <el-form-item :label="$t('dictdatatable.dictType')" prop="dictType">
          <el-input v-model="temp.dictType" />
        </el-form-item>

        <!-- 样式属性 -->
        <el-form-item :label="$t('dictdatatable.cssClass')" prop="cssClass">
          <el-input v-model="temp.cssClass" />
        </el-form-item>

        <!-- 字典排序 -->
        <el-form-item :label="$t('dictdatatable.dictSort')" prop="dictSort">
          <el-input v-model="temp.dictSort" />
        </el-form-item>

        <!-- 回显样式 -->
        <el-form-item :label="$t('dictdatatable.listClass')" prop="listClass">
          <el-input v-model="temp.listClass" />
        </el-form-item>

        <!-- 系统默认 -->
        <el-form-item :label="$t('dictdatatable.isDefault')" prop="isDefault">
          <el-input v-model="temp.isDefault" />
        </el-form-item>

        <!-- 状态 -->
        <el-form-item :label="$t('dictdatatable.status')">
          <el-select v-model="temp.status" placeholder="请选择用户状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item :label="$t('dictdatatable.remark')">
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
        >{{ $t('dictdatatable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('dictdatatable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteByDictCode, updateRoleByRoleId, fetchDictDataList, fetchPv, createDictDataArticle, updateDictDataArticle } from '@/api/article'
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
      value1: '',
      pvData: [],
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      visible: false,
      shenheren: true,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id',
        dictName: undefined,
        dictType: undefined,
        dictId: undefined,
        status: undefined,
        remark: undefined,
        startDate: undefined,
        endDate: undefined
      },
      importanceOptions: [1, 2, 3],
      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        dictId: '',
        remark: '',
        dictName: '',
        dictType: '',
        status: '0',
        startDate: '',
        endDate: ''
      },
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
    this.getDictDataList()
  },
  methods: {
    // 刷新按钮
    async refreshPostList() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery.page = 1
      this.listQuery.limit = 8
      this.listQuery.dictName = ''
      this.listQuery.dictType = ''
      this.listQuery.dictId = ''
      this.listQuery.remark = ''
      this.listQuery.status = ''
      this.listQuery.startDate = ''
      this.listQuery.endDate = ''
      await this.getDictDataList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getDictDataList() {
      this.listLoading = true
      fetchDictDataList(this.listQuery).then(response => {
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
      // this.getList()
      this.getDictDataList()
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
        deleteByDictCode(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getDictDataList()
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
          createDictDataArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getDictDataList()
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
            this.getDictDataList()
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
