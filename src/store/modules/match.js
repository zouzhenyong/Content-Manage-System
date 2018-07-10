// IP
const IP = "http://192.168.43.101:3223";

// 引入ajax
import axios from "axios";

import Vue from 'vue'

// 创建store
export default {
    state: {
        matchData: [],
        match_maxPage: 0,
        filmData: [],
        film_maxPage:0,
        cinemaData: [],
        cinema_maxPage:0,
        roomData: []
    },
    mutations: {
        // 获取数据、页码
        getMatch(state, obj) {
            state.matchData = obj.data;
            state.match_maxPage = obj.maxPage;
        },
        // 获取所有电影
        getAllFilm(state, obj) {
            state.filmData = obj.data;
            state.film_maxPage = obj.maxPage;
        },
        // 获取所有影院
        getAllCinema(state, obj) {
            state.cinemaData = obj.data;
            state.cinema_maxPage = obj.maxPage;
        },
        // 获取对应影厅
        getAllRoom(state, obj) {
            state.roomData = obj.data;
        }
    },
    actions: {
        // 获取已匹配的数据
        getMatchs(context, obj) {
            let dataObj = {
                page: obj.page,
                rows: obj.rows
            }
            // dataObj[obj.key] = obj.value;
            axios.post(IP + '/match/getMatch', dataObj).then(function (param) {
                context.commit({
                    type: 'getMatch',
                    data: param.data.rows,
                    maxPage: param.data.maxpage
                })
            })
        },
        // 展示所有电影
        getAllFilms(context, obj) {
            let dataObj = {
                page: obj.page,
                rows: obj.rows
            }
            axios.post(IP + '/match/getAllFilm', dataObj).then(function (param) {
                context.commit({
                    type: 'getAllFilm',
                    data: param.data.rows,
                    maxPage: param.data.maxpage
                })
            })
        },
        // 展示所有影院
        getAllCinemas(context, obj) {
            let dataObj = {
                page: obj.page,
                rows: obj.rows
            }
            axios.post(IP + '/match/getAllCinema', dataObj).then(function (param) {
                context.commit({
                    type: 'getAllCinema',
                    data: param.data.rows,
                    maxPage: param.data.maxpage
                })
            })
        },
        // 展示对应影厅
        getAllRooms(context, obj) {
            axios.post(IP + '/match/getAllRoom', {_id:obj._id}).then(function (param) {
                context.commit({
                    type: 'getAllRoom',
                    data: param.data.room
                })
            })
        },
        // 添加匹配信息
        addMatchInfos(context, obj) {
            axios.post(IP + '/match/addMatchInfo', obj.data).then(function (param) {
                context.dispatch({
                    type: 'getMatchs',
                    page: context.state.page,
                    rows: 10
                })
            })
        },
        // 编辑匹配信息
        editMatchInfos(context, obj) {
            axios.post(IP + '/match/editMatchInfo', obj.data).then(function (param) {
                context.dispatch({
                    type: 'getMatchs',
                    page: context.state.page,
                    rows: 10
                })
            })
        },
        // 删除匹配信息
        delMatchInfos(context, obj) {
            axios.post(IP + '/match/delMatchInfo', { match_id: obj.match_id,seat_id: obj.seat_id }).then(function (param) {
                context.dispatch({
                    type: 'getMatchs',
                    page: context.state.page,
                    rows: 10
                })
            })
        },
        // 查询匹配信息
        searchMatchInfos(context, obj) {
            let dataObj = {
                page: obj.page,
                rows: obj.rows,
                key: obj.key,
                value:obj.value
            }
            axios.post(IP + '/match/searchMatchInfo', dataObj).then(function (param) {
                context.commit({
                    type: 'getMatch',
                    data: param.data.rows,
                    maxPage: param.data.maxpage
                })
            })
        }

        // // 新增用户数据
        // addMatchs(context, obj) {
        //     axios.post(IP + '/users/addMatch', { form: obj.form }).then(function (param) {
        //         context.dispatch({
        //             type: 'getUsers',
        //             page: context.state.page,
        //             rows: 10
        //         })
        //     })
        // },
        // // 编辑用户数据
        // editMatchs(context, obj) {
        //     axios.post(IP + '/users/editMatch', { form: obj.form }).then(function (param) {
        //         context.dispatch({
        //             type: 'getUsers',
        //             page: context.state.page,
        //             rows: 10
        //         })
        //     })
        // },
        // // 删除用户数据
        // delMatchs(context, obj) {
        //     axios.post(IP + '/users/delMatch', { _id: obj._id }).then(function (param) {
        //         context.dispatch({
        //             type: 'getUsers',
        //             page: obj.page,
        //             rows: 10
        //         })
        //     })
        // },
    }
}
