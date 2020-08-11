import request from '@/modules/request'

const baseUrl = '/api/v2/flpsystem'

export default {
    namespaced: true,
    state: {
      menuList: []
    },

    mutations: {
      setMenuList (state, data) {
        state.menuList = data
      }
    },

    actions: {
      //消防制度列表
      async loadMenu ({ commit }) {
        const result = await request.get(`${baseUrl}`)
        commit('setMenuList', result)
      },
      //新增消防制度
      async create ({ dispatch }, formData) {
        let result = await request.post(`${baseUrl}`, formData)
        dispatch('loadMenu')
        return result
      },
      //消防制度
      async load ({}, id) {
        return await request.get(`${baseUrl}/${id}`)
      },
      //消防制度修改
      async update ({ dispatch }, {id, formData}) {
        let result = await request.put(`${baseUrl}/${id}`, formData)
        dispatch('loadMenu')
        return result
      },
       //删除消防制度
      async delete ({ dispatch }, id) {
        await request.delete(`${baseUrl}/${id}`)
        dispatch('loadMenu')
      }
    }
  }
