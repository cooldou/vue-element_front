import { omit, cloneDeep } from "lodash";

export default ["risk-control"].map(primaryNav => {
  // 通过引入相对应得文件自动生成菜单
  const config = require(`./${primaryNav}`).default;
  const route = {
    path: config.name,
    name: config.name,
    component: {
      render(c) {
        return c("router-view");
      }
    },
    meta: {
      primaryNav: true,
      title: config.title,
      icon: require(`@/assets/icons/nav/${config.name}.png`)
    }
  };
  // 对应的二级菜单
  if (config.menus) {
    const children = config.menus.map(menu => {
      const options = Object.assign({}, omit(menu, "moduleName"), {
        primaryNavPath: config.name,
        icon: require(`@/assets/icons/nav/secondary/${menu.moduleName}.png`)
      });
      const childRoute = cloneDeep(
        require(`../modules/${config.name}/${menu.moduleName}`).default
      );
      mergeRouteMeta(childRoute, options);
      return childRoute;
    });

    Object.assign(route, {
      redirect: `/${config.name}/${children[0].path}`,
      children
    });
  }
  return route;
});

function mergeRouteMeta(route, meta) {
  route.meta = Object.assign({}, route.meta || {}, meta);
  if (route.children && route.children.length > 0)
    route.children.forEach(child => mergeRouteMeta(child, meta));
}
