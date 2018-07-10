<template>
    <div class='hotfilm'>
        <div class="hotFilmTop" style="padding:5px;background: #f5f5f5;">
            <!-- 新增 -->
            <el-row>
                <el-button type="primary" @click='hotFilmAdd'>新增</el-button>
            </el-row>
            <!-- 清空 -->
            <el-row>
                <el-button type="success" style="margin-left:5px" @click='hotfilmhandleClear'>刷新</el-button>
            </el-row>
            <!-- 搜索 -->
            <el-input placeholder="请输入内容" v-model="hotfilmSearchText" class="input-with-select">
                <el-select v-model="hotfilmSelect" slot="prepend" placeholder="请选择">
                    <el-option label="电影名" value="film_name"></el-option>
                    <el-option label="电影类别" value="film_type"></el-option>
                    <el-option label="电影地区" value="film_area"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click='hotfilmsearchBtn'> </el-button>
            </el-input>
        </div>

        <el-table :data="hotFilmtableData" style="width: 100%;" stripe border>
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
            </el-table-column> -->
            <!-- <el-table-column label="演员图片" width="100" height='100' :show-overflow-tooltip='true'>
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
                    <el-button size="mini" type="danger" @click="hotfilmhandleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class='hotfilmpage' background layout="prev, pager, next" :page-count="hotfilmmaxpage" :current-page='hotfilmcurpage'
            @current-change='hotfilmcurrentChange' @prev-click='hotfilmclickprev' @next-click='hotfilmclicknext'>
        </el-pagination>

        <!-- 新增弹出框内容 -->
        <el-dialog title="新增热映电影" :visible.sync="hotFilmAddBtn" width="60%" padding='20px'>
            <el-table :data="filmtableData" style="width: 100%;height:426px;position:relative" stripe border @selection-change="hothandleSelectionChange">
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
                <el-button @click="hotFilmAddBtn = false">取 消</el-button>
                <el-button type="primary" @click="hotFilmOnSubmit">确 定</el-button>
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
      hotfilmSearchText: "",
      hotfilmSelect: "film_name",
      hotFilmAddBtn: false,
      hotFilmEditBtn: false,
      ishotFilmSelected: false
    };
  },

  methods: {
    hotFilmAdd() {
      this.hotFilmAddBtn = true;
      this.hotgetFilmData(1, 8);
    },
    //所有电影里面点击上一页
    clickprev() {
      if (this.curpage - 1 > 0) {
        this.hotgetFilmData(this.curpage - 1, 8);
      }
    },
    //所有电影里面点击下一页
    clicknext() {
      if (this.curpage + 1 < this.maxpage + 1) {
        this.hotgetFilmData(this.curpage + 1, 8);
      }
    },
    //所有电影里面点击想看的页面
    currentChange(page) {
      this.hotgetFilmData(page, 8);
    },

    //热映电影里面点击上一页
    hotfilmclickprev() {
      if (this.ishotFilmSelected) {
        if (this.hotfilmcurpage - 1 > 0) {
          this.allhotFilmData(
            this.hotfilmSelect,
            this.hotfilmSearchText,
            this.hotfilmcurpage - 1,
            8
          );
        }
      } else if (this.hotfilmcurpage - 1 > 0) {
        this.allhotFilmData("", "", this.hotfilmcurpage - 1, 8);
      }
    },
    //热映电影里面点击下一页
    hotfilmclicknext() {
      if (this.ishotFilmSelected) {
        if (this.hotfilmcurpage + 1 < this.hotfilmmaxpage + 1) {
          console.log(this.hotfilmSelect);
          this.allhotFilmData(
            this.hotfilmSelect,
            this.hotfilmSearchText,
            this.hotfilmcurpage + 1,
            8
          );
        }
      } else if (this.hotfilmcurpage + 1 < this.hotfilmmaxpage + 1) {
        this.allhotFilmData("", "", this.hotfilmcurpage + 1, 8);
      }
    },
    //热映电影里面点击想看的页面
    hotfilmcurrentChange(page) {
      if (this.ishotFilmSelected) {
        console.log(this.hotFilmSelect);
        this.allhotFilmData(
          this.hotfilmSelect,
          this.hotfilmSearchText,
          page,
          8
        );
      } else {
        this.allhotFilmData("", "", page, 8);
      }
    },

    //点击多选框
    hothandleSelectionChange(val) {
      this.multipleSelection = val;
    },
    hotFilmOnSubmit() {
      for (let item of this.multipleSelection) {
        this.$store.dispatch({
          type: "addHotFilmData",
          val: item._id
        });
      }
      this.$store.dispatch({
        type: "getHotFilmData"
      });
      this.hotFilmAddBtn = false;
    },
    //删除
    hotfilmhandleDelete(index, row) {
      this.$confirm("确认删除该条热映电影信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delhotFlimData",
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
    hotfilmsearchBtn() {
      if (this.hotfilmSelect && this.hotfilmSearchText) {
        this.ishotFilmSelected = true;
        this.allhotFilmData(this.hotfilmSelect, this.hotfilmSearchText, 1, 8);
      } else {
        this.ishotFilmSelected = false;
      }
    },
    //清空
    hotfilmhandleClear() {
      this.allhotFilmData("", "", 1, 8);
    },
    hotgetFilmData(curpage, rows) {
      this.$store.dispatch({
        type: "hotgetFilmData",
        curpage,
        rows
      });
    },
    allhotFilmData(
      hotfilmSelect,
      hotfilmsearchText,
      hotfilmcurpage,
      hotfilmrows
    ) {
      this.$store.dispatch({
        type: "getHotFilmData",
        hotfilmSelect,
        hotfilmsearchText,
        hotfilmcurpage,
        hotfilmrows
      });
    }
  },
  computed: {
    hotFilmtableData() {
      return this.$store.state.HotFilm.hotFilmData;
    },
    filmtableData() {
      return this.$store.state.HotFilm.hotallFilmData;
    },
    curpage() {
      return this.$store.state.HotFilm.hotallfilmcurpage;
    },
    maxpage() {
      return this.$store.state.HotFilm.hotallfilmmaxpage;
    },
    hotfilmcurpage() {
      return this.$store.state.HotFilm.hotfilmcurpage;
    },
    hotfilmmaxpage() {
      return this.$store.state.HotFilm.hotfilmmaxpage;
    }
  },
  created() {
    this.allhotFilmData("", "", 1, 8);
  }
};
</script> 2
<style>
.hotfilm .el-table--scrollable-x .el-table__body-wrapper {
  height: 525px;
}
.el-main {
  margin: 0;
  padding: 0;
}
.hotfilm .hotFilmTop {
  display: flex;
}

.hotfilm .el-select .el-input {
  width: 130px;
}

.hotfilm .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.hotfilm .input-with-select {
  width: 500px;
  margin: 0 5px;
}

.hotfilm .filmpage {
  position: absolute;
  margin-left: 360px;
  bottom: 60px;
}
.hotfilm .el-dialog {
  margin-top: 42px !important;
}
.hotfilm .hotfilmpage {
  position: fixed;
  bottom: 5px;
  left: 50%;
}
</style>