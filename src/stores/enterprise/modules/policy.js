import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'
import { updateSession } from '@/modules/authentication'

const baseURL = '/api/v2/companyMessage'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  actions: {
    async load({ dispatch, rootState }, id) {
      const result = await request.get(`${baseURL}/${id}`)

      await dispatch('account/loadData', {}, { root: true })
      updateSession({ user: rootState.account.model })

      return result
    }
  }
})
