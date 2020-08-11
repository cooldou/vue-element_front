import Vue from "vue";
import Router from "vue-router";
import { getSession } from "@/modules/authentication";
import storage from "@/modules/storage";
import multiLevelNavRoutes from "./routes";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/signin",
      name: "signin",
      component: require("@/pages/enterprise/Signin").default
    },
    {
      path: "/",
      name: "index",
      redirect: "/dashboard",
      component: require("@/pages/enterprise/Layout").default,
      meta: { authRequired: true },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          meta: {
            primaryNav: true,
            title: "首页",
            icon: require("@/assets/icons/nav/dashboard.png")
          },
          component: require("@/pages/enterprise/enterprise-dashboard/Dashboard")
            .default
        },
        ...multiLevelNavRoutes,

        // 没有依附于导航的其它路由
        {
          path: "account",
          name: "account",
          component: require("@/pages/enterprise/Account").default
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 登录拦截

  // if (to.matched.some(m => m.meta.authRequired)) {
  //   const session = getSession()
  //   if (session && session.token) {
  //     next()
  //   } else {
  //     next({
  //       name: 'signin',
  //       query: {
  //         redirectTo: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()
  // }

  next();
});

export default router;
