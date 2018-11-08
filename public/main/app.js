
if(ENV === 'local' || ENV === 'rd'){

    require('business/index.html');
}

import routerMap from './router';
import interponents from '../services/interponents.js';
import filters from '../filters/index.js';

import Components from '../components/index.js';
import BusinessComponents from '../../business/components/index.js';

import 'babel-polyfill';
import '../styles/index.css';

import stores from 'stores';

// 引入vuex store
import vuexMap from '../../business/vuex/vuex.js'


const VueCodeMirror = require('vue-codemirror-lite')

Vue.use(VueCodeMirror);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(Yii.default);
Vue.use(interponents);
Vue.use(filters);
Vue.use(Components);
Vue.use(BusinessComponents);


var router = new VueRouter({
  mode: 'history',
  routes: routerMap(Vue)
}); 

var store = new Vuex.Store(vuexMap(Vue));

var App = new Vue({
  router, 
  store,
  data() { 
    return {
      crumbs: []
    };
  },

});



// const Foo = { template: '<div>foo</div>' }
//         const Bar = { template: '<div>bar</div>' }
//         let routes = [
//             { name: 'foo',path:"foo", component: { template: '<div>我的啊哈kkk哈</div>' } },
//             { name: 'bar',path:"bar", component: { template: '<div>我的啊哈哈</div>' } }
//         ]
//         let router = new VueRouter({
//             mode: 'history',
//             routes:routes // （缩写）相当于 routes: routes
//         });


//         let app = new Vue({
//           router,
//           data() {
//             return {
//               crumbs: []
//             };
//           },
//           mounted(){
//             console.log("myRouter",this.$router);
//             this.$router.push({name:'foo'});
//           }
//         }).$mount('#app');

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el,obj) {
    // 聚焦元素
    
    if(obj.value){
      console.log("======",obj);
      let els = el.getElementsByTagName("input");
      let els2 = el.getElementsByTagName("textarea");
      let elsall = [...els,...els2];
      for(let e of elsall){
        e.focus();
      }
      el.focus();
    }
  },
  update: function (el,obj) {
    // 聚焦元素
    if(obj.value){
      let els = el.getElementsByTagName("input");
      let els2 = el.getElementsByTagName("textarea");
      let elsall = [...els,...els2];
      for(let e of elsall){
        e.focus();
      }
      el.focus();
    }
  }
})

router.beforeEach((to, from, next) => {
  // console.log("-----------------beforeEach------------------");
  next();
});

router.afterEach((to, from) => {
  // console.log("-----------------afterEach------------------");
  App.$data.crumbs = to.matched;

  stores.info.routerName = to.name || '';
  stores.info.routerMeta.title = getMetaTitle(to.meta && to.meta.title || '');
  stores.info.routerMeta.infoLink = to.meta && to.meta.infoLink;

  document.title = stores.info.routerMeta.title || '大前端统一开发平台';
  
  App 
    && App.$children 
    && App.$children[0] 
    && App.$children[0].$children 
    && App.$children[0].$children[1] 
    && App.$children[0].$children[1].scrollTo
    && App.$children[0].$children[1].scrollTo({x: 0, y: 0});
});

function getMetaTitle(title){
  
  if(title){
    
  }else if(!App.$data.crumbs || App.$data.crumbs.length < 1){
    title = "";

  }else{
    App.$data.crumbs.forEach(crumb => {
      if(crumb.meta.title){
        title = crumb.meta.title;
      }
    });
  }

  return title;
}


App.$mount('#app');