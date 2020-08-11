<template>
  <div class="page three-menu-layout">
    <page-card
      :class="isProductionStandardization ? 'page-main' : 'page-main-layout page-main'"
      :scrollable="false"
    >
      <div style class="three-menu-layout-main">
        <el-aside>
          <ul class="menus">
            <router-link
              tag="li"
              :to="{ path: $resolveRoutePath('risk-assessment/risk-assessments') }"
              :class="tagClass"
            >三级菜单_2_1</router-link>
            <router-link
              tag="li"
              :to="{ path: $resolveRoutePath('risk-assessment/real-time-risk-assessment') }"
              :class="tag2Class"
            >三级菜单_2_2</router-link>
          </ul>
        </el-aside>
      </div>
      <router-view class="three-menu-layout-page" />
    </page-card>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import PageCard from "@/components/PageCard";

export default {
  name: "riskLassificationControlLayout",

  components: {
    Breadcrumb,
    PageCard
  },

  props: {
    isProductionStandardization: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: false,
      activeName: ""
    };
  },

  computed: {
    tagClass() {
      return this.$route.path.match(/onTime/)
        ? ["router-link-exact-active router-link-active"]
        : [];
    },
    tag2Class() {
      return this.$route.path.match(/realTime/)
        ? ["router-link-exact-active router-link-active"]
        : [];
    }
  },
  mounted() {},
  methods: {},

  async created() {}
};
</script>
