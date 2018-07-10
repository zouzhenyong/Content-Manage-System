const IP = 'http://192.168.43.101:3223';

import axios from 'axios'
export default {

    state: {
        filmData: [],
        curpage: 1,
        maxpage: 1
    },
    mutations: {
        refreshFilm(state, obj) {
            state.filmData = obj.val.rows;
            state.maxpage = obj.val.maxpage;
            state.curpage = obj.val.curpage;
        },
    },
    actions: {
        //获取电影信息
        getFilmData(context, obj) {
            let newObj = {};
            newObj.page = obj.curpage;
            newObj.rows = 10;
            newObj[obj.select] = obj.searchText;
            console.log(newObj)
            axios.post(IP + '/film/getFilmData', newObj).then((res) => {
                console.log(res.data)
                context.commit({
                    type: 'refreshFilm',
                    val: res.data
                })
            })
        },
        //添加电影信息
        addFilmData(context, obj) {
            obj.addText.page = obj.curpage;
            obj.addText.rows = 10;
            axios.post(IP + '/film/addFilmData', obj.addText).then((response) => {
                context.dispatch({
                    type: 'getFilmData',
                    page: context.state.curpage,
                    rows: 10
                })
            })
        },
        //删除电影信息
        delFlimData(context, obj) {
            axios.post(IP + '/film/delFilmData', { _id: obj._id}).then((response) => {
                context.dispatch({
                    type: 'getFilmData',
                    page:context.state.curpage,
                    rows:10
                })
            })
        },
        //编辑电影信息
        editFilmData(context, obj) {
            axios.post(IP + '/film/editFilmData', obj.val).then((response) => {
                context.dispatch({
                    type: 'getFilmData',
                    page:context.state.curpage,
                    rows:10
                })
            })
        },
         //搜索员工信息
        //  searchFilmData(context, obj) {
        //     obj.val.page = obj.searchcurpage;
        //      obj.val.rows = 10;
        //     axios.post(IP + '/film/searchFilm', obj.val).then((response) => {
        //         context.commit({
        //             type: 'refreshSearchFilm',
        //             val: response.data
        //         })
        //     })
        // }
    }
}
