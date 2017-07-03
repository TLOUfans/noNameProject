<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData" border width="100%">
        <el-table-column prop="code" label="用户名"></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import {listUser, delUser} from '../../api/api'
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      handleDel(index, row) {
        this.$confirm('此操作将永久删除该条信息，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({
            id: row._id
          }).then(res => {
            if(res.success) {
              this.$message.success('删除成功')
              this.listUser()
            } else {
              this.$message.err(`删除失败:${res.info}`)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      listUser() {
        listUser().then(res => {
          this.tableData = res.records
        })
      }
    },
    mounted() {
      this.listUser()
    }
  }

</script>
