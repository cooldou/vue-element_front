const buildIcon = (menu) => {
  const iconName = menu.icon
  menu.icon = require(`@/assets/icons/nav-menu/${iconName}.png`)
  menu.iconHighlight = require(`@/assets/icons/nav-menu/${iconName}-highlight.png`)
  return menu
}

const enterpriseMenuItems = [
  {
    name: '首页', // 一级菜单路由
    icon: 'e-home', // 一级菜单icon图标对应的命名
    route: { path: '/dashboard' } //一级菜单路由
  },
].map(buildIcon)

export default {
  enterpriseMenuItems
}
