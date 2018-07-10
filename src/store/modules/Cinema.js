import axios from "axios";
export  default {

  state:{
    IP:'http://192.168.43.101:3223',
    data:[],
    nowpage:1,
    rows:10,
    total:0
  },
  //同步函数
  mutations:{
   setdata(state,obj){
     state.data=obj.data
     state.total=obj.total

   }
  },
  getters:{

  },
  actions:{
    //初始化数据
    getdata(state,obj){
      axios.post(this.state.cinema.IP + '/cinema/getdata', {
        page:state.state.nowpage,
        rows:state.state.rows,
       [obj.name]:obj.value
      }).then((item) => {
        state.commit({
          type:"setdata",
          data:item.data.rows,
          total:item.data.total
        })
      })
    },
    //添加数据
    upadd(state,obj) {
      let room = []

      if(obj.data.room_seat.length) {
        for (let n = 0; n < obj.data.room_seat.length; n++) {
          axios.post(this.state.cinema.IP + '/cinema/upseat', {data: obj.data.room_seat[n]}).then((item) => {
            room.push(item.data)

            if (room.length == obj.data.room_seat.length) {
              obj.data.room=room
              axios.post(this.state.cinema.IP + '/cinema/uphome', {data: obj.data}).then((item) => {
                state.dispatch({
                  type:"getdata",
                })

              })
            }
          })


        }
      }else {
        obj.data.room=room
        axios.post(this.state.cinema.IP + '/cinema/uphome', {data: obj.data}).then((item) => {
          state.dispatch({
            type:"getdata",
          })

        })
      }



      },
    //删除影院
    delcinema(state,obj){
      axios.post(this.state.cinema.IP + '/cinema/delcinema', {item:obj.item}).then((item) => {
        state.dispatch({
          type: "getdata",
        })
      })
    },
    //修改影院
    changedata(state,obj){
      axios.post(this.state.cinema.IP + '/cinema/changemore', {item:obj.data}).then((item) => {

        obj.data.room=item.data
        axios.post(this.state.cinema.IP + '/cinema/updata', {item:obj.data}).then((item) => {
          console.log(item.data)
          state.dispatch({
            type: "getdata",
          })
        })
      })

    }











  }






}
