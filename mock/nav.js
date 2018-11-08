import {prefix} from 'utils';

export var navData = [
  {
    name: '首页',
    icon: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/a0eaa97347552a90e3b4fe284663f45f.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/a0eaa97347552a90e3b4fe284663f45f.png',
    url: prefix('/home'),
    auth: ['auth4']
  },
  {
    name: '项目',
    icon: 'http://7xkce0.com1.z0.glb.clouddn.com/proWhite.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    url: prefix('/project')
  },
  {
    name: '工作',
    icon: 'http://7xkce0.com1.z0.glb.clouddn.com/work5.png',
    iconSelected: 'http://7xkce0.com1.z0.glb.clouddn.com/work5.png',
    showChildren:false,
    children:[
      {
        name: '需求',
        icon: 'http://7xkce0.com1.z0.glb.clouddn.com/requirement.png',
        iconSelected: 'http://7xkce0.com1.z0.glb.clouddn.com/requirement.png',
        url: prefix('/requirement')
      },
      {
        name: '日报',
        icon: 'http://7xkce0.com1.z0.glb.clouddn.com/rep2.png',
        iconSelected: 'http://7xkce0.com1.z0.glb.clouddn.com/rep2.png',
        url: prefix('/workrecord')
      },
      {
        name: '计划',
        icon: 'http://7xkce0.com1.z0.glb.clouddn.com/plan2.png',
        iconSelected: 'http://7xkce0.com1.z0.glb.clouddn.com/plan2.png',
        url: prefix('/plan')
      },
      // {
      //   name: '导师',
      //   icon: 'http://7xkce0.com1.z0.glb.clouddn.com/daoshi.png',
      //   iconSelected: 'http://7xkce0.com1.z0.glb.clouddn.com/daoshi.png',
      //   url: prefix('/tutor')
      // }
    ]
  },
  {
    name: '组件',
    icon: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    url: prefix('/basiccomco')
  },
  {
    name: '团队',
    icon: 'http://7xkce0.com1.z0.glb.clouddn.com/team1.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    url: prefix('/company')
  },
  {
    name: '模型',
    icon: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    url: prefix('/model')
  },
  {
    name: '环境',
    icon: 'http://oxynujxpj.bkt.clouddn.com/envi.png',
    iconSelected: 'http://img0.t.rongyi.com/123456789012345678901234/20171213/2adc30a8ca5da8e2266d74c772b98c8b.png',
    url: prefix('/environment')
  }
];
