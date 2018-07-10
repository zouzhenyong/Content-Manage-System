<template>
<div>
    <div class="user_container">
        <div style="display:flex;padding:5px;background: #f5f5f5;">
            <el-button type="primary" @click="clickAddUser">新增</el-button>
            <el-button @click="clickAllUsers" type="success" style="height:40px;margin-left:4px">刷新</el-button>          
            <div style="margin:0 5px">
                <el-input placeholder="请输入内容" v-model="queryUserText" class="input-with-select">
                    <el-select v-model="selectUser" slot="prepend" placeholder="请选择">
                    <el-option label="账号" value="acc"></el-option>
                    </el-select>
                    <el-button  @click="searchUser" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <el-table
        :data="userArr"
        stripe
        border
        style="width: 100%">

        <el-table-column
        type="index"
        width="50">
        </el-table-column>

        <el-table-column label="账号" width="300">
        <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.acc }}</span>
        </template>
        </el-table-column>

        <el-table-column label="密码" width="300">
            <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pwd }}</span>
        </template>
        </el-table-column>

        <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button
            size="mini"
            type="success"
            @click="clickEditUser(scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="clickdelUser(scope.row)">删除</el-button>
        </template>
        </el-table-column>

        </el-table>
    </div>
    <el-pagination
    background
    layout="prev, pager, next"
    :page-count=user_maxPage
    @prev-click="up"
    @next-click="bottom"
    @current-change="clickPage"
    style="text-align:center;position:absolute;bottom:5px;left:50%">
    </el-pagination>
 <!-- 新增 -->
 <!-- 弹出框新增 -->
        <el-dialog class="addUser" title="新增用户" :visible.sync="addUserWindow"  width="400px">
        <el-form :model="add_user_form" >
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="add_user_form.acc" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input v-model="add_user_form.pwd" auto-complete="off"  size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addUserWindow = false">取 消</el-button>
          <el-button type="primary" @click="reAddUser">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 新增结束 -->
 <!-- 编辑 -->
 <!-- 弹出框编辑 -->
        <el-dialog class="editUser" title="编辑用户" :visible.sync="editUserWindow"  width="400px">
        <el-form :model="edit_user_form" >
            <input type="hidden" v-model="edit_user_form._id" name="" id="">
          <el-form-item label="账号" label-width="80px">
            <el-input v-model="edit_user_form.acc" auto-complete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input v-model="edit_user_form.pwd" auto-complete="off"  size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editUserWindow = false">取 消</el-button>
          <el-button type="primary" @click="reEditUser">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 编辑结束 -->
</div>
  
</template>


<script>
export default {
  data() {
    return {
      addUserWindow: false,
      editUserWindow: false,
      queryUserText: "",
      selectUser: "acc",
      searchFlag: false,
      page: 1,
      rows: 10,
      loading: true,
      //  新增
      add_user_form: {
        acc: "",
        pwd: ""
      },
      //   编辑
      edit_user_form: {
        _id: "",
        acc: "",
        pwd: ""
      }
    };
  },
  methods: {
    //   编辑用户
    clickEditUser(row) {
      this.edit_user_form.acc = row.acc;
      this.edit_user_form.pwd = row.pwd;
      this.edit_user_form._id = row._id;
      this.editUserWindow = true;
    },
    reEditUser() {
      this.$store.dispatch({
        type: "editUsers",
        form: this.edit_user_form,
        page: this.page
      });

      this.editUserWindow = false;

      this.$message({
        message: "编辑用户信息成功！",
        type: "success"
      });
    },
    // 新增用户
    clickAddUser() {
      this.addUserWindow = true;
    },
    // 确认新增
    reAddUser() {
      this.$store.dispatch({
        type: "addUsers",
        form: this.add_user_form
      });

      this.addUserWindow = false;

      this.$message({
        message: "添加用户成功！",
        type: "success"
      });

      this.add_user_form = {
        acc: "",
        pwd: ""
      };
    },
    // 删除
    clickdelUser(row) {
      this.$confirm(`你是否要删除用户${row.acc}的信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delUsers",
            _id: row._id
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 搜索
    searchUser() {
      if (this.selectUser && this.queryUserText) {
        this.searchFlag = true;
      } else {
        this.searchFlag = false;
      }
      this.getUserData(this.page, 10, this.selectUser, this.queryUserText);
    },
    // 刷新
    clickAllUsers() {
      this.searchFlag = false;
      this.getUserData(1, 10);
    },
    // 上一页
    up() {
      if (this.searchFlag) {
        this.getUserData(
          this.page - 1,
          10,
          this.selectUser,
          this.queryUserText
        );
      } else {
        this.getUserData(this.page - 1, 10);
      }
    },
    // 下一页
    bottom() {
      if (this.searchFlag) {
        this.getUserData(
          this.page + 1,
          10,
          this.selectUser,
          this.queryUserText
        );
      } else {
        this.getUserData(this.page + 1, 10);
      }
    },
    clickPage(page) {
      if (this.searchFlag) {
        this.getUserData(page, 10, this.selectUser, this.queryUserText);
      } else {
        this.getUserData(page, 10);
      }
    },
    getUserData(page, rows, key, value) {
      this.$store.dispatch({
        type: "getUsers",
        page,
        rows,
        key,
        value
      });
    }
  },
  created() {
    this.getUserData(1, 10);
  },
  computed: {
    userArr() {
      return this.$store.state.users.userData;
    },
    user_maxPage() {
      return this.$store.state.users.user_maxPage;
    }
  }
};
</script>

<style>
.el-main {
  padding: 0 !important;
  background: white;
  /* background: url("../../assets/img/bc.jpg");
  background-repeat: no-repeat;
  background-size: 90%; */
}
.el-select .el-input {
  width: 130px;
}
.el-table__empty-block {
    height: 78vh!important;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-input--small .el-input__inner {
  width: 220px;
}
.addUser .el-dialog,
.editUser .el-dialog {
  margin-top: 200px !important;
}
.user_container .input-with-select {
  width: 500px !important;
}
</style>
