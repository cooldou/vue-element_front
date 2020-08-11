// 风险辨识评估(一级风险区域) 相关接口
import merge from "lodash/merge";
import request from "@/modules/request";
import listBase from "@/stores/list";

function transformItems(subjects) {
  const result = [];

  subjects.forEach(subject => {
    subject.threeSubprojects.forEach(item => {
      result.push(Object.assign({}, subject, item));
    });
  });

  return result;
}

const baseURL = "/api/v4/coRiskAssessment";

// 区域风险相关接口
const list = listBase({
  url: `${baseURL}/list`
});
export default merge(list, {
  namespaced: true,

  state: {
    riskLevelList: {
      loading: false,
      total: 0,
      pageSize: 20,
      currentPage: 1,
      params: {},
      filterParams: {},
      items: []
    },
    flattenedSCLItems: []
  },

  mutations: {
    updateItemStatus(state, { id, status }) {
      const item = state.list.items.find(item => item.id === id);
      if (item) item.status = status;
    },

    setRiskLevelListParams(state, params = {}) {
      state.riskLevelList.params = Object.assign(
        {},
        state.riskLevelList.params,
        params
      );
    },

    setRiskLevelListFilterParams(state, params = {}) {
      state.riskLevelList.filterParams = cloneDeep(params);
    },

    setRiskLevelListPageSize(state, pageSize) {
      state.riskLevelList.pageSize = pageSize;
    },

    riskLevelListLoading(state) {
      state.riskLevelList.loading = true;
    },

    riskLevelListLoaded(state) {
      state.riskLevelList.loading = false;
    },

    setRiskLevelListData(state, { total, currentPage, items }) {
      state.riskLevelList = Object.assign({}, state.riskLevelList, {
        total,
        currentPage,
        items
      });
    },

    setRiskDangerItems(state, items) {
      // state.sclItems = items
      state.flattenedSCLItems = transformItems(items);
    }
  },

  actions: {
    // 增加一级风险点
    async create({ dispatch }, formData) {
      try {
        await request.post(`${baseURL}/add`, formData);
        await dispatch("loadListData", {
          reset: true
        });
      } catch (err) {}
    },
    // 查看你一级风险点
    async load({ commit }, id) {
      return await request.get(`${baseURL}/get/${id}`);
    },
    // 修改一级风险点
    async update({ dispatch }, { id, formData }) {
      try {
        await request.put(`${baseURL}/modify/${id}`, formData);
        await dispatch("loadListData", {
          reset: true
        });
      } catch (err) {}
    },
    // 删除一级风险点
    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/delete/${id}`);
        await dispatch("loadListData", {
          reset: true
        });
      } catch (err) {}
    },

    async updateStatus({ commit }, { id, status }) {
      await request.put(`${baseURL}/updateCoRiskAssessmentStatus/${id}`, {
        status
      });
      commit("updateItemStatus", {
        id,
        status
      });
    },

    async loadRiskLevelList({ state, commit }, { page = 1 } = {}) {
      commit("riskLevelListLoading");
      let result = {};
      if (state.riskLevelList.params.type === "risk") {
        result = await request.get(`${baseURL}/threeSubprojectList`, {
          params: Object.assign(
            {
              current: page,
              size: state.riskLevelList.pageSize
            },
            state.riskLevelList.params,
            state.riskLevelList.filterParams
          )
        });
      } else {
        result = await request.get(`${baseURL}/hiddenDangerList`, {
          params: Object.assign(
            {
              current: page,
              size: state.riskLevelList.pageSize,
              hiddenDangerLevel: state.riskLevelList.params.riskLevel
            },
            state.riskLevelList.params,
            state.riskLevelList.filterParams
          )
        });
      }

      commit("riskLevelListLoaded");
      commit("setRiskLevelListData", {
        total: result.total,
        currentPage: page,
        items: result.records
      });
    },

    async loadHiddenDetail({}, id) {
      return await request(`${baseURL}/getHiddenDangerManagement/${id}`);
    },

    async loadRiskDanger({ commit }, id) {
      const result = await request.get(`${baseURL}/getSCLRisk`, {
        params: {
          riskAssessmentId: id
        }
      });

      commit("setRiskDangerItems", result);
    },

    async loadRiskDetail({}, id) {
      return await request.get(`${baseURL}/getRiskDetail`, {
        params: {
          riskAssessmentId: id
        }
      });
    },

    // 清空管控数据
    async clearControl() {
      await request.delete(`${baseURL}/emptyBooks`);
    },
    //一键清除
    async oneclear({}, type) {
      await request.delete(`/api/v2/generalAPI/deleteAll`, {
        params: {
          type
        }
      });
    },
    //导出二维码 excel
    async exportQRExcel({}) {
      return await request.get(`baseURL/${QRExcel}`);
    },

    export() {}

    // async loadThirdItemCases({}, id) {
    //   return await request.get(`/api/v2/coRiskAssessment/caseList/${id}`)
    // },

    // async removeControls({}, enterpriseId) {
    //   return await request.delete(`/api/v2/coRiskAssessment/removeControlData/${enterpriseId}`)
    // }
  }
});
