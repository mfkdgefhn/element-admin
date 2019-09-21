<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:52
 * @LastEditors: anan
 * @LastEditTime: 2019-09-21 17:42:26
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

      <el-col :span="24">
        <el-card shadow="hover">
          <!-- 表格 -->
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="list"
            row-key="id"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
          >
            <!-- 部门名称 -->
            <el-table-column :label="$t('depttable.deptName')" header-align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.deptName }}</span>
              </template>
            </el-table-column>

            <!-- 排序 -->
            <el-table-column :label="$t('depttable.orderNum')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNum }}</span>
              </template>
            </el-table-column>

            <!-- 部门状态 -->
            <el-table-column :label="$t('depttable.status')" align="center">
              <template slot-scope="scope">
                <el-tag
                  effect="Plain"
                  :type="scope.row.status | statusFilter"
                >{{ statusAuthority[scope.row.status] }}</el-tag>
              </template>
            </el-table-column>

            <!-- 创建时间 -->
            <el-table-column :label="$t('depttable.createTime')" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
              </template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="$t('depttable.edit')"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{row}">
                <!-- 操作/编辑 -->
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />
                </el-tooltip>
                <!-- 新增 -->
                <el-tooltip class="item" effect="dark" content="新增下级" placement="top">
                  <el-button
                    circle
                    type="warning"
                    icon="el-icon-star-off"
                    @click="handleCreateDept(row,'insert')"
                  />
                </el-tooltip>
                <!-- 删除 -->
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <el-popover
                    v-model="row.show"
                    placement="top"
                    width="160"
                    style="margin-left:10px;"
                  >
                    <p>你确定要删除该用户吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="row.show = false">取消</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="handleModifyStatus(row,'deleted')"
                      >确定</el-button>
                    </div>
                    <el-button slot="reference" circle type="danger" icon="el-icon-delete" />
                  </el-popover>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <!-- 页码 -->
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getDeptList"
          />
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹出层 -->
    <el-dialog v-el-drag-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <!-- visible.sync：的意思是如果子组件的属性有变化，父组件则同步过来 -->
      <!-- 部门 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 上级部门 -->
        <el-form-item v-show="disabled" :label="$t('depttable.parentId')">
          <el-input
            v-model="temp.parentName"
            placeholder="请输入内容"
            class="input-with-select"
            @focus="deptVisible=true"
          />
        </el-form-item>

        <!-- 部门名称 -->
        <el-form-item :label="$t('depttable.deptName')" prop="deptName">
          <el-input v-model="temp.deptName" />
        </el-form-item>

        <!-- 显示排序 -->
        <el-form-item :label="$t('depttable.orderNum')" prop="orderNum">
          <el-input v-model.number="temp.orderNum" />
        </el-form-item>

        <!--  负责人 -->
        <el-form-item :label="$t('depttable.leader')" prop="leader">
          <el-input v-model="temp.leader" @focus="userVisible=true" />
        </el-form-item>

        <!-- 联系电话 -->
        <el-form-item :label="$t('depttable.phone')" prop="phone">
          <el-input v-model.number="temp.phone" />
        </el-form-item>

        <!-- email -->
        <el-form-item :label="$t('depttable.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <!-- 部门状态 -->
        <el-form-item :label="$t('depttable.status')" prop="deptStatus">
          <el-switch
            v-model="temp.status"
            active-text="停用"
            active-value="1"
            active-color="#ff4949"
            inactive-text="正常"
            inactive-value="0"
            inactive-color="#13ce66"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('depttable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('depttable.cancel') }}</el-button>
      </div>
    </el-dialog>

    <!-- 弹出部门树 -->
    <el-dialog :visible.sync="deptVisible" title="部门">
      <cliren-left-tree @updateTreeDeptId="updateTreeDeptId" />
    </el-dialog>

    <!-- 弹出用户树 -->
    <el-dialog :visible.sync="userVisible" title="部门">
      <user-tree @updateTreeUserId="updateTreeUserId" />
      <!--  -->
    </el-dialog>
  </div>
</template>

<script>
import { deleteByDeptId, fetchDeptList, fetchPv, createDeptArticle, updateDeptById } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { checkMaxVal } from '@/utils/validator'
import clirenLeftTree from './cliren-left-tree'
import userTree from './user-tree'
import Searchs from '@/components/Searchs'

// updateRoleByRoleId ,

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
  components: { Pagination, Searchs, clirenLeftTree, userTree },
  directives: { waves, elDragDialog },
  filters: {
    menuTypeFilter(status) {
      const typeMap = {
        'M': '',
        'C': 'success',
        'F': 'info'
      }
      return typeMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        '0': '',
        '1': 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      seachType: 'dept',
      closeOnClickModal: false,
      typeAuthority: {
        'M': '目录',
        'C': '菜单',
        'F': '按钮'
      },
      statusAuthority: {
        '0': '正常',
        '1': '停用'
      },
      targetAuthority: {
        'menuItem': '页签',
        'menuBlank': '新窗口'
      },
      menuTypeAuthority: [
        { key: 'M', value: '目录' },
        { key: 'C', value: '菜单' },
        { key: 'F', value: '按钮' }
      ],
      refreshButton: 'el-icon-refresh',
      tableKey: 0,
      list: null,
      visible: false,
      shenheren: true,
      total: 0,
      listLoading: true,
      disabled: true,
      listQuery: {
        page: 1,
        limit: 8,
        sort: '+id',
        parentId: 0
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      temp: {},
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      dialogPvVisible: false,
      userVisible: false,
      deptVisible: false,
      rules: {
        deptName: [{ required: true, message: '请输入部门名称', trigger: ['blur'] }],
        phone: [{ pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误', trigger: ['blur'] }],
        email: [{ type: 'email', message: '邮箱格式出错', trigger: ['blur'] }],
        orderNum: [{ validator: checkMaxVal, trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getDeptList()
  },
  methods: {
    updateTreeUserId(data) {
      this.temp.leader = data.userNick
      this.userVisible = false
    },
    updateTreeDeptId(data) {
      this.temp.parentId = data.deptId
      this.temp.parentName = data.deptName
      this.deptVisible = false
    },
    selectRadio(value) {
      console.log(value.menuType)
    },
    // 刷新按钮
    async refresh() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery = {
        page: 1,
        limit: 8,
        parentId: 0
      }
      await this.getDeptList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getDeptList() {
      this.listLoading = true
      fetchDeptList(this.listQuery).then(response => {
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
      this.getDeptList()
    },
    handleModifyStatus(row, status) {
      if (status === 'insert') {
        // 新增
        console.log(row)
        // updateRoleByRoleId(row).then(response => {
        //   this.$message({
        //     message: '停用',
        //     type: 'success'
        //   })
        //   // 抛出错误，将停用的状态更改回来
        //   // eslint-disable-next-line handle-callback-err
        // }).catch(err => {
        //   row.status = '0'
        // })
      } else if (status === 'deleted') {
        // 删除
        row.show = false
        deleteByDeptId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getDeptList()
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
      this.temp = {}
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
    handleCreateDept(row, status) {
      if (status === 'insert') {
        this.resetTemp()
        this.disabled = false
        this.temp.parentId = row.deptId
        this.temp.parentName = row.deptName
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createDeptArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getDeptList()
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
      this.disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.updateTime = new Date()
          updateDeptById(tempData).then(() => {
            this.dialogFormVisible = false
            this.getDeptList()
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
