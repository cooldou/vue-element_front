export default {
  name: 'risk-control', // 二级模块的名字必须与相关文件下模块名字一致
  title: '一级菜单',  // 一级菜单名字
  menus: [
    {
      moduleName: 'risk-dashboard',   // 二级模块的名字必须与相关文件下模块名字一致
      title: '二级菜单_1' // 二级菜单名字
    },
    {
      moduleName: 'risk-assessment',
      title: '二级菜单_2'
    }
  ]
}
