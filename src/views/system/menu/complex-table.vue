<!--
 * @Description: 说明
 * @Author: anan
 * @Date: 2019-07-13 13:52:52
 * @LastEditors: anan
 * @LastEditTime: 2019-09-10 11:51:56
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
          <vxe-table
            :data="list"
            stripe
            border
            align="center"
            highlight-current-row
            highlight-hover-row
            show-overflow="true,tooltip"
            :tree-config="{children: 'children', expandAll: false}"
          >
            <!-- 菜单名称 -->
            <vxe-table-column
              field="menuName"
              :title="$t('menutable.menuName')"
              tree-node
              align="left"
              header-align="center"
              width="150"
            />
            <!-- 显示顺序 -->
            <vxe-table-column field="orderNum" :title="$t('menutable.orderNum')" />
            <!-- 请求地址 -->
            <vxe-table-column field="url" :title="$t('menutable.url')" />
            <!-- 菜单类型 -->
            <vxe-table-column field="menuType" :title="$t('menutable.menuType')" />
            <!-- 菜单状态 -->
            <vxe-table-column field="visible" :title="$t('menutable.visible')" />
            <!-- 权限标识 -->
            <vxe-table-column field="perms" :title="$t('menutable.perms')" />
            <!-- 操作 -->
            <vxe-table-column title="操作" width="190">
              <template v-slot="{ row }">
                <template>
                  <el-button type="primary" icon="el-icon-edit" circle @click="handleUpdate(row)" />
                  <!-- 新增 -->
                  <el-button
                    circle
                    type="warning"
                    icon="el-icon-star-off"
                    @click="handleCreateMenu(row,'insert')"
                  />
                  <!-- 删除 -->
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
                </template>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>

    <el-button type="primary" @click="test">主要按钮</el-button>

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
        <!-- 上级菜单 -->
        <el-form-item :label="$t('menutable.parentId')">
          <!-- <el-input v-model="temp.parentId " /> -->
          <el-input v-model="temp.parentId" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </el-form-item>

        <!-- 菜单类型 -->
        <el-form-item :label="$t('menutable.menuType')" prop="menuType">
          <el-radio-group v-model="temp.menuType" @change="selectRadio(temp)">
            <el-radio
              v-for="type in menuTypeAuthority"
              :key="type.key"
              :label="type.key"
            >{{ type.value }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 菜单名称 -->
        <el-form-item :label="$t('menutable.menuName')" prop="menuName">
          <el-input v-model="temp.menuName" />
        </el-form-item>

        <!-- 请求地址 -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.url')" prop="url">
          <el-input v-model="temp.url" />
        </el-form-item>

        <!-- 打开方式target（menuItem页签 menuBlank新窗口）targetAuthority -->
        <el-form-item v-show="temp.menuType==='C'" :label="$t('menutable.target')" prop="target">
          <el-select v-model="temp.region" placeholder="请选择打开方式">
            <el-option
              v-for="region in targetAuthority"
              :key="region.key"
              :label="region"
              :value="region"
            />
          </el-select>
        </el-form-item>

        <!-- 权限标识 -->
        <el-form-item
          v-show="temp.menuType==='C' || temp.menuType==='F' "
          :label="$t('menutable.perms')"
          prop="roleSort"
        >
          <el-input v-model="temp.perms" />
        </el-form-item>

        <!-- 显示排序 -->
        <el-form-item :label="$t('menutable.orderNum')" prop="roleSort">
          <el-input v-model.number="temp.orderNum" />
        </el-form-item>

        <!-- 图标 -->
        <el-form-item v-show="temp.menuType==='M'" :label="$t('menutable.icon')" prop="roleSort">
          <el-input v-model="temp.icon" />
        </el-form-item>

        <!-- 菜单状态 -->
        <el-form-item :label="$t('menutable.visible')" prop="roleSort">
          <!-- <el-input v-model="temp.visible" /> -->
          <el-switch v-model="temp.visible" active-text="显示" inactive-text="隐藏" />
        </el-form-item>

        <!-- 创建者 -->
        <el-form-item v-show="1===2" :label="$t('menutable.createBy')" prop="roleSort">
          <el-input v-model="temp.createBy" />
        </el-form-item>

        <!-- 创建时间 -->
        <el-form-item v-show="1===2" :label="$t('menutable.createTime')" prop="roleSort">
          <el-input v-model="temp.createTime" />
        </el-form-item>

        <!-- 角色说明 -->
        <el-form-item v-show="1===2" :label="$t('menutable.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="菜单备注信息..."
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <!-- 确定 -->
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('menutable.confirm') }}</el-button>
        <!-- 取消 -->
        <el-button @click="dialogFormVisible = false">{{ $t('menutable.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteByRoleId, fetchMenuList, fetchPv, createArticle, updateArticle, getAsyncRoutes } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { checkMaxVal } from '@/utils/validator'
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
  components: { Searchs }, // Pagination
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
    visibleFilter(status) {
      const visibleMap = {
        '0': '',
        '1': 'danger'
      }
      return visibleMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: 'test1',
          sex: 'Man',
          date: '2019-05-01',
          address: 'address abc123'
        }
      ],
      seachType: 'menu',
      closeOnClickModal: false,
      typeAuthority: {
        'M': '目录',
        'C': '菜单',
        'F': '按钮'
      },
      visibleAuthority: {
        '0': '显示',
        '1': '隐藏'
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
      rules: {
        menuName: [{ required: true, message: '请输入角色名称', trigger: ['blur'] }],
        menuType: [{ required: true, message: '请选择菜单类型', trigger: ['blur'] }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    test() {
      getAsyncRoutes(this.listQuery).then(response => {
        console.log(response.data)
        console.log(response.data[0].meta)
        console.log((new Function('return ' + response.data[0].meta))()) // 字符串转对象
      })
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
      await this.getMenuList()
      this.refreshButton = 'el-icon-refresh'
      this.$message({
        message: '刷新完成',
        type: 'success'
      })
    },
    // 获取角色列表
    getMenuList() {
      this.listLoading = true
      fetchMenuList(this.listQuery).then(response => {
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
      this.getMenuList()
    },
    handleModifyStatus(row, status) {
      if (status === 'insert') {
        // 新增
        console.log(row)
      } else if (status === 'deleted') {
        // 删除
        row.show = false
        deleteByRoleId(row).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          setTimeout(() => {
            this.getMenuList()
          }, 3 * 1000)
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
        menuId: '',
        menuName: '',
        menuType: '',
        parentId: '',
        orderNum: '',
        url: '',
        target: '',
        show: '',
        perms: '',
        icon: '',
        remark: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    },
    handleCreateMenu(row, status) {
      if (status === 'insert') {
        this.resetTemp()
        this.temp.parentId = row.menuId
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        console.log(this.temp)
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.dataScope = '1'
          this.temp.status = '0'
          this.temp.createTime = new Date()
          this.temp.updateTime = new Date()
          createArticle(this.temp).then(() => {
            // 这条是本地新增一行
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.getMenuList()
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
            this.getMenuList()
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

