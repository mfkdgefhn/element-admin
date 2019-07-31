<template>
  <div class="app-container">
    <!-- 菜单栏 -->
    <div class="filter-container">
      <!-- 标题 -->
      <el-input
        v-model="listQuery.roleName"
        :placeholder="$t('roletable.roleName')"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 权限字符 -->
      <el-input
        v-model="listQuery.roleKey"
        :placeholder="$t('roletable.roleKey')"
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
      >{{ $t('roletable.search') }}</el-button>

      <!-- 添加 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('roletable.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('roletable.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refreshRoleList()" />
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
      <!-- 序号 -->
      <el-table-column type="index" width="40" align="center" />

      <!-- 显示顺序 -->
      <!-- <el-table-column
        :sortable="true"
        :label="$t('roletable.roleSort')"
        align="center"
        :sort-method="sortByDate"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.roleSort }}</span>
        </template>
      </el-table-column>-->

      <!-- 角色名称 -->
      <el-table-column :label="$t('roletable.roleName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <!-- 权限字符 -->
      <el-table-column :label="$t('roletable.roleKey')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleKey }}</span>
        </template>
      </el-table-column>

      <!-- 数据范围 -->
      <el-table-column :label="$t('roletable.dataScope')" align="center">
        <template slot-scope="scope">
          <span>{{ scopeAuthority[scope.row.dataScope].value }}</span>
        </template>
      </el-table-column>
      <!-- {{ scope.row.dataScope }} -->
      <!-- 角色状态 -->
      <el-table-column :label="$t('roletable.status')" align="center">
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.status | statusFilter">{{ row.status==='0' ?'正常': '停用' }}</el-tag>
        </template>
      </el-table-column>

      <!-- 创建时间 -->
      <el-table-column :label="$t('roletable.createTime')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('roletable.actions')"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <!-- 操作/编辑 -->
          <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />

          <!-- 数据权限/分配用户 -->
          <el-button circle type="success" icon="authorization" @click="handleFetchPv(row)">
            <svg-icon icon-class="adduser" />
          </el-button>

          <!-- 停用 -->
          <el-button
            v-if="row.status!=='1'"
            circle
            type="warning"
            icon="el-icon-star-off"
            @click="handleModifyStatus(row,'discontinuation')"
          />

          <!-- 启用 -->
          <el-button
            v-if="row.status!=='0'"
            circle
            type="danger"
            icon="el-icon-star-off"
            @click="handleModifyStatus(row,'enabling')"
          />

          <!-- 删除 -->
          <el-popover v-model="row.visible" placement="top" width="160" style="margin-left:10px;">
            <p>你确定要删除该用户吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(row,'deleted')">确定</el-button>
            </div>
            <el-button slot="reference" circle type="danger" icon="el-icon-delete" />
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
      @pagination="getRoleList"
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
        <!-- 角色ID -->
        <el-form-item :label="$t('roletable.roleId')">
          <el-input v-model="temp.roleId" disabled placeholder="系统默认生成" />
        </el-form-item>

        <!-- 角色名称 -->
        <el-form-item :label="$t('roletable.roleName')" prop="roleName">
          <el-input v-model="temp.roleName" />
        </el-form-item>

        <!-- 角色权限字符串 -->
        <el-form-item :label="$t('roletable.roleKey')" prop="roleKey">
          <el-input v-model="temp.roleKey" />
        </el-form-item>

        <!-- 显示顺序 -->
        <el-form-item :label="$t('roletable.roleSort')" prop="roleSort">
          <el-input v-model.number="temp.roleSort" />
        </el-form-item>

        <!-- 数据范围 -->
        <el-form-item :label="$t('roletable.dataScope')" prop="dataScope">
          <el-select v-model="temp.dataScope" placeholder="请选择数据范围">
            <el-option v-for="i in scopeAuthority" :key="i.key" :label="i.value" :value="i.key" />
          </el-select>
          <!-- <el-input v-model="temp.dataScope" /> -->
        </el-form-item>

        <!-- 状态 -->
        <el-form-item :label="$t('roletable.status')">
          <el-select v-model="temp.status" placeholder="请选择用户状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>

        <!-- 创建时间 -->
        <el-form-item :label="$t('roletable.createTime')" prop="date">
          <el-date-picker v-model="temp.createTime" disabled type="datetime" placeholder="系统时间" />
        </el-form-item>

        <!-- 修改时间 -->
        <el-form-item :label="$t('roletable.updateTime')" prop="date">
          <el-date-picker v-model="temp.updateTime" disabled type="datetime" placeholder="系统时间" />
        </el-form-item>

        <!-- 角色说明 -->
        <el-form-item :label="$t('roletable.remark')">
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
        >{{ $t('roletable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('roletable.cancel') }}</el-button>
      </div>
    </el-dialog>

    <!-- 权限分配窗口 -->
    <el-dialog
      v-el-drag-dialog
      :visible.sync="dialogPvVisible"
      :title="$t('roletable.editRole')"
      center
      width="80%"
      append-to-body
      custom-class="dialog-dietRole"
      :close-on-click-modal="closeOnClickModal"
    >
      <role-to-permission :temp="temp" />
    </el-dialog>
  </div>
</template>

<script>
import { deleteByRoleId, updateRoleByRoleId, fetchRoleList, fetchPv, createRoleArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { checkMaxVal } from '@/utils/validator'
import RoleToPermission from './roleToPermission'

// 弹出层dialog拖拽工具
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination, RoleToPermission },
  directives: { waves, elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'info',
        2: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
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
        title: undefined,
        type: undefined,
        sort: '+id',
        roleName: undefined,
        roleKey: undefined,
        visible: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      // sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        roleId: '',
        remark: '',
        roleName: '',
        roleKey: '',
        roleSort: '',
        dataScope: '',
        status: '0',
        visible: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
        roleKey: [{ required: true, message: '请输入权限字符', trigger: ['blur'] }],
        date: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }],
        roleSort: [{ validator: checkMaxVal, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    // this.getList()
    // this.getUserList()
    this.getRoleList()
  },
  methods: {
    // 排序方法
    // sortByDate(obj1, obj2) {
    //   const val1 = obj1.deadline
    //   const val2 = obj2.deadline
    //   return val1 - val2
    // },
    // 刷新按钮
    async refreshRoleList() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery.page = 1
      this.listQuery.limit = 8
      this.listQuery.roleName = ''
      this.listQuery.roleKey = ''
      await this.getRoleList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getRoleList() {
      this.listLoading = true
      fetchRoleList(this.listQuery).then(response => {
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
      this.getRoleList()
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
        deleteByRoleId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getRoleList()
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
        roleName: '',
        roleKey: ''
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
          this.temp.dataScope = '1'
          this.temp.status = '0'
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createRoleArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getRoleList()
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
          updateArticle(tempData).then(() => {
            this.dialogFormVisible = false
            this.getRoleList()
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
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['角色名', '权限字符', '显示顺序', '状态', '创建时间', '修改时间', '数据范围', '备注']
        const filterVal = ['roleName', 'roleKey', 'roleSort', 'status', 'createTime', 'updateTime', 'dataScope', 'remark']
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
