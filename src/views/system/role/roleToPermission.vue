<template>
  <div>
    <el-row>
      <span class="dialog-span">
        <span>编辑角色的权限：</span>
        <el-tag>{{ temp.roleName }}</el-tag>
      </span>
    </el-row>
    <el-row :gutter="10" class="allocation-of-privileges">
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>菜单授权</el-tag>
          </div>
          <div class="role-permission-div">提示：勾选即可为角色授予菜单权限</div>
          <menu-tree :menu-data="menuData" :sure="sure" @editMenu="editMenu" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>部门授权</el-tag>
          </div>
          <div class="role-permission-div">提示：勾选即可为角色授予部门权限</div>
          <dept-tree
            :dept-data="deptData"
            :sure="sure"
            :data-scope="temp.dataScope"
            @editDept="editDept"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="role-permission-card">
            <el-tag>用户授权</el-tag>
          </div>
          <div class="role-permission-div">提示：勾选即可为角色授予用户权限</div>
          <user-tree :user-data="userData" :sure="sure" @editUser="editUser" />
        </el-card>
      </el-col>
    </el-row>

    <div slot="footer" class="dialog-footer">
      <!-- 确定 -->
      <el-button type="primary" @click="sureModify">{{ $t('roletable.confirm') }}</el-button>
      <!-- 取消 -->
      <el-button @click="cancelModify">{{ $t('roletable.cancel') }}</el-button>
    </div>
  </div>
</template>

<script>
import menuTree from './menu-tree'
import deptTree from './dept-tree'
import userTree from './user-tree'
import { updateRoleToMenu, updateRoleToUser, fetchRoleInfo, editDataScope, updateRoleToDept } from '@/api/article'// updateRoleToDept

export default {
  components: {
    menuTree,
    deptTree,
    userTree
  },
  props: {
    temp: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      menuData: [],
      deptData: [],
      userData: [],
      sure: 0,
      show: true
    }
  },
  watch: {
    temp(val) {
      fetchRoleInfo(val.roleId).then((response) => {
        this.menuData = []
        this.deptData = []
        this.userData = []
        response.data.menu.forEach(data => {
          this.menuData.push(data.menuId)
        })
        response.data.dept.forEach(data => {
          this.deptData.push(data.deptId)
        })
        response.data.user.forEach(data => {
          this.userData.push(data.userId)
        })
      })
    }
  },
  mounted() {
    this.initRoleInfo()
  },
  methods: {
    initRoleInfo() {
      fetchRoleInfo(this.temp.roleId).then((response) => {
        this.menuData = []
        this.deptData = []
        this.userData = []
        response.data.menu.forEach(data => {
          this.menuData.push(data.menuId)
        })
        response.data.dept.forEach(data => {
          this.deptData.push(data.deptId)
        })
        response.data.user.forEach(data => {
          this.userData.push(data.userId)
        })
      })
    },
    sureModify() {
      // 自增，使三个子组件的监听发生变化，从而执行editMenu，editUser，editDept三个函数
      ++this.sure
      // 向父组件传值
      this.$emit('sureModify', false)
    },
    // 关闭按钮
    cancelModify() {
      this.$emit('sureModify', false)
    },
    // 修改菜单
    editMenu(data) {
      updateRoleToMenu(data, this.temp.roleId).then(() => {
        // 成功
      })
    },
    // 修改用户
    editUser(data) {
      updateRoleToUser(data, this.temp.roleId).then(() => {
        // 成功
      })
    },
    // 修改部门
    editDept(data) {
      if (data.constructor === Array) {
        updateRoleToDept(data, this.temp.roleId).then(() => {
          // 成功
          this.$emit('dataScope', '2')
        })
      } else if (data.constructor === String) {
        editDataScope(data, this.temp.roleId).then(() => {
          // 成功
          this.$emit('dataScope', data)
        })
      }
    }
  }
}
</script>

<style>
.dialog-span {
  display: inline-block;
  margin: 20px 10px;
}
.role-permission-card {
  margin: 0.625rem;
  font-size: 1.25rem;
  color: black;
}
.role-permission-div {
  margin: 0.625rem;
  color: #909399;
}
.el-dialog--center .el-dialog__body {
  padding: 0px 20px;
}
.dialog-footer {
  padding: 10px;
}
</style>

