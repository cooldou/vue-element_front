// 风险辨识评估(三级风险点)相关接口
import merge from "lodash/merge";
import request from "@/modules/request";
import listBase from "@/stores/list";
// 风险三级共用接口
// const listBaseURL = '/api/v2/twoSubproject/threeSubprojectInfo'
const list = listBase();

const baseURL = "/api/v4/threeSubproject";

export default merge(list, {
  namespaced: true,

  actions: {
    async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
      commit("listLoading");

      if (reset) commit("setListFilterParams", {});

      // let listURL
      // if (window.__APP_EDITION__ === 'ENTERPRISE') {
      // console.log('企业端来了')
      //   listURL = '/api/v2/coRiskAssessment/threeSubprojectInfo'
      // } else  {
      //   listURL = `${listBaseURL}/${state.list.params.twoSubprojectId}`
      // }

      const result = await request.get(
        `${baseURL}/list/${state.list.params.twoSubprojectId}`,
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

      commit("listLoaded");
      commit("setListData", {
        total: result.total,
        currentPage: page,
        items: result.records
      });
    },
    // 增加三级风险点
    async create({ state, dispatch }, formData) {
      try {
        if (window.__APP_EDITION__ === "ENTERPRISE") {
          formData.isSystem = "N";
        }

        const result = await request.post(
          `${baseURL}/add//${state.list.params.twoSubprojectId}`,
          formData
        );
        await dispatch("loadListData", { reset: true });
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    // 查看三级风险点
    async load({}, id) {
      // let url
      // if (window.__APP_EDITION__ === 'ENTERPRISE') {
      //   url = `/api/v2/coRiskAssessment/threeSubprojectInfo/${id}`
      // } else {
      //   url = `${baseURL}/${id}`
      // }

      return await request.get(`${baseURL}/get/${id}`);
    },
    // 修改三级风险点
    async update({ dispatch }, { id, formData }) {
      try {
        const result = await request.put(`${baseURL}/modify/${id}`, formData);
        await dispatch("loadListData", { reset: true });
        return result;
      } catch (err) {}
    },
    // 删除三级风险点
    async delete({ dispatch }, id) {
      try {
        await request.delete(`${baseURL}/delete/${id}`);
        await dispatch("loadListData", { reset: true });
      } catch (err) {}
    },

    async updateCase({ dispatch }, { id, formData }) {
      await request.put(`${baseURL}/updateThreeSubproject/${id}`, formData);
      await dispatch("loadListData", { reset: true });
    }
  }
});
