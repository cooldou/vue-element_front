// 风险辨识评估(二级风险项)相关接口
import merge from "lodash/merge";
import request from "@/modules/request";
import listBase from "@/stores/list";

const listBaseURL = "/api/v4/twoSubProject/list";
const list = listBase();

const baseURL = "/api/v4/twoSubProject";

export default merge(list, {
  namespaced: true,

  state: {
    risk: null
  },

  mutations: {
    setRiskData(state, data) {
      state.risk = data;
    },

    updateItemStatus(state, { id, status }) {
      const item = state.list.items.find(item => item.id === id);
      if (item) item.status = status;
    }
  },

  actions: {
    async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
      commit("listLoading");
      console.log(state.list.params);
      if (reset) commit("setListFilterParams", {});
      const result = await request.get(
        `${listBaseURL}/${state.list.params.riskId}`,
        {
          params: Object.assign(
            {
              current: page,
              size: state.list.pageSize
            },
            state.list.params,
            state.list.filterParams
          )
        }
      );
      console.log(result.twoSubProjects.total)
      commit("listLoaded");
      commit("setRiskData", result.coRiskAssessment);
      commit("setListData", {
        total: result.twoSubProjects.total,
        currentPage: page,
        items: result.twoSubProjects.records
      });
    },
    // 增加二级风险项
    async create({ dispatch,state }, formData) {
      try {
        await request.post(
          `${baseURL}/add/${state.list.params.riskId}`,
          formData
        );
        await dispatch("loadListData", { reset: true });
      } catch (err) {
        console.log(err)
      }
    },
    // 查看二级风险项
    async load({}, id) {
      return await request.get(`${baseURL}/get/${id}`);
    },
    // 修改二级风险项
    async update({ dispatch }, { id, formData }) {
      try {
        await request.put(`${baseURL}/modify/${id}`, formData);
        await dispatch("loadListData", { reset: true });
      } catch (err) {}
    },

    async updateStatus({ commit }, { id, status }) {
      await request.put(`${baseURL}/updateTwoSubproject/${id}`, { status });
      commit("updateItemStatus", { id, status });
    },
    // 删除二级风险项
    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/delete/${id}`);
        await dispatch("loadListData", { reset: true });
      } catch (err) {}
    }
  }
});
