<template>
    <div class="comingFilm">
        <div class="comingFilmTop" style="padding:5px;background: #f5f5f5;">
            <!-- 新增 -->
            <el-row>
                <el-button type="primary" @click='comingFilmAdd'>新增</el-button>
            </el-row>
            <!-- 清空 -->
            <el-row>
                <el-button type="success"  style="margin-left:5px" @click='comingfilmhandleClear'>刷新</el-button>
            </el-row>
            <!-- 搜索 -->
            <el-input placeholder="请输入内容" v-model="comingFilmSearchText" class="input-with-select">
                <el-select v-model="comingFilmSelect" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="film_name"></el-option>
                    <el-option label="电影类别" value="film_type"></el-option>
                    <el-option label="电影地区" value="film_area"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='comingfilmsearchBtn'> </el-button>
            </el-input>
        </div>

        <el-table :data="comingFilmtableData" style="width: 100%" stripe border>
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column label="电影名" width="100" prop='film_name' :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_name }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="电影英文名" width="170" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_English_name }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="电影类型" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影地区" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_area }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影时长" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_duration }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上映时间" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="终映时间" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_end_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影效果" width="80" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_nd }}</span>
                </template>
            </el-table-column>
            <el-table-column label="用户评分" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_user_point }}</span>
                </template>
            </el-table-column>
            <el-table-column label="想看" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_want }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="周票房" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_week_ticket }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="总票房" width="100" prop='film_total_ticket' :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_total_ticket }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="电影简介" width="100" height='100' :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_summary }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="电影导演" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_director }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="导演图片" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_dir_img }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="电影演员" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_actor }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column label="演员角色" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_role }}</span>
                </template>
            </el-table-column>
            <el-table-column label="演员图片" width="100" height='100' :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_act_img }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影图片" width="100" height='100' :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_imgs }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电影预告片" width="100" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_video }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <!-- 删除信息 -->
                    <el-button size="mini" type="danger" @click="comingfilmhandleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class='comingfilmpage' background layout="prev, pager, next" :page-count="comingFilmmaxpage" :current-page='comingFilmcurpage'
            @current-change='comingFilmcurrentChange' @prev-click='comingFilmclickprev' @next-click='comingFilmclicknext'>
        </el-pagination>

        <!-- 新增弹出框内容 -->
        <el-dialog title="新增待映电影" :visible.sync="comingFilmAddBtn" width="60%" padding='20px'>
            <el-table :data="filmtableData" style="width: 100%;height:426px;position:relative" stripe border @selection-change="cominghandleSelectionChange">
                <el-table-column type="index" width="40"> </el-table-column>                
                <el-table-column type="selection" width="55" v-model="checked"></el-table-column>
                <el-table-column label="电影名" width="130" prop='film_name'> </el-table-column>
                <el-table-column label="电影类型" width="120" prop='film_type'></el-table-column>
                <el-table-column label="电影时长" width="90" prop='film_duration'> </el-table-column>
                <el-table-column label="上映时间" width="100" prop='film_time'></el-table-column>
                <el-table-column label="终映时间" width="100" prop='film_end_time'></el-table-column>
                <el-table-column label="电影效果" width="80" prop='film_nd'></el-table-column>
                <el-table-column label="用户评分" width="85" prop='film_user_point'></el-table-column>
                <el-table-column label="想看" width="80" prop='film_want'></el-table-column>
            </el-table>
            <el-pagination class='filmpage' background layout="prev, pager, next" :page-count="maxpage" :current-page='curpage' @current-change='currentChange'
                @prev-click='clickprev' @next-click='clicknext'>
            </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="comingFilmAddBtn = false">取 消</el-button>
                <el-button type="primary" @click="comingFilmonSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      multipleSelection: [],
      comingFilmSearchText: "",
      comingFilmSelect: "film_name",
      comingFilmAddBtn: false,
      comingFilmEditBtn: false,
      isComingFilmSelected: false
    };
  },

  methods: {
    comingFilmAdd() {
      this.comingFilmAddBtn = true;
      this.getFilmData(1, 8);
    },
    //所有电影里面点击上一页
    clickprev() {
      if (this.curpage - 1 > 0) {
        this.getFilmData(this.curpage - 1, 8);
      }
    },
    //所有电影里面点击下一页
    clicknext() {
      if (this.curpage + 1 < this.maxpage + 1) {
        this.getFilmData(this.curpage + 1, 8);
      }
    },
    //所有电影里面点击想看的页面
    currentChange(page) {
      this.getFilmData(page, 8);
    },

    //待映电影里面点击上一页
    comingFilmclickprev() {
      if (this.isComingFilmSelected) {
        if (this.comingFilmcurpage - 1 > 0) {
          this.getComingFilmData(
            this.comingFilmSelect,
            this.comingFilmSearchText,
            this.comingFilmcurpage - 1,
            8
          );
        }
      } else if (this.comingFilmcurpage - 1 > 0) {
        this.getComingFilmData("", "", this.comingFilmcurpage - 1, 8);
      }
    },
    //待映电影里面点击下一页
    comingFilmclicknext() {
      if (this.isComingFilmSelected) {
        if (this.comingFilmcurpage + 1 < this.comingFilmmaxpage + 1) {
          this.getComingFilmData(
            this.comingFilmSelect,
            this.comingFilmSearchText,
            this.comingFilmcurpage + 1,
            8
          );
        }
      } else if (this.comingFilmcurpage + 1 < this.comingFilmmaxpage + 1) {
        this.getComingFilmData("", "", this.comingFilmcurpage + 1, 8);
      }
    },
    //待映电影里面点击想看的页面
    comingFilmcurrentChange(page) {
      if (this.isComingFilmSelected) {
        this.getComingFilmData(
          this.comingFilmSelect,
          this.comingFilmSearchText,
          page,
          8
        );
      } else {
        this.getComingFilmData("", "", page, 8);
      }
    },

    //点击多选框
    cominghandleSelectionChange(val) {
      this.multipleSelection = val;
    },
    comingFilmonSubmit() {
      for (let item of this.multipleSelection) {
        this.$store.dispatch({
          type: "addComingFilmData",
          val: item._id
        });
      }
      this.getComingFilmData("", "", 1, 9);
      this.comingFilmAddBtn = false;
    },
    //删除
    comingfilmhandleDelete(index, row) {
      this.$confirm("确认删除该条待映电影信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delcomingFlimData",
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

    //搜索
    comingfilmsearchBtn() {
      if (this.comingFilmSelect && this.comingFilmSearchText) {
        this.isComingFilmSelected = true;
        this.getComingFilmData(
          this.comingFilmSelect,
          this.comingFilmSearchText,
          1,
          8
        );
      } else {
        this.isComingFilmSelected = false;
      }
    },
    comingfilmhandleClear() {
      this.getComingFilmData("", "", 1, 8);
    },
    getComingFilmData(
      comingFilmSelected,
      comingFilmSelectedText,
      comingFilmcurpage,
      comingFilmmaxpage
    ) {
      this.$store.dispatch({
        type: "getComingFilmData",
        comingFilmSelected,
        comingFilmSelectedText,
        comingFilmcurpage,
        comingFilmmaxpage
      });
    },
    getFilmData(curpage, rows) {
      this.$store.dispatch({
        type: "getFilmData",
        curpage,
        rows
      });
    }
  },
  computed: {
    comingFilmtableData() {
      return this.$store.state.ComingFilm.comingFilmData;
    },
    filmtableData() {
      return this.$store.state.ComingFilm.comingallFilmData;
    },
    curpage() {
      return this.$store.state.ComingFilm.comingallfilmcurpage;
    },
    maxpage() {
      return this.$store.state.ComingFilm.comingallfilmmaxpage;
    },
    comingFilmcurpage() {
      return this.$store.state.ComingFilm.comingfilmcurpage;
    },
    comingFilmmaxpage() {
      return this.$store.state.ComingFilm.comingfilmmaxpage;
    }
  },
  created() {
    this.getComingFilmData("", "", 1, 8);
  }
};
</script>

<style>
.el-main {
  margin: 0;
  padding: 0;
}
.comingFilm .el-table--scrollable-x .el-table__body-wrapper {
  height: 525px;
}
.comingFilm .comingFilmTop {
  display: flex;
}

.comingFilm .el-select .el-input {
  width: 130px;
}

.comingFilm .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.comingFilm .input-with-select {
  width: 500px;
  margin: 0 5px;
}

.comingFilm .filmpage {
  position: absolute;
  margin-left:360px;
  bottom: 60px;
}
.comingFilm .el-dialog{
    margin-top: 42px!important;
}
.comingFilm .comingfilmpage {
  position: fixed;
  bottom: 5px;
  left: 50%;
}
</style>