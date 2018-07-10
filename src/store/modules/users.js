// IP
const IP = "http://192.168.43.101:3223";

// 引入ajax
import axios from "axios";

import Vue from 'vue'

// 创建store
export default {
    state: {
        userData: [],
        user_maxPage: 0
    },
    mutations: {
        // 获取数据、页码
        getUser(state, obj) {
            state.userData = obj.data;
            state.user_maxPage = obj.maxPage;
        }
    },
    actions: {
        // 获取用户数据
        getUsers(context, obj) {
            let dataObj = {
                page: obj.page,
                rows: obj.rows
            }
            dataObj[obj.key] = obj.value;
            console.log(obj.key, obj.value)
            axios.post(IP + '/users/getUser', dataObj).then(function (param) {
                context.commit({
                    type: 'getUser',
                    data: param.data.rows,
                    maxPage: param.data.maxpage
                })
            })
        },
        // 新增用户数据
        addUsers(context, obj) {
            console.log(obj.form)
            axios.post(IP + '/users/addUsers', { form: obj.form }).then(function (param) {
                context.dispatch({
                    type: 'getUsers',
                    page: context.state.page,
                    rows: 10
                })
            })
        },
        // 编辑用户数据
        editUsers(context, obj) {
            axios.post(IP + '/users/editUsers', { form: obj.form }).then(function (param) {
                context.dispatch({
                    type: 'getUsers',
                    page: context.state.page,
                    rows: 10
                })
            })
        },
        // 删除用户数据
        delUsers(context, obj) {
            axios.post(IP + '/users/delUsers', { _id: obj._id }).then(function (param) {
                context.dispatch({
                    type: 'getUsers',
                    page: obj.page,
                    rows: 10
                })
            })
        },
    }
}
