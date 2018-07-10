<template>
    <div class="film">
        <div class="top" style="padding:5px;background: #f5f5f5;">
            <!-- 新增 -->
            <el-row>
                <el-button type="primary" @click='addFilm'>新增</el-button>
            </el-row>
            <!-- 清空 -->
            <el-row>
                <el-button style="margin-left:5px" type="success" @click='handleClear'>刷新</el-button>
            </el-row>
            <!-- 搜索 -->
            <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="film_name"></el-option>
                    <el-option label="电影类别" value="film_type"></el-option>
                    <el-option label="电影地区" value="film_area"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='searchBtn'> </el-button>
            </el-input>
        </div>

        <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column label="电影名" width="190" prop='film_name'> </el-table-column>
            <el-table-column label="电影英文名" width="180" prop='film_English_name' :show-overflow-tooltip='true'></el-table-column>
            <el-table-column label="电影类型" width="120" prop='film_type'></el-table-column>
            <el-table-column label="电影地区" width="100" prop='film_area' :show-overflow-tooltip='true'></el-table-column>
            <el-table-column label="电影时长" width="100" prop='film_duration'> </el-table-column>
            <el-table-column label="上映时间" width="100" prop='film_time'></el-table-column>
            <el-table-column label="终映时间" width="100" prop='film_end_time'></el-table-column>
            <el-table-column label="电影效果" width="100" prop='film_nd'></el-table-column>
            <el-table-column label="用户评分" width="100" prop='film_user_point'> </el-table-column>
            <el-table-column label="想看" width="100" prop='film_want'></el-table-column>
            <el-table-column label="周票房" width="100" prop='film_week_ticket'></el-table-column>
            <el-table-column label="总票房" width="100" prop='film_total_ticket'> </el-table-column>
            <el-table-column label="电影简介" width="100" height='100' prop='film_summary' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="电影导演" width="120" prop='film_director'>
            </el-table-column>
            <el-table-column label="导演图片" width="100" prop='film_dir_img' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="电影演员" width="100" prop='film_actor' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="演员角色" width="100" prop='film_role' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="演员图片" width="100" height='100' prop='film_act_img' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="电影海报" width="100" height='100' prop='film_bill' :show-overflow-tooltip='true'>
              </el-table-column>
            <el-table-column label="电影图片" width="100" height='100' prop='film_imgs' :show-overflow-tooltip='true'>
            </el-table-column>
            <el-table-column label="电影预告片" width="100" prop='film_video' :show-overflow-tooltip='true'>
            </el-table-column>

            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <!-- 编辑信息 -->
                    <el-button size="mini" @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
                    <!-- 删除信息 -->
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class='page' background layout="prev, pager, next" :page-count="maxpage" :current-page='curpage' @current-change='currentChange'
            @prev-click='clickprev' @next-click='clicknext'>
        </el-pagination>


        <!-- 新增弹出框内容 -->
        <el-dialog class="addFilm" title="新增电影" :visible.sync="addBtn" width="28%" padding='20px'>
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="电影名">
                    <el-input v-model="addForm.film_name"></el-input>
                </el-form-item>
                <el-form-item label="电影英文名">
                    <el-input v-model="addForm.film_English_name"></el-input>
                </el-form-item>
                <el-form-item label="电影类型">
                    <el-input v-model="addForm.film_type"></el-input>
                </el-form-item>
                <el-form-item label="电影地区">
                    <el-input v-model="addForm.film_area"></el-input>
                </el-form-item>
                <el-form-item label="电影时长">
                    <el-input v-model="addForm.film_duration"></el-input>
                </el-form-item>
                <el-form-item label="上映时间">
                    <el-input v-model="addForm.film_time"></el-input>
                </el-form-item>
                <el-form-item label="终映时间">
                    <el-input v-model="addForm.film_end_time"></el-input>
                </el-form-item>
                <el-form-item label="电影效果">
                    <el-input v-model="addForm.film_nd"></el-input>
                </el-form-item>
                <el-form-item label="用户评分">
                    <el-input v-model="addForm.film_user_point"></el-input>
                </el-form-item>
                <el-form-item label="想看">
                    <el-input v-model="addForm.film_want"></el-input>
                </el-form-item>
                <el-form-item label="周票房">
                    <el-input v-model="addForm.film_week_ticket"></el-input>
                </el-form-item>
                <el-form-item label="总票房">
                    <el-input v-model="addForm.film_total_ticket"></el-input>
                </el-form-item>
                <el-form-item label="电影简介">
                    <el-input v-model="addForm.film_summary"></el-input>
                </el-form-item>
                <el-form-item label="电影导演">
                    <el-input v-model="addForm.film_director"></el-input>
                </el-form-item>
                <el-form-item label="导演图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_dir_img'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucDirUpload' :on-change='changeDirUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影演员">
                    <el-input v-model="addForm.film_actor"></el-input>
                </el-form-item>
                <el-form-item label="电影演员角色">
                    <el-input v-model="addForm.film_role"></el-input>
                </el-form-item>
                <el-form-item label="演员图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_act_img'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucActUpload' :on-change='changeActUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影海报">
                  <el-upload class="upload-demo" multiple :action="IP+'/film/bill'" :limit='5' :auto-upload="true"
                      ref='upload' :on-success='sucBillUpload' :on-change='changeBillUpload'>
                      <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
              </el-form-item>
                <el-form-item label="电影图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_film_imgs'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucFilmUpload' :on-change='changeFilmUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影预告片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/video'" :auto-upload="true" ref='upload' :on-success='sucVideoUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addBtn = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑弹出框 -->
        <el-dialog class="editFilm" title="编辑员工" :visible.sync="editBtn" width="28%" padding='20px' :before-close="handleClose">

            <el-form ref="EditForm" :model="EditForm" label-width="100px">
                <el-form-item label="电影名">
                    <el-input v-model="EditForm.film_name"></el-input>
                </el-form-item>
                <el-form-item label="电影英文名">
                    <el-input v-model="EditForm.film_English_name"></el-input>
                </el-form-item>
                <el-form-item label="电影类型">
                    <el-input v-model="EditForm.film_type"></el-input>
                </el-form-item>
                <el-form-item label="电影地区">
                    <el-input v-model="EditForm.film_area"></el-input>
                </el-form-item>
                <el-form-item label="电影时长">
                    <el-input v-model="EditForm.film_duration"></el-input>
                </el-form-item>
                <el-form-item label="上映时间">
                    <el-input v-model="EditForm.film_time"></el-input>
                </el-form-item>
                <el-form-item label="终映时间">
                    <el-input v-model="EditForm.film_end_time"></el-input>
                </el-form-item>
                <el-form-item label="电影几D">
                    <el-input v-model="EditForm.film_nd"></el-input>
                </el-form-item>
                <el-form-item label="用户评分">
                    <el-input v-model="EditForm.film_user_point"></el-input>
                </el-form-item>
                <el-form-item label="想看">
                    <el-input v-model="EditForm.film_want"></el-input>
                </el-form-item>
                <el-form-item label="周票房">
                    <el-input v-model="EditForm.film_week_ticket"></el-input>
                </el-form-item>
                <el-form-item label="总票房">
                    <el-input v-model="EditForm.film_total_ticket"></el-input>
                </el-form-item>
                <el-form-item label="电影简介">
                    <el-input v-model="EditForm.film_summary"></el-input>
                </el-form-item>
                <el-form-item label="电影导演">
                    <el-input v-model="EditForm.film_director"></el-input>
                </el-form-item>
                <el-form-item label="导演图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_dir_img'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucEditDirUpload' :on-change='changeDirUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影演员">
                    <el-input v-model="EditForm.film_actor"></el-input>
                </el-form-item>
                <el-form-item label="电影演员角色">
                    <el-input v-model="EditForm.film_role"></el-input>
                </el-form-item>
                <el-form-item label="演员图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_act_img'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucEditActUpload' :on-change='changeActUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影海报">
                  <el-upload class="upload-demo" multiple :action="IP+'/film/bill'" :limit='5' :auto-upload="true"
                      ref='upload' :on-success='sucEditBillUpload' :on-change='changeBillUpload'>
                      <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
              </el-form-item>
                <el-form-item label="电影图片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/film_film_imgs'" :limit='5' :auto-upload="true"
                        ref='upload' :on-success='sucEditFilmUpload' :on-change='changeFilmUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="电影预告片">
                    <el-upload class="upload-demo" multiple :action="IP+'/film/video'" :auto-upload="true" ref='upload' :on-success='sucEditVideoUpload'>
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editBtn = false">取 消</el-button>
                <el-button type="primary" @click="editOnSubmit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      IP: "http://192.168.43.234:3223",
      searchText: "",
      select: "film_name",
      isSelect: false,
      addBtn: false,
      editBtn: false,
      addForm: {
        film_name: "",
        film_English_name: "",
        film_type: "",
        film_area: "",
        film_duration: "",
        film_time: "",
        film_end_time: "",
        film_nd: "",
        film_user_point: "",
        film_want: "",
        film_week_ticket: "",
        film_total_ticket: "",
        film_summary: "",
        film_director: "",
        film_dir_img: "",
        film_actor: "",
        film_role: "",
        film_act_img: "",
        film_imgs: "",
        film_bill: "",
        film_video: ""
      },
      EditForm: {
        _id: "",
        film_name: "",
        film_English_name: "",
        film_type: "",
        film_area: "",
        film_duration: "",
        film_time: "",
        film_end_time: "",
        film_nd: "",
        film_user_point: "",
        film_want: "",
        film_week_ticket: "",
        film_total_ticket: "",
        film_summary: "",
        film_director: "",
        film_dir_img: "",
        film_actor: "",
        film_role: "",
        film_act_img: "",
        film_imgs: "",
        film_bill: "",
        film_video: ""
      },
      billallImgPath: [],
      dirallImgPath: [],
      actallImgPath: [],
      filmallImgPath: [],
      videoallImgPath: []
    };
  },
  methods: {
    //点击上一页
    clickprev() {
      if (this.isSelect) {
        this.getData(this.select, this.searchText, this.curpage - 1, 10);
      } else if (this.curpage - 1 > 0) {
        this.getData("", "", this.curpage - 1, 10);
      }
    },
    //点击下一页
    clicknext() {
      if (this.isSelect) {
        this.getData(this.select, this.searchText, this.curpage + 1, 10);
      } else if (this.curpage + 1 < this.maxpage + 1) {
        this.getData("", "", this.curpage + 1, 10);
      }
    },
    //点击想看的页面
    currentChange(page) {
      if (this.isSelect) {
        this.getData(this.select, this.searchText, page, 10);
      } else {
        this.getData("", "", page, 10);
      }
    },

    //增加电影信息
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    //上传图片
    changeDirUpload: function(file, fileList) {
      //预览图片
      this.uploadImg(fileList, 0);
    },
    //上传演员图片
    changeActUpload: function(file, fileList) {
      //预览图片
      this.uploadImg(fileList, 1);
    },
    changeBillUpload: function(file, fileList) {
      this.uploadImg(fileList, 2);
    },
    changeFilmUpload: function(file, fileList) {
      //预览图片
      this.uploadImg(fileList, 3);
    },
    uploadImg(fileList, num) {
      this.$nextTick(() => {
        let upload_list_li = document.getElementsByClassName("el-upload-list")[
          Number(num)
        ].children;
        for (let i = 0; i < upload_list_li.length; i++) {
          let li_a = upload_list_li[i].children[0];
          let imgElement = document.createElement("img");
          imgElement.setAttribute("src", fileList[i].url);
          imgElement.setAttribute(
            "style",
            "max-width:25%;max-height:20%;padding-left:5%"
          );
          if (li_a.lastElementChild.nodeName !== "IMG") {
            li_a.appendChild(imgElement);
          }
        }
      });
    },
    // changeVideoUpload: function (file, fileList) {//预览图片
    //     // this.uploadImg(fileList)
    // },

    //新增图片
    sucBillUpload: function(res) {
      this.billallImgPath.push(res[0]);
      this.addForm.film_bill = this.billallImgPath;
    },
    sucDirUpload: function(res) {
      this.dirallImgPath.push(res[0]);

      this.addForm.film_dir_img = this.dirallImgPath;
    },
    sucActUpload: function(res) {
      this.actallImgPath.push(res[0]);
      this.addForm.film_act_img = this.actallImgPath;
    },
    sucFilmUpload: function(res) {
      this.filmallImgPath.push(res[0]);
      this.addForm.film_imgs = this.filmallImgPath;
    },
    sucVideoUpload: function(res) {
      this.videoallImgPath.push(res[0]);
      this.addForm.film_video = this.videoallImgPath;
    },

    // 编辑图片
    sucEditDirUpload: function(res) {
      this.dirallImgPath.push(res[0]);
      this.EditForm.film_dir_img = this.dirallImgPath;
    },
    sucEditActUpload: function(res) {
      this.actallImgPath.push(res[0]);
      this.EditForm.film_act_img = this.actallImgPath;
    },
    sucEditFilmUpload: function(res) {
      this.filmallImgPath.push(res[0]);
      this.EditForm.film_imgs = this.filmallImgPath;
    },
    sucEditBillUpload: function(res) {
      this.billallImgPath.push(res[0]);
      this.EditForm.bill = this.billallImgPath;
    },

    sucEditVideoUpload: function(res) {
      this.videoallImgPath.push(res[0]);
      this.EditForm.film_video = this.videoallImgPath;
    },
    // 打开增加的窗口
    addFilm() {
      (this.billallImgPath = []),
        (this.dirallImgPath = []),
        (this.actallImgPath = []),
        (this.filmallImgPath = []),
        (this.videoallImgPath = []);
      this.addBtn = true;
      for (let item in this.addForm) {
        this.addForm[item] = "";
      }
    },
    //提交表单
    onSubmit() {
      this.$store.dispatch({
        type: "addFilmData",
        addText: this.addForm
      });
      this.addBtn = false;
    },
    //删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delFlimData",
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

    //渲染编辑信息
    handleEdit(index, row) {
      this.editBtn = true;
      for (let key in row) {
        this.EditForm[key] = row[key];
      }
    },

    //编辑后的员工信息提交
    editOnSubmit() {
      this.$store.dispatch({
        type: "editFilmData",
        val: this.EditForm
      });
      this.editBtn = false;
    },
    //搜索
    searchBtn() {
      if (this.select && this.searchText) {
        this.isSelect = true;
        this.getData(this.select, this.searchText, 1, 10);
      } else {
        this.isSelect = false;
      }
    },
    handleClear() {
      this.getData('','', 1, 10);
    },
    getData(select, searchText, curpage, rows) {
      this.$store.dispatch({
        type: "getFilmData",
        select,
        searchText,
        curpage,
        rows
      });
    }
  },
  computed: {
    tableData() {
      return this.$store.state.Film.filmData;
    },
    curpage() {
      return this.$store.state.Film.curpage;
    },
    maxpage() {
      return this.$store.state.Film.maxpage;
    }
  },
  created() {
    this.getData("", "", 1, 10);
  }
};
</script>

<style>
.film .el-dialog {
  width: 500px !important;
  height: 650px !important;
  overflow: auto;
  margin-top: 28px !important;
}
.film .addFilm .el-input__inner,
.film .editFilm .el-input__inner {
  width: 300px !important;
}
.el-main {
  margin: 0 !important;
  padding: 0 !important;
}
.film .el-table--scrollable-x .el-table__body-wrapper {
  height: 525px;
}
.film .el-select .el-input {
  width: 130px;
}

.film .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.film .input-with-select {
  width: 500px;
  margin: 0 5px;
}

.film .el-table__row {
  height: 50px !important;
  padding: 0px !important;
}

.film .top {
  display: flex;
}

.film .page {
  position: fixed;
  bottom: 5px;
  left: 50%;
}
</style>