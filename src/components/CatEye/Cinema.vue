<template>
  <div class="cinema_container">
        <div id="header" style="background: #f5f5f5;">
        <el-button @click="add" type="primary">新增</el-button>
         <el-button type="success" size="100px" @click="retrun">刷新</el-button>
          <el-input style="width: 800px;margin-left: 20px" placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select style="width: 130px "  v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="院线"  value="cinema_name"></el-option>
              <el-option label="地址" value="cinema_add"></el-option>
              <el-option label="电话" value="cinema_phone"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="reder"></el-button>
          </el-input>
            
        </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      border stripe
      height="572px" >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        label="院线名"
        width="250"
        prop="cinema_name">
      </el-table-column>
      <el-table-column
        label="地址"
        width="250"
        prop="cinema_add">
      </el-table-column>
      <el-table-column
        label="电话"
        width="250"
        prop="cinema_phone">
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="250"
        prop="cinema_emall">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :pager-count="11" :total="maxpage"
          @prev-click="changerows" @next-click="changerows" @current-change="changerows"
          style="text-align:center;position:absolute;bottom:5px;left:50%">
          </el-pagination>


    <!--添加面板-->
    <el-dialog :show-close='false' @closed=" closeaddmain"  disabled center style="margin-top:-8.5vh" title="添加影院" :visible.sync=" dialogAdd ">
      <el-form  style="display: flex;height: 450px;">
        <!--//左-->
        <div class="cinema_mession">
            <el-input style="margin-bottom: 20px" v-model="addcenimaname" placeholder="请输入影院名"></el-input>
            <el-input  style="margin-bottom: 20px" v-model="addcenimagps"  placeholder="请输入地址"></el-input>
            <el-input  style="margin-bottom: 20px"  v-model="addcenimaphone"  placeholder="请输入电话"></el-input>
            <el-input style="margin-bottom: 20px" v-model="addcenimaemall"  placeholder="请输入邮箱"></el-input>
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center">
            <span style="margin-left: 13px;color:#c0c4cc ">标签</span>
             <div>
                <el-dropdown trigger="click">
                  <el-button  size="mini" type="primary" icon="el-icon-plus" >自定义</el-button>
                  <el-dropdown-menu slot="dropdown">
                    <div style="width: 400px;padding:5px;line-height:48px">
                      <el-button style="margin-left:10px" @click="addTag" type="primary" tagtype="logo_room" plain>4DX厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>杜比全景厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>4K厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>IMAX厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>60帧厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>中国巨幕厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>DTS：X厅</el-button>
                      <el-button @click="addTag" type="primary"  tagtype="logo_room" plain>RealD厅</el-button>

                      <el-button @click="addTag" type="warning"  tagtype="logo_change" plain>退</el-button>
                      <el-button @click="addTag" type="warning"  tagtype="logo_change" plain>改签</el-button>

                      <el-button @click="addTag"  type='success'  tagtype="logo_eat" plain>小吃</el-button>

                      <el-button @click="addTag" type="danger"  tagtype="logo_card" plain>折扣卡</el-button>

                      <el-button @click="addTag" type="danger"  tagtype="logo_vip" plain>vip卡</el-button>
                    </div>
                  </el-dropdown-menu>
                </el-dropdown>
             </div>
          </div>
          <div style="height: 100%;line-height:38px;padding:5px;box-sizing:border-box;width: 100%;border: 1px solid #dcdfe6;border-radius: 5px;margin-top: 18px">
            <el-tag v-for="(tag,index) in  logo_seat" :key="tag" disabled  @close="Closetag(tag,index,'logo_seat')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in  logo_room" :key="tag" closable  @close="Closetag(tag,index,'logo_room')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   logo_change" :key="tag" closable type='warning'  @close="Closetag(tag,index,'logo_change')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   logo_eat" :key="tag" closable type='success'  @close="Closetag(tag,index,'logo_eat')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   logo_card" :key="tag" closable type="danger"   @close="Closetag(tag,index,'logo_card')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   logo_vip" :key="tag" closable type="danger"   @close="Closetag(tag,index,'logo_vip')" >{{tag}}</el-tag>
          </div>
       </div>
        <!--//右-->
        <div id="right" style=" width: 50%; display: flex; flex-direction: column;align-items: center;max-height: 100%;overflow-y: auto">
        <div v-for="(item,index) in data" :key="index" style="position: relative;margin-top: 10px">
          <el-button @click="changedata(index)"  type="info" plain style="width: 300px;height: 70px;font-size: 20px;margin-bottom: 20px;text-overflow: ellipsis;overflow: hidden;">{{ item.room_name }}</el-button>
          <i @click="deldata(index)" class="close">×</i>
        </div>
          <el-button type="success" @click="addroom" icon="el-icon-plus" style="margin-bottom: 30px;flex-shrink:0">添加影厅</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right: 10px;width: 100px" type="primary" @click="upadd">确 定</el-button>
        <el-button style="margin-left: 10px;width: 100px" @click="dialogAdd=false">取 消</el-button>
      </div>
    </el-dialog>
    <!--添加影厅面板-->
    <el-dialog  id="addflimroom" :visible.sync="addflimroom"  :show-close=false style="height: 100% ;" @closed=" closeadd"  fullscreen>
      <div style="display: flex;align-items: center;padding:5px 0;border-bottom: 1px dashed #409eff;height: 80px;justify-content: space-between">
        <div>
            <el-input  prefix-icon="el-icon-edit"  placeholder="请输入影厅名称" style="width: 300px;" v-model="flimroomname"></el-input>
            <span style="margin-left: 20px">横列：<el-input-number v-model="tr" :step="1" ></el-input-number></span>
           <span style="margin-left: 20px">数列：<el-input-number v-model="td" :step="1"></el-input-number></span>
        </div>
        <span >
          <el-button id="mainact" type="primary" @click="actaddflimroom">确 定</el-button>
          <el-button id="mainsole" @click="addflimroom = false">取 消</el-button>
         </span>
      </div>
      <div style="display: flex;flex-direction: column;align-items: center">
        <img src="../../../static/cinema/screen_bg.png" style="width: 450px;" alt="">
        <div class="table" id="table" >
          <tr  v-for="(item,index) in tr" :key="index" style="white-space:nowrap;" >
             <td v-for="(item,index) in td" :key="index" tpe='1' class="red" @click="change">
             </td>
          </tr>
        </div>
      </div>

    </el-dialog>
    <!--修改添加影厅面板-->
    <el-dialog  id="changeflimroom" :visible.sync="changeflimroom"  :show-close=false @closed=" closeaddchange"    fullscreen>
      <div style="display: flex;align-items: center;border-bottom: 1px dashed #409eff;height: 80px;justify-content: space-between">
        <div>
          <el-input id="changeaddinput"  prefix-icon="el-icon-edit"    style="width: 300px;" v-model=" newdata.room_name"></el-input>
          <span style="margin-left: 20px">横列：<el-input-number v-model="newdata.tr" :disabled="true" :step="1" ></el-input-number></span>
          <span style="margin-left: 20px">数列：<el-input-number v-model="newdata.td" :disabled="true" :step="1"></el-input-number></span>
        </div>
        <span >
          <el-button  type="primary" @click="actchangeflimroom">确 定</el-button>
          <el-button  @click="closeaddchange">取 消</el-button>
         </span>
      </div>
      <div style="margin-top: 20px;display: flex;flex-direction: column;align-items: center">
        <img src="../../../static/cinema/screen_bg.png" style="width: 450px;" alt="">
        <div class="table" id="changetable"  >
          <tr  v-for="(item,index) in newdata.room_seat" :key="index" style="white-space:nowrap;" >
            <td v-for="(item,index) in newdata.room_seat[index]" :key="index"  :tpe=" item=='1'?'1':'0'" :class="item=='1'?'red':'none'" @click="change">
            </td>
          </tr>
        </div>
      </div>

    </el-dialog>


    <!--修改面板-->
    <el-dialog :show-close='false'   disabled center style="margin-top:-11vh" title="修改影院" :visible.sync=" dialogchange ">
      <el-form  style="display: flex;height: 500px;">
        <!--//左-->
        <div class="cinema_mession">
          <el-input style="margin-bottom: 20px" v-model="changecenimaname" placeholder="请输入影院名"></el-input>
          <el-input  style="margin-bottom: 20px" v-model=" changecenimagps"  placeholder="请输入地址"></el-input>
          <el-input  style="margin-bottom: 20px"  v-model=" changecenimaphone"  placeholder="请输入电话"></el-input>
          <el-input style="margin-bottom: 20px" v-model="changecenimaemall"  placeholder="请输入邮箱"></el-input>
          <div style="width:100%;display: flex;justify-content: space-between;align-items: center">
            <span style="margin-left: 13px;color:#c0c4cc ">标签</span>
            <div>
              <el-dropdown trigger="click">
                <el-button   size="mini" type="primary" icon="el-icon-plus" >自定义</el-button>
                <el-dropdown-menu slot="dropdown">
                  <div style="width: 400px;padding:10px;line-height:48px">
                    <el-button style="margin-left:10px" @click="addTag1" type="primary" tagtype="change_room" plain>4DX厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>杜比全景厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>4K厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>IMAX厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>60帧厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>中国巨幕厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>DTS：X厅</el-button>
                    <el-button @click="addTag1" type="primary"  tagtype="change_room" plain>RealD厅</el-button>

                    <el-button @click="addTag1" type="warning"  tagtype="change_change" plain>退</el-button>
                    <el-button @click="addTag1" type="warning"  tagtype="change_change" plain>改签</el-button>

                    <el-button @click="addTag1"  type='success'  tagtype="change_eat" plain>小吃</el-button>

                    <el-button @click="addTag1" type="danger"  tagtype="change_card" plain>折扣卡</el-button>

                    <el-button @click="addTag1" type="danger"  tagtype="change_vip" plain>vip卡</el-button>
                  </div>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div style="height: 100%;line-height:38px;padding:5px;box-sizing:border-box;width: 100%;border: 1px solid #dcdfe6;border-radius: 5px;margin-top: 18px">
            <el-tag v-for="(tag,index) in  change_seat" :key="tag" disabled  @close="Closetag1(tag,index,'change_seat')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in  change_room" :key="tag" closable  @close="Closetag1(tag,index,'change_room')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   change_change" :key="tag" closable type='warning'  @close="Closetag1(tag,index,'change_change')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in  change_eat" :key="tag" closable type='success'  @close="Closetag1(tag,index,'change_eat')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in  change_card" :key="tag" closable type="danger"   @close="Closetag1(tag,index,'change_card')" >{{tag}}</el-tag>
            <el-tag v-for="(tag,index) in   change_vip" :key="tag" closable type="danger"   @close="Closetag1(tag,index,'change_vip')" >{{tag}}</el-tag>
          </div>
        </div>
        <!--//右-->
        <div  style=" width: 50%; display: flex; flex-direction: column;align-items: center;max-height: 100%;overflow-y: scroll">
          <div v-for="(item,index) in newchangedata" :key="index" style="position: relative;margin-top: 10px">
            <el-button @click="changethisdata(index)"  type="info" plain style="width: 300px;height: 70px;font-size: 20px;margin-bottom: 20px;text-overflow: ellipsis;overflow: hidden;">{{ item.room_name }}</el-button>
            <i @click="delchangedata(index)" class="close">×</i>
          </div>
          <el-button type="info" @click="addchangeroom" icon="el-icon-plus" style="margin-bottom: 30px;flex-shrink:0">添加影厅</el-button>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button style="margin-right: 10px;width: 100px" type="primary" @click="upchange">确 定</el-button>
        <el-button style="margin-left: 10px;width: 100px" @click="dialogchange=false">取 消</el-button>
      </div>
    </el-dialog>
    <!--修改影厅面板-->
    <el-dialog  id="changeroom" :visible.sync=" changeroom"  :show-close=false style="height: 100% ;" @closed=" changeadd"  fullscreen>
      <div style="display: flex;align-items: center;border-bottom: 1px dashed #409eff;height: 80px;justify-content: space-between">
        <div>
          <el-input  prefix-icon="el-icon-edit"  placeholder="请输入影厅名称" style="width: 300px;" v-model="new_name"></el-input>
          <span style="margin-left: 20px">横列：<el-input-number v-model="tr" :step="1" ></el-input-number></span>
          <span style="margin-left: 20px">数列：<el-input-number v-model="td" :step="1"></el-input-number></span>
        </div>
        <span >
          <el-button  type="primary" @click=" changeaddflimroom">确 定</el-button>
          <el-button  @click="changeroom = false">取 消</el-button>
         </span>
      </div>
      <div style="margin-top: 20px;display: flex;flex-direction: column;align-items: center">
        <img src="../../../static/cinema/screen_bg.png" style="width: 450px;" alt="">
        <div class="table" id="roomtable" >
          <tr  v-for="(item,index) in tr" :key="index" style="white-space:nowrap;" >
            <td v-for="(item,index) in td" :key="index" tpe='1' class="red" @click="change">
            </td>
          </tr>
        </div>
      </div>

    </el-dialog>
    <!--修改影厅面板-->
    <el-dialog  id="changethisroom" :visible.sync="changethisroom"  :show-close=false @closed="closethischange"    fullscreen>
      <div style="display: flex;align-items: center;border-bottom: 1px dashed #409eff;height: 80px;justify-content: space-between">
        <div>
          <el-input id="changethisinput"  prefix-icon="el-icon-edit"    style="width: 300px;" v-model=" thisdata.room_name"></el-input>
          <span style="margin-left: 20px">横列：<el-input-number v-model="thisdata.tr" :disabled="true" :step="1" ></el-input-number></span>
          <span style="margin-left: 20px">数列：<el-input-number v-model="thisdata.td" :disabled="true" :step="1"></el-input-number></span>
        </div>
        <span >
          <el-button  type="primary" @click="actchangethisroom">确 定</el-button>
          <el-button  @click="changethisroom=false">取 消</el-button>
         </span>
      </div>
      <div style="margin-top: 20px;display: flex;flex-direction: column;align-items: center">
        <img src="../../../static/cinema/screen_bg.png" style="width: 450px;" alt="">
        <div class="table" id="changethistable"  >
          <tr  v-for="(item,index) in [...thisdata.room_seat]" :key="index" style="white-space:nowrap;" >
            <td v-for="(item,index) in [...thisdata.room_seat][index]" :key="index"  :tpe=" item=='1'?'1':'0'" :class="item=='1'?'red':'none'" @click="change">
            </td>
          </tr>
        </div>

      </div>

    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      IP: "http://192.168.0.121:3223",
      //默认打开
      index: "index",
      //数据
      data: [],
      newdata: {},
      //搜索类型和值
      input5: "",
      select: "",
      tr: 7,
      td: 20,
      //添加的影厅名
      flimroomname: "",
      //添加修改数据
      addchangedata: {},
      //修改数据的下标
      changeaddindex: 0,
      //添加影院的数据=========================================================
      //添加弹出框是否打开
      dialogAdd: false,
      //添加影厅框是否打开
      addflimroom: false,
      //添加修改影厅框是否打开
      changeflimroom: false,
      addcenimaname: "",
      addcenimagps: "",
      addcenimaphone: "",
      addcenimaemall: "",
      logo_seat: ["座"],
      logo_room: [],
      logo_change: [],
      logo_eat: [],
      logo_card: [],
      logo_vip: [],
      //修改影院的数据========================================================================
      //添加弹出框是否打开
      dialogchange: false,
      //添加影厅框是否打开
      changeroom: false,
      //添加修改影厅框是否打开
      changethisroom: false,
      thisid: "",
      changecenimaname: "",
      changecenimagps: "",
      changecenimaphone: "",
      changecenimaemall: "",
      change_seat: ["座"],
      change_room: [],
      change_change: [],
      change_eat: [],
      change_card: [],
      change_vip: [],
      //修改数据
      newchangedata: [],
      //添加
      new_name: "",
      //当前选中的影院
      thisdata: {},
      //当前下标
      thisindex: 0,
      test: 0,
      //搜索框输入的内容
      input5: "",
      //选择的项
      select: "cinema_name"
    };
  },
  methods: {
    //初始化列表数据
    reder() {
      this.$store.dispatch({
        type: "getdata",
        name: this.select,
        value: this.input5
      });
    },
    //点击添加按钮
    add() {
      this.dialogAdd = true;
      console.log(this.dialogAdd);
    },
    //添加标签
    addTag() {
      let type = event.target.getAttribute("tagtype");
      let value = event.target.innerText;
      if (type == null) {
        type = event.target.parentElement.getAttribute("tagtype");
      }
      switch (type) {
        case "logo_room":
          if (this.logo_room.indexOf(value) == -1) {
            this.logo_room.push(value);
          }
          return;
        case "logo_change":
          if (this.logo_change.indexOf(value) == -1) {
            this.logo_change.push(value);
          }
          return;
        case "logo_eat":
          if (this.logo_eat.indexOf(value) == -1) {
            this.logo_eat.push(value);
          }
          return;
        case "logo_card":
          if (this.logo_card.indexOf(value) == -1) {
            this.logo_card.push(value);
          }
          return;
        case "logo_vip":
          if (this.logo_vip.indexOf(value) == -1) {
            this.logo_vip.push(value);
          }
          return;
      }
    },
    addroom() {
      this.addflimroom = true;
    },
    //座位点击
    change() {
      let element = event.target;
      if (element.getAttribute("tpe") == "1") {
        element.setAttribute("tpe", "0");
        element.setAttribute("class", "none");
      } else {
        element.setAttribute("tpe", "1");
        element.setAttribute("class", "red");
      }
    },
    //新增面板关闭
    closeadd() {
      this.tr = 7;
      this.td = 20;
      this.flimroomname = "";
      for (let item of document.getElementById("table").children) {
        for (let index of item.children) {
          index.setAttribute("tpe", "1");
          index.setAttribute("class", "red");
        }
      }
    },
    closeaddchange() {
      this.newdata = [...this.newdata];
      this.changeflimroom = false;
    },
    //确认添加影厅
    actaddflimroom() {
      let regs = [];
      for (let item of document.getElementById("table").children) {
        let rows = [];
        for (let index of item.children) {
          rows.push(index.getAttribute("tpe"));
        }
        regs.push(rows);
      }
      this.data.push({
        room_name: this.flimroomname,
        room_seat: regs,
        tr: this.tr,
        td: this.td
      });
      this.addflimroom = false;
    },
    //添加修改数据
    changedata(index) {
      this.data[index].room_seat = [...this.data[index].room_seat];
      this.newdata = this.data[index];
      this.changeaddindex = index;
      this.changeflimroom = true;
    },
    //删除添加数据
    deldata(index) {
      this.$confirm("是否删除此影厅?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.data.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //确认修改
    actchangeflimroom() {
      let regs = [];
      for (let item of document.getElementById("changetable").children) {
        let rows = [];
        for (let index of item.children) {
          rows.push(index.getAttribute("tpe"));
        }
        regs.push(rows);
      }
      this.data[this.changeaddindex].room_name = document.getElementById(
        "changeaddinput"
      ).value;
      this.data[this.changeaddindex].room_seat = regs;

      this.changeflimroom = false;
    },
    //上传影院数据
    upadd() {
      let data = {
        cinema_name: this.addcenimaname,
        cinema_add: this.addcenimagps,
        cinema_phone: this.addcenimaphone,
        cinema_emall: this.addcenimaemall,
        room_seat: this.data,
        logo_seat: this.logo_seat,
        logo_room: this.logo_room,
        logo_change: this.logo_change,
        logo_eat: this.logo_eat,
        logo_card: this.logo_card,
        logo_vip: this.logo_vip
      };
      this.$store.dispatch({
        type: "upadd",
        data
      });

      this.dialogAdd = false;
    },
    //删除标签
    Closetag(item, index, type) {
      switch (type) {
        case "logo_room":
          this.logo_room.splice(index, 1);
          return;
        case "logo_change":
          this.logo_change.splice(index, 1);
          return;
        case "logo_eat":
          this.logo_eat.splice(index, 1);
          return;
        case "logo_card":
          this.logo_card.splice(index, 1);
          return;
        case "logo_vip":
          this.logo_vip.splice(index, 1);
          return;
      }
    },
    //关闭添加面板
    closeaddmain() {
      this.addcenimaname = "";
      this.addcenimagps = "";
      this.addcenimaphone = "";
      this.addcenimaemall = "";
      this.data = [];
      (this.logo_seat = ["座"]),
        (this.logo_room = []),
        (this.logo_change = []),
        (this.logo_eat = []),
        (this.logo_card = []),
        (this.logo_vip = []);
    },
    //翻页
    changerows(item) {
      this.$store.state.cinema.nowpage = item;
      this.reder();
    },
    //编辑
    handleEdit(index, item) {
      this.dialogchange = true;
      this.thisid = item._id;
      this.changecenimaname = item.cinema_name;
      this.changecenimagps = item.cinema_add;
      this.changecenimaphone = item.cinema_phone;
      this.changecenimaemall = item.cinema_emall;
      this.change_seat = JSON.parse(JSON.stringify(item.logo_seat));
      this.change_room = JSON.parse(JSON.stringify(item.logo_room));
      this.change_change = JSON.parse(JSON.stringify(item.logo_change));
      this.change_eat = JSON.parse(JSON.stringify(item.logo_eat));
      this.change_card = JSON.parse(JSON.stringify(item.logo_card));
      this.change_vip = JSON.parse(JSON.stringify(item.logo_vip));

      axios.post(this.IP + "/cinema/test", { data: item.room }).then(item => {
        this.newchangedata = item.data;
        console.log(item.data);
      });
    },
    //删除
    handleDelete(index, item) {
      this.$confirm("确认删除此影院？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch({
            type: "delcinema",
            item,
            index
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //修改=====================================================
    //添加标签
    addTag1() {
      let type = event.target.getAttribute("tagtype");
      let value = event.target.innerText;
      if (type == null) {
        type = event.target.parentElement.getAttribute("tagtype");
      }
      switch (type) {
        case "change_room":
          if (this.change_room.indexOf(value) == -1) {
            this.change_room.push(value);
          }
          return;
        case "change_change":
          if (this.change_change.indexOf(value) == -1) {
            this.change_change.push(value);
          }
          return;
        case "change_eat":
          if (this.change_eat.indexOf(value) == -1) {
            this.change_eat.push(value);
          }
          return;
        case "change_card":
          if (this.change_card.indexOf(value) == -1) {
            this.change_card.push(value);
          }
          return;
        case "change_vip":
          if (this.change_vip.indexOf(value) == -1) {
            this.change_vip.push(value);
          }
          return;
      }
    },
    //删除标签
    Closetag1(item, index, type) {
      console.log(type);
      console.log(typeof type);
      if (type == "change_room") {
      }
      console.log(type == "change_room");
      switch (type) {
        case "change_room":
          this.change_room.splice(index, 1);
          return;
        case "change_change":
          this.change_change.splice(index, 1);
          return;
        case "change_eat":
          this.change_eat.splice(index, 1);
          return;
        case "change_card":
          this.change_card.splice(index, 1);
          return;
        case "change_vip":
          this.change_vip.splice(index, 1);
          return;
      }
    },
    //添加影院
    addchangeroom() {
      this.changeroom = true;
    },
    //点击确认
    changeaddflimroom() {
      let regs = [];
      for (let item of document.getElementById("roomtable").children) {
        let rows = [];
        for (let index of item.children) {
          rows.push(index.getAttribute("tpe"));
        }
        regs.push(rows);
      }
      this.newchangedata.push({
        room_name: this.new_name,
        room_seat: regs,
        tr: this.tr,
        td: this.td
      });
      this.changeroom = false;
    },
    //新增面板关闭
    changeadd() {
      this.tr = 7;
      this.td = 20;
      this.new_name = "";
      for (let item of document.getElementById("roomtable").children) {
        for (let index of item.children) {
          index.setAttribute("tpe", "1");
          index.setAttribute("class", "red");
        }
      }
    },
    //删除添加数据
    delchangedata(index) {
      this.$confirm("是否删除此影厅?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.newchangedata.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {});
    },
    //点击当前修改按钮
    changethisdata(index) {
      this.newchangedata = JSON.parse(JSON.stringify([...this.newchangedata]));
      this.thisdata = JSON.parse(JSON.stringify([...this.newchangedata]))[
        index
      ];
      this.thisindex = index;

      let newarry = [];
      for (let item of this.thisdata.room_seat) {
        let rows = [];
        for (let index of item) {
          rows.push(index);
        }
        newarry.push(rows);
      }
      this.thisdata.room_seat = newarry;

      console.log(this.thisdata);
      this.changethisroom = true;
    },
    //确认修改
    actchangethisroom() {
      let regs = [];
      for (let item of document.getElementById("changethistable").children) {
        let rows = [];
        for (let index of item.children) {
          rows.push(index.getAttribute("tpe"));
        }
        regs.push(rows);
      }
      this.newchangedata[this.thisindex].room_name = document.getElementById(
        "changethisinput"
      ).value;
      this.newchangedata[this.thisindex].room_seat = regs;

      this.changethisroom = false;
    },
    //取消修改
    closethischange() {
      this.thisdata = {};
      this.changethisroom = false;
    },
    //提交修改数据
    upchange() {
      let data = {
        _id: this.thisid,
        cinema_name: this.changecenimaname,
        cinema_add: this.changecenimagps,
        cinema_phone: this.changecenimaphone,
        cinema_emall: this.changecenimaemall,
        room_seat: this.newchangedata,
        logo_seat: this.change_seat,
        logo_room: this.change_room,
        logo_change: this.change_change,
        logo_eat: this.change_eat,
        logo_card: this.change_card,
        logo_vip: this.change_vip
      };
      this.$store.dispatch({
        type: "changedata",
        data
      });

      this.dialogchange = false;
    },
    find() {
      this.$store.dispatch({
        type: "getdata",
        name: this.select,
        value: this.input5
      });
    },
    retrun() {
      this.select = "cinema_name";
      this.input5 = "";
      this.$store.dispatch({
        type: "getdata",
        name: this.select,
        value: this.input5
      });
    }
  },
  computed: {
    tableData() {
      return this.$store.state.cinema.data;
    },

    //每页显示条数
    rows() {
      return this.$store.state.cinema.rows;
    },
    //总条数
    maxpage() {
      return this.$store.state.cinema.total;
    }
  },
  created() {
    this.reder();
  }
};
</script>

<style>
#header {
  padding: 5px;
}
.cinema_container .input-with-select {
  margin-left: 0px !important;
}
.cinema_container #header .el-button + .el-button {
  margin-left: 0px !important;
}
.el-main {
  padding: 0 !important;
}
.cinema_mession {
  width: 50%;
  box-sizing: border-box;
  border-right: 1px solid #dcdfe6;
  padding-right: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
#addflimroom .el-dialog__header {
  padding: 0;
}
#addflimroom .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
#changeflimroom .el-dialog__header {
  padding: 0;
}
#changeflimroom .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
#changethisroom .el-dialog__header {
  padding: 0;
}
#changethisroom .el-dialog__body {
  padding: 0;
}
.red {
  display: inline-block;
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  background-size: 35px 35px;
  background-image: url("../../../static/cinema/seat_02.png");
}
.none {
  display: inline-block;
  width: 35px;
  height: 35px;
}
.table {
  display: inline-block;
  overflow-x: auto;
  max-width: 100%;
  height: auto;
  margin-top: 130px;
}
.table td {
  margin: 5px 4px 0px 4px;
}
.close {
  cursor: pointer;
  font-size: 20px;
  color: white;
  background-color: #f56c6c;
  right: -10px;
  top: -10px;
  display: flex;
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  border: 1px solid #f56c6c;
  align-items: center;
  justify-content: center;
}

#changeroom .el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
#changeroom .el-dialog__header {
  padding-top: 0;
  padding-bottom: 0;
}
.cinema_container .input-with-select {
  width: 500px !important;
  margin: 0 10px;
}
.cinema_container .el-tag {
  margin: 0 3px;
}
</style>
