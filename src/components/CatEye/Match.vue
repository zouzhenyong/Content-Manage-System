<template>
  <div class="match_container">
      <!-- 主表格 -->
      <div>
          <!-- 搜索框+增加+刷新 -->
          <div style="display:flex;padding:5px;background: #f5f5f5;">
              <el-button type="primary" @click="clickAddMatch" >新增</el-button>          
              <el-button @click="clickAllMatch" type="success" style="height:40px;margin-left:5px">刷新</el-button>
              <div style="margin:0 -4px">
                  <el-input placeholder="请输入内容" v-model="queryMatchText" class="input-with-select">
                      <el-select v-model="selectMatch" slot="prepend" placeholder="请选择">
                        <el-option label="电影名" value="film_name"></el-option>
                        <el-option label="影院名" value="cinema_name"></el-option>
                        <el-option label="放映日期" value="date"></el-option>
                      </el-select>
                      <el-button  @click="searchMatch" slot="append" icon="el-icon-search"></el-button>
                  </el-input>
              </div>
          </div>

          <!-- 表格 -->
          <el-table :data="matchArr" stripe border style="width: 100%">
              <el-table-column type="index" width="50"> </el-table-column>

              <el-table-column label="电影名" width="150" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.film[0].film_name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="上映时间" width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>

              <el-table-column label="起始时间" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
                </template>
              </el-table-column>

              <el-table-column label="结束时间" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
                </template>
              </el-table-column>

              <el-table-column label="院线" width="180" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cinema[0].cinema_name }}</span>
                </template>
              </el-table-column>
              
              <el-table-column label="放映厅" width="120">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.room[0].room_name }}</span>
                </template>
              </el-table-column>

              <el-table-column label="影院地址" width="180" :show-overflow-tooltip='true'>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cinema[0].cinema_add }}</span>
                </template>
              </el-table-column>

              <el-table-column label="票价" width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.price }}元</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="clickEditMatch(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="clickdelMatch(scope.row)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>

          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :page-count=match_maxPage 
          @prev-click="up" @next-click="bottom" @current-change="clickPage"
          style="text-align:center;position:absolute;bottom:5px;left:50%">
          </el-pagination>
      </div>

      <!-- 新增匹配信息 -->
      <el-dialog :title="matchTitle" class="matchWindow" :visible.sync="addMatchWindow"  width="480px" style="margin-top:-150px">
          <el-form :model="add_match_form" >
              <el-form-item label="选择电影" label-width="140px">
                <el-button type="primary" @click="addMatchFilm">{{selectFilm}}</el-button>
              </el-form-item>
              <el-form-item label="选择影院" label-width="140px">
                <el-button type="success" @click="addMatchCinema">{{selectCinema}}</el-button>
              </el-form-item>
              <el-form-item label="选择影厅" label-width="140px">
                <el-button type="danger" @click="addMatchRoom">{{selectRoom}}</el-button>
              </el-form-item>
              <el-form-item label="选择日期" label-width="140px">
                <div class="block">
                  <el-date-picker
                    v-model="add_match_form.playDate" type="date" 
                    value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item label="起始时间" label-width="140px">
                <el-time-select placeholder="起始时间" v-model="add_match_form.startTime"
                  :picker-options="{
                    start: '09:00',
                    step: '00:15',
                    end: '18:30' }">
                </el-time-select>
              </el-form-item>
              <el-form-item label="结束时间" label-width="140px">
                <el-time-select placeholder="结束时间" v-model="add_match_form.endTime"
                  :picker-options="{
                    start: '10:15',
                    step: '00:15',
                    end: '24:00',
                    minTime: add_match_form.startTime}">
                </el-time-select>
              </el-form-item>
              <el-form-item class="ticket" label="设置票价" label-width="140px">
                  <i class="iconfont icon-piaojia1"></i>
                  <el-input v-model="add_match_form.price" auto-complete="off" size="small" placeholder="输入票价"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addMatchWindow = false">取 消</el-button>
            <el-button type="primary" @click="addMatchInfo">确 定</el-button>
          </div>
      </el-dialog> 
      <!-- 新增匹配结束 -->

      <!-- 选择电影 -->
      <el-dialog title="新增匹配电影" :visible.sync="addFilmWindow"  width="866px" style="margin-top:-165px">
          <div class="addFilmWindow">
              <el-table ref="multipleTable" :data="filmArr" height="425" tooltip-effect="dark" border stripe style="width: 100%" 
              @selection-change="selectAddFilm">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="电影名" width="120">
                      <template slot-scope="scope">{{ scope.row.film_name }}</template>
                  </el-table-column>
                  <el-table-column label="英文名" width="165">
                      <template slot-scope="scope">{{ scope.row.film_English_name }}</template>
                  </el-table-column>
                  <el-table-column label="电影类型" width="125">
                      <template slot-scope="scope">{{ scope.row.film_type }}</template>
                  </el-table-column>
                  <el-table-column label="电影时长" width="90">
                      <template slot-scope="scope">{{ scope.row.film_duration }}</template>
                  </el-table-column>
                  <el-table-column label="上映日期" width="110">
                      <template slot-scope="scope">{{ scope.row. film_time }}</template>
                  </el-table-column>
                  <el-table-column label="结束时间" width="110">
                      <template slot-scope="scope">{{ scope.row. film_end_time }}</template>
                  </el-table-column>
              </el-table>
              <!-- 分页 -->
              <el-pagination
                  background layout="prev, pager, next" :page-count=film_maxPage
                  @prev-click="allFilm_up" @next-click="allFim_bottom" @current-change="clickFilmPage"
                  style="text-align:center;margin: 20px 0 -40px">
              </el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="addFilmWindow = false">取 消</el-button>
              <el-button type="primary" @click="reAddFilm">确 定</el-button>
          </div>
      </el-dialog>
      <!-- 选择电影结束 -->

      <!-- 选择影院 -->
      <el-dialog title="选择影院" :visible.sync="addCinemaWindow"  width="666px" style="margin-top:-185px">
          <div class="addCinemaWindow">
              <el-table ref="multipleTable" :data="cinemaArr" height="425" tooltip-effect="dark" border stripe style="width: 100%" 
              @selection-change="selectAddCinema">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="影院名" width="200">
                      <template slot-scope="scope">{{ scope.row.cinema_name }}</template>
                  </el-table-column>
                  <el-table-column label="地址" width="320" :show-overflow-tooltip='true'>
                      <template slot-scope="scope" >{{ scope.row.cinema_add }}</template>
                  </el-table-column>
              </el-table>
              <!-- 分页 -->
              <el-pagination
                  background layout="prev, pager, next" :page-count=cinema_maxPage
                  @prev-click="allCinema_up" @next-click="allCinema_bottom" @current-change="clickCinemaPage"
                  style="text-align:center;margin: 20px 0 -20px">
              </el-pagination>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="addCinemaWindow = false">取 消</el-button>
              <el-button type="primary" @click="reAddCinema">确 定</el-button>
          </div>
      </el-dialog>
      <!-- 选择影院结束 -->

      <!-- 选择影厅 -->
      <el-dialog :title="roomTitle" :visible.sync="addRoomWindow"  width="405px" style="margin-top:-140px">
          <div class="addRoomWindow">
              <el-table ref="multipleTable" :data="roomArr" height="405" tooltip-effect="dark" border stripe style="width: 100%" 
              @selection-change="selectAddRoom">
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="影厅名" width="259">
                      <template slot-scope="scope">{{ scope.row.room_name }}</template>
                  </el-table-column>
              </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
              <el-button @click="addRoomWindow = false">取 消</el-button>
              <el-button type="primary" @click="reAddRoom">确 定</el-button>
          </div>
      </el-dialog>
      <!-- 选择影厅结束 -->
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 设置当日之前的时间不可选
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      matchTitle: "", // 匹配弹窗的标题
      roomTitle: "", // 影厅的影院标题
      addMatchWindow: false, // 匹配的弹窗
      addCinemaWindow: false, // 选择影院的弹窗
      addFilmWindow: false, // 选择电影的弹窗
      addRoomWindow: false, // 选择影厅的弹窗
      queryMatchText: "", // 查找的value
      selectMatch: "film_name", // 默认查找的内容
      searchFlag: false, // 查找状态
      matchPage: 1, // 匹配页面的页数
      matchRows: 10, // 匹配页面的每页条数
      filmPage: 1, // 电影页面的页数
      filmRows: 7, // 电影页面的每页条数
      cinemaPage: 1, // 影院页面的页数
      cinemaRows: 8, // 影院页面的每页条数

      // 新增还是编辑的状态
      addEdit: true,

      // 新增/编辑匹配的表单内容
      add_match_form: {
        select_film_id: "",
        select_cinema_id: "",
        select_room_id: "",
        playDate: "",
        startTime: "",
        endTime: "",
        seatArr: "",
        price: ""
      },
      match_id: "",
      seat_id: "",

      // 选择的电影和放映厅
      selectFilm: "点击选择",
      selectCinema: "点击选择",
      selectRoom: "点击选择",

      //  新增
      wantAddFilm: [],
      wantAddCinema: [],
      wantAddRoom: []
    };
  },
  methods: {
    // ------------------------------ 主页面渲染 ---------------------------------
    // 匹配页面上一页
    up() {
      if (this.searchFlag) {
        this.searchMatchInfos(
          this.matchPage - 1,
          10,
          this.selectMatch,
          this.queryMatchText
        );
      } else {
        this.getMatchInfo(this.matchPage - 1, 10);
      }
    },
    // 匹配页面下一页
    bottom() {
      if (this.searchFlag) {
        this.searchMatchInfos(
          this.matchPage + 1,
          10,
          this.selectMatch,
          this.queryMatchText
        );
      } else {
        this.getMatchInfo(this.matchPage + 1, 10);
      }
    },
    clickPage(page) {
      if (this.searchFlag) {
        this.searchMatchInfos(page, 10, this.selectMatch, this.queryMatchText);
      } else {
        this.getMatchInfo(page, 10);
      }
    },
    // ------------------------------ 新增匹配信息 -------------------------------
    // 新增匹配
    clickAddMatch() {
      this.matchTitle = "新增匹配";

      for (let key in this.add_match_form) {
        this.add_match_form[key] = "";
      }
      this.selectFilm = "点击选择";
      this.selectCinema = "点击选择";
      this.selectRoom = "点击选择";

      this.addMatchWindow = true;
      this.addEdit = true;
    },
    // -------------- 新增电影 -------------
    // 所有电影上一页
    allFilm_up() {
      this.getFilmInfo(this.filmPage - 1, 7);
    },
    // 所有电影下一页
    allFim_bottom() {
      this.getFilmInfo(this.filmPage + 1, 7);
    },
    // 点击页码
    clickFilmPage(page) {
      this.getFilmInfo(page, 7);
    },
    addMatchFilm() {
      this.addFilmWindow = true;
      this.getFilmInfo(1, 7);
    },
    selectAddFilm(val) {
      this.wantAddFilm = val;
    },
    // 确认新增电影
    reAddFilm() {
      if (this.wantAddFilm.length == 1) {
        this.add_match_form.select_film_id = [this.wantAddFilm[0]._id];
        this.selectFilm = `${this.wantAddFilm[0].film_name} - ${
          this.wantAddFilm[0].film_duration
        }`;
        this.add_match_form.playDate = this.wantAddFilm[0].film_time;
        this.addFilmWindow = false;
      } else {
        this.$message({
          message: "请选择一部电影！",
          type: "warning"
        });
      }
    },
    // ------------------ 新增影院 ------------------
    // 选择影院
    addMatchCinema() {
      this.addCinemaWindow = true;
      this.getCinemaInfo(1, 8);
    },
    // 所有影院上一页
    allCinema_up() {
      this.getCinemaInfo(this.cinemaPage - 1, 8);
    },
    // 所有影院下一页
    allCinema_bottom() {
      this.getCinemaInfo(this.cinemaPage + 1, 8);
    },
    // 点击页码
    clickCinemaPage(page) {
      this.getCinemaInfo(page, 8);
    },
    // 确认新增影院
    reAddCinema() {
      if (this.wantAddCinema.length == 1) {
        this.add_match_form.select_cinema_id = [this.wantAddCinema[0]._id];
        this.selectCinema = `${this.wantAddCinema[0].cinema_name} - ${
          this.wantAddCinema[0].cinema_add.length > 7
            ? this.wantAddCinema[0].cinema_add.slice(0, 7) + "…"
            : this.wantAddCinema[0].cinema_add
        }`;
        this.addCinemaWindow = false;
      } else {
        this.$message({
          message: "请选择一家影院！",
          type: "warning"
        });
      }
    },
    selectAddCinema(val) {
      this.wantAddCinema = val;
    },
    // -------------------- 新增影厅 ---------------------
    // 新增影厅
    addMatchRoom() {
      if (this.add_match_form.select_cinema_id) {
        if (this.addEdit) {
          this.roomTitle = this.wantAddCinema[0].cinema_name;
        }
        let _id = this.add_match_form.select_cinema_id[0];
        this.getRoomInfo(_id);
        this.addRoomWindow = true;
      } else {
        this.$message.error("请先选择影院！");
      }
    },
    selectAddRoom(val) {
      this.wantAddRoom = val;
    },
    // 确认添加影厅
    reAddRoom() {
      if (this.wantAddRoom.length == 1) {
        this.add_match_form.select_room_id = [this.wantAddRoom[0]._id];
        this.add_match_form.seatArr = this.wantAddRoom[0].room_seat;
        console.log(this.wantAddRoom[0].seat, "影厅");
        this.selectRoom = this.wantAddRoom[0].room_name;
        this.addRoomWindow = false;
      } else {
        this.$message({
          message: "请选择一个放映厅！",
          type: "warning"
        });
      }
    },
    // ----------------------------------- 确认添加添加匹配信息 ---------------------------------------
    addMatchInfo() {
      // 判断是否填写完整
      let textFlag = true;
      for (let key in this.add_match_form) {
        if (!this.add_match_form[key]) {
          textFlag = false;
          break;
        }
      }
      console.log(this.add_match_form);
      // 如果填写完整
      if (textFlag) {
        if (this.addEdit) {
          // 新增
          this.$store.dispatch({
            type: "addMatchInfos",
            data: this.add_match_form
          });
          this.$message({
            message: "新增匹配信息成功！",
            type: "success"
          });
        } else {
          // 编辑
          this.add_match_form.match_id = this.match_id;
          this.add_match_form.seat_id = this.seat_id;
          this.$store.dispatch({
            type: "editMatchInfos",
            data: this.add_match_form
          });
          this.$message({
            message: "编辑匹配信息成功！",
            type: "success"
          });
        }
        // 关闭窗口
        this.addMatchWindow = false;
      } else {
        // 未填写完整提示
        this.$message({
          message: "请填写完整再添加！",
          type: "warning"
        });
      }
    },
    // -------------------------------------------- 编辑匹配信息 --------------------------------------------
    clickEditMatch(row) {
      this.matchTitle = "编辑匹配信息";

      this.addEdit = false;
      this.selectFilm = `${row.film[0].film_name} - ${
        row.film[0].film_duration
      }`;
      this.selectCinema = `${row.cinema[0].cinema_name} - ${
        row.cinema[0].cinema_add.length > 7
          ? row.cinema[0].cinema_add.slice(0, 7) + "…"
          : row.cinema[0].cinema_add
      }`;
      this.selectRoom = `${row.room[0].room_name}`;
      this.add_match_form.select_film_id = [row.film[0]._id];
      this.add_match_form.select_cinema_id = [row.cinema[0]._id];
      this.add_match_form.select_room_id = [row.cinema[0].room[0]];
      this.add_match_form.startTime = row.start_time;
      this.add_match_form.endTime = row.end_time;
      this.add_match_form.playDate = row.date;
      this.add_match_form.price = row.price;
      this.match_id = row._id;
      this.seat_id = [row.seat[0]];
      this.add_match_form.seatArr = row.room[0].room_seat;

      this.roomTitle = row.cinema[0].cinema_name;

      this.addMatchWindow = true;
    },
    // --------------------------------------------- 删除匹配信息 ---------------------------------------------
    clickdelMatch(row) {
      this.$confirm(`你确认要删除该条匹配信息吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delMatchInfos",
            match_id: row._id,
            seat_id: row.seat[0]
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
    // ------------------------------------------------ 搜索匹配信息 ---------------------------------------------
    searchMatch() {
      if (this.selectMatch && this.queryMatchText) {
        this.searchFlag = true;
      } else {
        this.searchFlag = false;
      }
      this.searchMatchInfos(
        this.matchPage,
        10,
        this.selectMatch,
        this.queryMatchText
      );
    },
    // ------------------------------------------------- 刷新 ----------------------------------------------
    clickAllMatch() {
      this.searchFlag = false;
      this.getMatchInfo(1, 10);
    },
    /* ---------------------------------------------------- AJAX -------------------------------------------------- */
    // 获取匹配的数据
    getMatchInfo(page, rows, key, value) {
      this.$store.dispatch({
        type: "getMatchs",
        page,
        rows,
        key,
        value
      });
    },
    // 获取所有电影数据
    getFilmInfo(page, rows) {
      this.$store.dispatch({
        type: "getAllFilms",
        page,
        rows
      });
    },
    // 获取所有影院数据
    getCinemaInfo(page, rows) {
      this.$store.dispatch({
        type: "getAllCinemas",
        page,
        rows
      });
    },
    // 获取对应数据
    getRoomInfo(_id) {
      this.$store.dispatch({
        type: "getAllRooms",
        _id
      });
    },
    // 查询
    searchMatchInfos(page, rows, key, value) {
      this.$store.dispatch({
        type: "searchMatchInfos",
        page,
        rows,
        key,
        value
      });
    }
  },
  created() {
    this.getMatchInfo(1, 10);
  },

  /* ------------------------------------------------------ 获取数据 ------------------------------------------------------ */
  computed: {
    matchArr() {
      return this.$store.state.match.matchData;
    },
    match_maxPage() {
      return this.$store.state.match.match_maxPage;
    },
    filmArr() {
      return this.$store.state.match.filmData;
    },
    film_maxPage() {
      return this.$store.state.match.film_maxPage;
    },
    cinemaArr() {
      return this.$store.state.match.cinemaData;
    },
    cinema_maxPage() {
      return this.$store.state.match.cinema_maxPage;
    },
    roomArr() {
      console.log(this.$store.state.match.roomData, "这里");
      return this.$store.state.match.roomData;
    },
    room_maxPage() {
      return this.$store.state.match.room_maxPage;
    }
  }
};
</script>

<style>
.el-main {
  padding: 0 !important;
}
.match_container .el-select .el-input {
  width: 130px;
}
.match_container .input-with-select {
  width: 500px;
  margin: 0 10px;
}
.match_container .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.match_container .el-input--small .el-input__inner {
  width: 220px;
}
.match_container .el-dialog {
  margin-top: 220px !important;
}

.match_container .ticket .el-input--small .el-input__inner {
  padding: 19px 32px !important;
  font-size: 14px;
}
.match_container
  .ticket
  .el-input--small
  .el-input__inner::-webkit-input-placeholder {
  font-size: 14px;
}
.match_container .ticket {
  position: relative;
}
.match_container .icon-piaojia1 {
  position: absolute;
  z-index: 2;
  left: 11px;
  font-size: 13px;
  color: #dcdddf;
}
.match_container
  .addRoomWindow
  .el-table--scrollable-x
  .el-table__body-wrapper {
  overflow: auto;
}
.match_container .matchWindow .el-dialog__body {
  padding: 30px 20px 0px !important;
}
.match_container .matchWindow .el-button {
  padding: 12px 15px !important;
}
.matchWindow .dialog-footer .el-button {
  padding: 12px 24px !important;
}
</style>
