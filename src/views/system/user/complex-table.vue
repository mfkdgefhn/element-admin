<template>
  <div class="app-container">
    <!-- 菜单栏 -->
    <div class="filter-container">
      <!-- 用户名 -->
      <el-input
        v-model="listQuery.userName"
        :placeholder="$t('usertable.userName')"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 昵称 -->
      <el-input
        v-model="listQuery.userNick"
        :placeholder="$t('usertable.userNick')"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <!-- 手机号 -->
      <el-input
        v-model="listQuery.phonenumber"
        :placeholder="$t('usertable.phonenumber')"
        style="width: 150px;"
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
      >{{ $t('usertable.search') }}</el-button>

      <!-- 添加 -->
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t('usertable.add') }}</el-button>

      <!-- 导出 -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('usertable.export') }}</el-button>

      <!-- 刷新 -->
      <el-button type="primary" :icon="refreshButton" circle @click="refreshUserList()" />
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
      <el-table-column type="index" width="40" align="center" />

      <!-- 登陆帐号-->
      <el-table-column :label="$t('usertable.userName')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('usertable.userNick')" align="center" width="100">
        <template slot-scope="scope">
          <el-popover trigger="focus" placement="top">
            <p>用户名：{{ scope.row.userName }}</p>
            <p>用户昵称：{{ scope.row.userNick }}</p>
            <p>email：{{ scope.row.email }}</p>
            <p>手机号码：{{ scope.row.phonenumber }}</p>
            <p>性别：{{ scope.row.sex }}</p>
            <p>最后登陆IP{{ scope.row.loginIp }}</p>
            <p>最后登陆时间：{{ scope.row.loginDate }}</p>
            <p>备注：{{ scope.row.remarks }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userNick }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <!-- 部门 -->
      <el-table-column :label="$t('usertable.dept')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deptName }}</span>
        </template>
      </el-table-column>

      <!-- 手机 -->
      <el-table-column :label="$t('usertable.phonenumber')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phonenumber }}</span>
        </template>
      </el-table-column>

      <!-- 邮箱 -->
      <el-table-column :label="$t('usertable.email')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <!-- 性别 -->
      <el-table-column :label="$t('usertable.sex')" class-name="status-col" width="70">
        <template slot-scope="{row}">
          <el-tag>{{ row.sex === '0' ? '男' : row.sex=== '1' ? '女' : '未知' }}</el-tag>
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column :label="$t('usertable.status')" class-name="status-col" width="90">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status==='0'?'正常':'停用' }}</el-tag>
        </template>
      </el-table-column>

      <!-- 最后一次登陆IP -->
      <el-table-column :label="$t('usertable.loginIp')" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.loginIp }}</span>
        </template>
      </el-table-column>

      <!-- 时间 -->
      <el-table-column :label="$t('usertable.loginDate')" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        :label="$t('usertable.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <!-- 操作 -->
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >{{ $t('usertable.edit') }}</el-button>

          <!-- 停用 -->
          <el-button
            v-if="row.status!=='1'"
            size="mini"
            type="warning"
            @click="handleModifyStatus(row,'discontinuation')"
          >{{ $t('usertable.discontinuation') }}</el-button>

          <!-- 启用 -->
          <el-button
            v-if="row.status!=='0'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'enabling')"
          >{{ $t('usertable.enabling') }}</el-button>

          <!-- 删除 -->
          <el-popover v-model="row.visible" placement="top" width="160" style="margin-left:10px;">
            <p>你确定要删除该用户吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="row.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="handleModifyStatus(row,'deleted')">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码 -->
    <pagination
      v-show="getUserCount>0"
      :total="getUserCount"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="initUserInfo()"
    />

    <!-- 弹出层 -->
    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      show-close
    >
      <!-- @dragDialog="handleDrag" -->
      <!-- visible.sync：的意思是如果子组件的属性有变化，父组件则同步过来 -->
      <!-- 表单 -->
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- 登陆帐号 -->
        <el-form-item :label="$t('usertable.userName')" prop="userName">
          <el-input v-model="temp.userName" />
        </el-form-item>

        <!-- 登陆密码 -->
        <el-form-item v-if="dialogStatus==='create'" :label="$t('usertable.password')">
          <el-input v-model="temp.password" show-password />
        </el-form-item>

        <!-- 用户名称 -->
        <el-form-item :label="$t('usertable.userNick')" prop="userNick">
          <el-input v-model="temp.userNick" />
        </el-form-item>

        <!-- 部门 -->
        <el-form-item :label="$t('usertable.dept')">
          <el-input v-model="temp.deptName" @focus="dialogPvVisible=true" />
        </el-form-item>

        <!-- 手机 -->
        <el-form-item :label="$t('usertable.phonenumber')" prop="phonenumber">
          <el-input v-model="temp.phonenumber" />
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item :label="$t('usertable.email')" prop="email">
          <el-input v-model="temp.email" />
        </el-form-item>

        <!-- 性别 -->
        <el-form-item :label="$t('usertable.sex')" prop="sex">
          <el-select v-model="temp.sex" placeholder="请输入性别">
            <el-option label="男" value="0" />
            <el-option label="女" value="1" />
            <el-option label="未知" value="2" />
          </el-select>
        </el-form-item>

        <!-- 用户状态 （0正常 1停用）-->
        <el-form-item :label="$t('usertable.status')">
          <el-select v-model="temp.status" placeholder="请选择用户状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>

        <!-- 备注 -->
        <el-form-item :label="$t('usertable.remarks')">
          <el-input
            v-model="temp.remarks"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="您想说些什么。。。"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('usertable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('usertable.cancel') }}</el-button>
      </div>
    </el-dialog>

    <!-- 弹出部门树 -->
    <el-dialog :visible.sync="dialogPvVisible" title="部门">
      <cliren-left-tree @updateTreeDeptId="updateTreeDeptId" />
    </el-dialog>

    <!-- 获取用户IP地址等信息--搜狐 -->
    <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8" />
  </div>
</template>

<script>
import { updateUserByUserId, deleteUserById, fetchPv, updateArticle, getDeptList } from '@/api/article'
import { register } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import clirenLeftTree from './cliren-left-tree'

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
  components: {
    clirenLeftTree,
    Pagination,
    'remote-js': {
      render(createElement) {
        return createElement('script', { attrs: { type: 'text/javascript', src: this.src }})
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
  directives: { waves, elDragDialog },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      refreshButton: 'el-icon-refresh',
      visible: false,
      tableKey: 0,
      list: null,
      shenheren: true,
      isShow: false,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 8,
        userName: undefined,
        userNick: undefined,
        phonenumber: undefined,
        type: undefined,
        sort: '+id'
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      temp: {
        id: undefined,
        userName: '',
        userNick: '',
        deptId: '',
        deptName: '',
        phonenumber: '',
        email: '',
        sex: '',
        loginIp: '',
        loginDate: '',
        remarks: '',
        status: '',
        password: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '创建'
      },
      deptDate: [],
      dialogPvVisible: false,
      pvData: [],
      // 表单校验规则
      rules: {
        userName: [{ required: true, message: '请输入用户名称', trigger: ['blur'] }, { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: ['blur'] }],
        userNick: [{ required: true, message: '请输入用户昵称', trigger: ['blur'] }, { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: ['blur'] }],
        deptId: [{ required: true, message: '请输入部门', trigger: ['blur'] }],
        deptName: [{ required: true, message: '请输入部门', trigger: ['blur'] }],
        phonenumber: [{ required: true, message: '请输入手机号码', trigger: ['blur'] }, { min: 11, max: 11, message: '手机号码必须为11位', trigger: ['blur'] }, { pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误', trigger: ['blur'] }],
        email: [{ required: true, message: '请输入邮箱地址', trigger: ['blur'] }, { type: 'email', message: '邮箱格式出错', trigger: ['blur'] }],
        sex: [{ min: 1, max: 2, message: '字数范围不对', trigger: ['blur'] }],
        loginDate: [{ type: 'date', message: '日期格式不对', trigger: ['blur'] }],
        status: [{ min: 1, max: 2, message: '状态数字不对', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  computed: {
    getUserList() {
      return this.$store.state.user.userList
    },
    getUserCount() {
      return this.$store.state.user.total
    },
    tempDeptName() {
      return this.temp.deptId
    }
  },
  watch: {
    getUserList(a, b) {
      this.list = a
      this.listLoading = false
    },
    tempDeptName(a, b) {
      if (a !== b) {
        this.deptDate = this.$store.state.dept.depts
        for (let i = 0; i < this.deptDate.length; i++) {
          if (this.deptDate[i].deptId === a) {
            this.temp.deptName = this.deptDate[i].deptName
            break
          }
        }
      }
    }
  },
  created() {
  },
  mounted() {
    this.getDeptLists()
  },
  methods: {
    getDeptLists() {
      getDeptList().then((response) => {
        this.$store.dispatch('dept/setDepts', response.data)
      })
    },
    updateTreeDeptId(data) {
      this.temp.deptId = data.deptId
      this.temp.deptName = data.deptName
      this.dialogPvVisible = false
    },
    getList() {
      this.listLoading = true
    },
    refreshUserList() {
      this.refreshButton = 'el-icon-loading'
      this.listQuery.page = 1
      this.listQuery.limit = 8
      this.listQuery.userName = ''
      this.listQuery.userNick = ''
      this.listQuery.deptId = ''
      this.listQuery.deptName = ''
      this.listQuery.phonenumber = ''
      this.initUserInfo()
      setTimeout(() => {
        this.refreshButton = 'el-icon-refresh'
        this.$message({
          message: '刷新完成',
          type: 'success'
        })
      }, 1.5 * 1000)
    },
    // 初始化用户信息
    initUserInfo() {
      this.$store.dispatch('user/getUserList', this.listQuery)
    },
    isShowclase() {
      this.isShow = !this.isShow
    },
    handleFilter() {
      this.listQuery.page = 1
      this.initUserInfo()
    },
    handleModifyStatus(row, status) {
      if (status === 'discontinuation') {
        // 停用
        row.status = '1'
        updateUserByUserId(row).then(response => {
          this.$message({
            message: '停用',
            type: 'success'
          })
        })
      } else if (status === 'enabling') {
        // 启用
        row.status = '0'
        updateUserByUserId(row).then(response => {
          this.$message({
            message: '启用',
            type: 'success'
          })
        })
      } else if (status === 'deleted') {
        // 删除
        row.visible = false
        deleteUserById(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.initUserInfo()
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
    // 重置
    resetTemp() {
      this.temp = {
        id: undefined,
        userName: '',
        userNick: '',
        deptId: '',
        deptName: '',
        phonenumber: '',
        email: '',
        sex: '',
        loginIp: '',
        loginDate: '',
        remarks: '',
        status: '',
        password: ''
      }
    },
    // 添加
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
        // eslint-disable-next-line no-undef
        var ip = returnCitySN['cip']
        if (valid) {
          this.temp.loginIp = ip
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          register(this.temp).then(response => {
            // this.list.unshift(this.temp)  //静态加入页面中，但并没有加入到数据库
            this.dialogFormVisible = false // 关闭弹出层
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            setTimeout(() => {
              this.initUserInfo()
            }, 3 * 1000)
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    // 导出excel
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['用户名', '昵称', '部门', '性别', '手机号码', '状态', 'email', '登陆Ip', '备注']
        const filterVal = ['userName', 'userNick', 'deptId', 'sex', 'phonenumber', 'status', 'email', 'loginIp', 'remarks']
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
        if (j === 'timestamp') {
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
</style>
