const IP = 'http://192.168.43.101:3223';

import axios from 'axios'
export default {

    state: {
        comingallFilmData: [],
        comingFilmData: [],
        comingallfilmmaxpage: 1,
        comingallfilmcurpage: 1,
        comingfilmmaxpage: 1,
        comingfilmcurpage: 1,
    },
    mutations: {
        refreshAllFilm(state, obj) {
            state.comingallFilmData = obj.val.rows;
            state.comingallfilmmaxpage = obj.val.maxpage;
            state.comingallfilmcurpage = obj.val.curpage;
        },
        refreshCominglFilm(state, obj) {
            state.comingFilmData = obj.val.rows;
            state.comingfilmmaxpage = obj.val.maxpage;
            state.comingfilmcurpage = obj.val.curpage;
        },
    },
    actions: {
        //获取所有电影信息
        getFilmData(context, obj) {
            axios.post(IP + '/comingFilm/getFilmData', {}).then((res) => {

                let newcomingFilm = [];
                let newAllFilm = {};

                axios.post(IP + '/comingFilm/getAllComingData', {}).then((response) => {
                    console.log(response.data)
                    if (response.data.length) {
                        for (let i = 0; i < response.data.length; i++) {

                            for (let j = 0; j < res.data.length; j++) {
                                if (response.data[i].film[0]== res.data[j]._id) {
                                    res.data.splice(j, 1)
                                }
                            }
                        }
                        newcomingFilm = res.data;
                    }
                    else {
                        newcomingFilm = res.data;
                    }
                    let startIndex = (obj.curpage - 1) * obj.rows;
                    let endIndex = Number(obj.curpage) * Number(obj.rows);
                    newAllFilm.maxpage = Math.ceil(newcomingFilm.length / obj.rows);
                    newAllFilm.rows = newcomingFilm.slice(startIndex, endIndex);
                    newAllFilm.curpage = Number(obj.curpage);

                    context.commit({
                        type: 'refreshAllFilm',
                        val: newAllFilm
                    })
                })

            })
        },

        // 添加新增数据
        addComingFilmData(context, obj) {
            axios.post(IP + '/comingFilm/addComingFilmData', { film: [obj.val] }).then((res) => {
                context.dispatch({
                    type: 'getComingFilmData'
                })
            })
        },
        // 渲染热映电影
        getComingFilmData(context, obj) {
            let comingnewObj = {};
            comingnewObj.page = obj.comingFilmcurpage;
            comingnewObj.rows = 10;
            if (obj.comingFilmSelected && obj.comingFilmSelectedText) {
                axios.post(IP + '/comingFilm/getComingFilmData', {}).then((res) => {
                    let searchComingFilm = [];
                    for (let item of res.data) {
                        switch (obj.comingFilmSelected) {
                            case 'film_name':
                                if (item.film[0].film_name.search(obj.comingFilmSelectedText) >= 0) {
                                    searchComingFilm.push(item)
                                }
                                break;
                            case 'film_type':
                                if (item.film[0].film_type.search(obj.comingFilmSelectedText) >= 0) {
                                    searchComingFilm.push(item)
                                }
                                break;
                            case 'film_area':
                                if (item.film[0].film_area.search(obj.comingFilmSelectedText) >= 0) {
                                    searchComingFilm.push(item)
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    let newsearchComingFilm = {};
                    let startIndex = (Number(comingnewObj.page) - 1) * Number(comingnewObj.rows);
                    let endIndex = Number(comingnewObj.page) * Number(comingnewObj.rows);
                    newsearchComingFilm.maxpage = Math.ceil(searchComingFilm.length / comingnewObj.rows);
                    newsearchComingFilm.rows = searchComingFilm.splice(startIndex, endIndex);
                    context.commit({
                        type: 'refreshCominglFilm',
                        val: newsearchComingFilm
                    })
                })
            }
            else {
                axios.post(IP + '/comingFilm/getComingFilmData', comingnewObj).then((res) => {
                    context.commit({
                        type: 'refreshCominglFilm',
                        val: res.data
                    })
                })
            }
        },
        //删除热映电影
        delcomingFlimData(context, obj) {
            axios.post(IP + '/comingFilm/delComingFilmData', { _id: obj._id }).then((response) => {
                context.dispatch({
                    type: 'getComingFilmData'
                })
            })
        },

    }
}


