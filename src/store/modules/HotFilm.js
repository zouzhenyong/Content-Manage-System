const IP = 'http://192.168.43.101:3223';

import axios from 'axios'
export default {
    state: {
        hotallFilmData: [],
        hotFilmData: [],
        hotallfilmmaxpage: 1,
        hotallfilmcurpage: 1,
        hotfilmcurpage: 1,
        hotfilmmaxpage: 1,
    },
    mutations: {
        refreshAllFilm(state, obj) {
            state.hotallFilmData = obj.val.rows;
            state.hotallfilmmaxpage = obj.val.maxpage;
            state.hotallfilmcurpage = obj.val.curpage;
        },
        refreshHotlFilm(state, obj) {
            state.hotFilmData = obj.val.rows;
            state.hotfilmmaxpage = obj.val.maxpage;
            state.hotfilmcurpage = obj.val.curpage;
        },
    },
    actions: {
        //获取所有电影信息
        hotgetFilmData(context, obj) {
            axios.post(IP + '/hotFilm/getFilmData', {}).then((res) => {
                let newFilm = [];
                let newAllFilm = {};

                axios.post(IP + '/hotFilm/getAllHotData', {}).then((response) => {
                      console.log(response.data)
                    if (response.data.length) {
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j = 0; j < res.data.length; j++) {
                                if (response.data[i].film[0] == res.data[j]._id) {
                                    res.data.splice(j, 1)
                                }
                            }
                        }
                        newFilm = res.data;
                    }
                    else {
                        newFilm = res.data;
                    }
                    let startIndex = (obj.curpage - 1) * obj.rows;
                    let endIndex = Number(obj.curpage) * Number(obj.rows);
                    newAllFilm.maxpage = Math.ceil(newFilm.length / obj.rows);
                    newAllFilm.rows = newFilm.slice(startIndex, endIndex);
                    newAllFilm.curpage = Number(obj.curpage);

                    context.commit({
                        type: 'refreshAllFilm',
                        val:newAllFilm
                    })
                 })

            })
        },

        // 添加新增数据
        addHotFilmData(context, obj) {
            axios.post(IP + '/hotFilm/addHotFilmData', { film: [obj.val] }).then((res) => {
                context.dispatch({
                    type: 'getHotFilmData'
                })
            })
        },
        // 渲染热映电影
        getHotFilmData(context, obj) {
            let hotnewObj = {};
            hotnewObj.page = obj.hotfilmcurpage;
            hotnewObj.rows = 10;

            if (obj.hotfilmSelect && obj.hotfilmsearchText) {
                axios.post(IP + '/hotFilm/getHotFilmData', {}).then((res) => {
                    let searchHotFilm = [];
                    for (let item of res.data) {
                        switch (obj.hotfilmSelect) {
                            case 'film_name':
                                if (item.film[0].film_name.search(obj.hotfilmsearchText) >= 0) {
                                    searchHotFilm.push(item)
                                }
                                break;
                            case 'film_type':
                                if (item.film[0].film_type.search(obj.hotfilmsearchText) >= 0) {
                                    searchHotFilm.push(item)
                                }
                                break;
                            case 'film_area':
                                if (item.film[0].film_area.search(obj.hotfilmsearchText) >= 0) {
                                    searchHotFilm.push(item)
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    let newsearchHotFilm = {};
                    newsearchHotFilm.rows = [];
                    let startIndex = (hotnewObj.page - 1) * hotnewObj.rows - 0;
                    let endIndex = Number(hotnewObj.page) * Number(hotnewObj.rows);
                    newsearchHotFilm.maxpage = Math.ceil(searchHotFilm.length / hotnewObj.rows);
                    newsearchHotFilm.rows = searchHotFilm.slice(startIndex, endIndex);
                    newsearchHotFilm.curpage = Number(hotnewObj.page);
                    context.commit({
                        type: 'refreshHotlFilm',
                        val: newsearchHotFilm,
                    })
                })
            }
            else {
                axios.post(IP + '/hotFilm/getHotFilmData', hotnewObj).then((res) => {
                    context.commit({
                        type: 'refreshHotlFilm',
                        val: res.data
                    })
                })
            }
        },
        //删除热映电影
        delhotFlimData(context, obj) {
            axios.post(IP + '/hotFilm/delHotFilmData', { _id: obj._id }).then((response) => {
                context.dispatch({
                    type: 'getHotFilmData'
                })
            })
        },
    }
}


