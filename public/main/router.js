
// import Vue from 'Vue';

import { prefix } from 'utils';

import routers from 'business/router';

export default function(Vue){


  var routerMap = [
    {
      path: prefix(),
      name: `${MODULE_NAME}`,
      meta: {title: '首页'},
      redirect: { name: 'home' },
      component: resolve => require(['business'], resolve),
      children: [
        {
          path: "login",
          name: "login",
          component: resolve => require(['business/login/login.vue'], resolve)
        },
        {
          path: "register",
          name: "register",
          component: resolve => require(['business/register/register.vue'], resolve)
        },
        ...routers(Vue)
      ]
    },
    {
      path: '*', 
      meta: {title: 'casion'},
      redirect: { name: 'home' },
      component: Vue.extend({
        template: '<router-view transition="fade" transition-mode="out-in"></router-view>'
      }) 
    }
  ];

  return routerMap;
}
