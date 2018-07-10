<template>
    <div>
            <el-container style="height: 500px; border: 1px solid #eee;background: #f5f5f5;">
                    <el-header style="font-size: 12px;display:flex;justify-content: space-between;align-items: center;">
                        <p style="font-size:26px;display:flex;align-items: center;">
                          <img src="../../assets/img/maoyan.png" style="width:40px;margin-right:8px;margin-bottom:2px" alt="">
                          <span style="font-size:24px">猫眼管理系统</span>
                        </p>
                        <div>
                            <span v-if="this.loginFlag" style="font-size:16px">管理员：{{adminName}}</span>
                            <span v-if="this.loginFlag" class="loginOut" @click="loginOut">退出登录</span>
                            <span v-if="!this.loginFlag" class="login" @click="login">请登录. . .</span>
                        </div>
                    </el-header>
            <el-container>
              <el-aside  width="170px" style="background-color: rgb(238, 241, 246)">
                  <el-menu  :default-openeds="['1', '3']">
                      <el-menu-item class="main_tab" @click="clickTab" index="1-1">
                        <i class="iconfont icon-yonghuguanli"></i>用户管理</el-menu-item>
                      <el-menu-item  class="main_tab" @click="clickTab" index="1-2">
                        <i class="iconfont icon-dianyingziyuan"></i>电影管理</el-menu-item>
                      <el-menu-item  class="main_tab" @click="clickTab" index="1-3">
                        <i class="iconfont icon-dianyingyuan1"></i>影院管理</el-menu-item>
                      <el-menu-item  class="main_tab" @click="clickTab" index="1-4">
                        <i class="iconfont icon-pipeiziyuan"></i>匹配管理</el-menu-item>
                      <el-menu-item  class="main_tab" @click="clickTab" index="1-5">
                        <i class="iconfont icon-remai"></i>热映管理</el-menu-item>
                      <el-menu-item  class="main_tab" @click="clickTab" index="1-6">
                        <i class="iconfont icon-daiban" style="font-size:20px;margin-left:2px"></i>待映管理</el-menu-item>
                  </el-menu>
              </el-aside>
              <el-main>
                  <router-view/>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      adminName: "",
      loginFlag: false
    };
  },
  methods: {
    clickTab(e) {
      if (this.loginFlag) {
        switch (e.$props.index) {
          case "1-1":
            this.$router.push("/main/users");
            break;
          case "1-2":
            this.$router.push("/main/film");
            break;
          case "1-3":
            this.$router.push("/main/cinema");
            break;
          case "1-4":
            this.$router.push("/main/match");
            break;
          case "1-5":
            this.$router.push("/main/hotfilm");
            break;
          case "1-6":
            this.$router.push("/main/comingfilm");
            break;
        }
      } else {
        this.$router.push("/login");
        this.$message({
          message: "请先登录！",
          type: "warning"
        });
      }
    },
    loginOut() {
      this.$confirm("你确定要退出登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sessionStorage.admins = [];
          this.$router.push("/login");
        })
        .catch(() => {});
    },
    login() {
      this.$router.push("/login");
    }
  },
  created() {
    // console.log(JSON.parse(sessionStorage.admins));
    if (sessionStorage.admins) {
      this.adminName = JSON.parse(sessionStorage.admins).admin;
      this.loginFlag = true;
    }
  }
};
</script>

<style>
.el-main{
  background: url('../../assets/img/bc.jpg');
  /* background-position: 0 -180px; */
  background-size: 100%;
}
.el-header {
  background-color: rgb(42, 175, 219);
  color: white;
  /* background-color: #012242;
  color: white; */
  line-height: 60px;
}
.el-menu-item {
  background-color: rgb(40, 50, 64) !important;
  color: white !important;
}
.el-container {
  height: 100% !important;
}
aside {
  background-color: rgb(40, 50, 64) !important;
  height: 665px !important;
}
.el-menu {
  height: 100% !important;
  background-color: rgb(40, 50, 64) !important;
}
.main_tab {
  vertical-align: middle;
  font-size: 16px;
}
.main_tab i {
  font-size: 20px;
  margin-right: 8px;
  color: #eee;
}
.el-menu-item.is-active {
  background: rgb(26, 34, 44) !important;
}
.loginOut,
.login {
  margin-left: 8px;
  font-size: 12px;
  color: rgb(180, 232, 248);
  text-decoration: underline;
  cursor: pointer;
}
.login {
  color: red;
}
</style>
