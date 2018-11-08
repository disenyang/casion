<template>
  <div class="p-index-wrapper">

    <div class="p-index-main" v-if="stores.info.routerName != 'login' && stores.info.routerName != 'register'">
      <!-- 头部 -->
      <div class="p-index-head clear">
        <div class="p-index-head-icon">
          <a href="/">
          <img src="http://img0.t.rongyi.com/123456789012345678901234/20171107/544f81a55789369a23a7b46d100ad0f8.png" alt="" class="p-head-img">
          </a>
        </div>
        <div class="p-index-head-menu">
          <div class="item com"  @click="goCom">
            组件库
          </div>
        </div>
        <div class="p-index-head-center  p-head-center--auto">
          <div class="nickname">{{head_title}}</div>
        </div>
        <div class="p-index-head-right">
          <!-- <yii-button class="p-head-right-item" type="text" color="gray">预留菜单</yii-button> -->
          <!-- <yii-button class="p-head-right-item" type="text" color="gray">帮助中心</yii-button> -->
          <div class="add-btn" @mouseenter="addMenusShow=true" @mouseleave="addMenusShow=false">
            <div class="menu" v-show="addMenusShow">
              <div class="item project" @click="createProject()">项目</div>
              <div class="item team" @click="logout()">团队</div>
              <div class="item activity" @click="logout()">活动</div>
            </div>
          </div>
          <div class="user-menus" @mouseenter="userMenusShow=true" @mouseleave="userMenusShow=false">
            <img class="headimg" @click="gotoHome" :src="userinfo.headimg?userinfo.headimg:defaultHeadimg">
            <i class="dropdown-icon"></i>
            <div class="menu" v-show="userMenusShow">
              <div class="item home" @click="gotoPersonal">我的主页</div>
              <div class="item exit" @click="logout()">退出</div>
            </div>
          </div>
          <span class="p-head-right-item"></span>
        </div>
      </div>

      <div class="p-index-main-body">
        <div class="p-index-main-nav" v-if="stores.info.routerName !== 'personal-home'">
          <yi-nav :navs="navData" 
          v-on:navClick="navClickHandler" 
          v-on:heightChange="navHeightChangeHandler"></yi-nav>
        </div>
        <!-- 首页独享 -->
        <div class="p-index-main-center" v-if="stores.info.routerName === 'home'">
          <div class="p-index-content">
            <router-view></router-view>
          </div>
        </div>

        <!-- 其他页面 -->
        <div class="p-index-main-center p-index-main-center--bg" v-if="stores.info.routerName !== 'home'">
         <!--  <div class="p-content--header" v-if="stores.info.routerName !== 'page-edit'">
            <div class="p-main-crumb" v-show="_crumbs && _crumbs.length > 0">
              <yii-crumb separator=">">
                <yii-crumb-item 
                  v-for="(item, index) in _crumbs" 
                  :key="index" 
                  :to="_crumbs.length - index > 1 ? item.path : ''">{{item.meta.title}}</yii-crumb-item>
              </yii-crumb>
            </div>
            <div class="p-panel-line"></div>
          </div> -->

          
            <div class="p-index-container">
              <router-view></router-view>
            </div>
          
          
        </div>
      </div>

    </div> 
    <!-- 登录独享 -->
    <div class="p-index-login" v-if="stores.info.routerName === 'login' || stores.info.routerName === 'register'">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { navData} from 'mock/nav';
  import stores from 'stores';

  export default{
    data(){
      return {
        navData,
        stores,
        userMenusShow:false,
        addMenusShow:false,
        defaultHeadimg:"http://oxwmr019d.bkt.clouddn.com/default.jpg",
        userinfo:{
        }
      }
    },
    props: {
      crumbs: {
        type: Array,
        default: _ => []
      }
    },
    computed: {
      _crumbs(){
        let cs = this.crumbs.filter(crumb => !!(crumb.meta && crumb.meta.title));
        console.log("_crumbs",this.crumbs);

        this.$store.commit("setHead_title",cs[cs.length-1].meta.title); 
        return cs;
      },
      head_title(){
        return this.$store.state.head_title;
      }
    },
    components: {
    },
    watch: {
      
    },
    beforeRouteEnter (to, from, next) {
      let userinfo = window.localStorage.getItem("userinfo");
      console.log("userinfo",userinfo);
      if(userinfo!=="undefined" && userinfo){
        //路由访问vm
        userinfo = JSON.parse(userinfo); 
        if(userinfo.id){
          Vue.http.post(`/casionj/user/get`,{id:userinfo.id}).then((response) => {
            
            let userinfo = response.data.result;
            window.localStorage.setItem("userinfo",JSON.stringify(userinfo));
            next(vm => {
                //处理逻辑
            })
          });
        }else{
          next(vm => {
              //处理逻辑
          })
        }
        
      }else{
        next(vm => {
              //处理逻辑
        })
      }
      
    },
    created(){

      if(stores.info.routerName!="login" && stores.info.routerName!="register"){
        let userinfo = window.localStorage.getItem("userinfo");

        if(!userinfo || userinfo==="undefined"){
          window.top.location = `/${MODULE_NAME}/login`;
        }else{
          window.userinfo = JSON.parse(userinfo);         
          this.userinfo = window.userinfo;
          this.$store.commit("setHead_title",this.userinfo.nickname);
          this.$store.commit("setUserinfo",window.userinfo);
        }
      }
    },
    mounted() {
      // $("#app").css("width",$(window).width()+"px");
      this.$nextTick(function() {
         
      })
    },

    methods: {
      navClickHandler(link){

        this.$router.push(link);
        
        this.$nextTick(()=>{
          this.$refs.content && this.$refs.content.$emit("viewResize");
        });

      },
      navHeightChangeHandler(){

      },
      getBsTop(){
        return this.$http.post("/easy-roa/v1/user/getBsTop", {
          ryst: this.getCookie('RYST') || '123456',
          bsst: this.getCookie('BSST') || '123456',
          channel: "002"
        })
      },
      getBsUser(){
        return this.$http.post("/easy-roa/v1/user/getBsUser", {
          bsst: this.getCookie('BSST') || '123456',
          channel: "002"
        })
      },
      getCookie(name){
        let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
      },
      getUserInfoPromise(){
        return new Promise((resolve, reject) => {

          let _response1 = '';
          this.getBsTop().then((response1) => {

            _response1 = response1;
            return this.getBsUser();
          }).then((response2) => {

            resolve([_response1, response2]);
          }).catch((response)=>{

            reject(response);
          });
        });
      },
      logout(){
          this.userMenusShow=false;
          window.localStorage.removeItem("userinfo");
          this.$router.push({ name: 'login' });
      },
      goCom(){
        this.$router.push({ name: 'basiccomco' });
      },
      gotoPersonal(){
        this.$router.push({ name: 'personal-home',params:{userid:userinfo.id} });
      },
      gotoHome(){
        this.$router.push({ name: 'home',params:{userid:userinfo.id} });
      },
      toInfoLink(){
        window.location.href = this.stores.info.routerMeta.infoLink;
      }

    }
  }
</script>

<style>
@import '../public/styles/var.css';
.p-index-wrapper{
  width: 100%;
    height: 100%;
  .p-index-main{
    width: 100%;
    height: 100%;
    .p-index-head{
      display: flex;
      position: fixed;
      width: 100%;
      height: 60px;
      background-color: #fff;
      z-index: 10;
      align-items: center;
      border-bottom: 1px solid #eee;
      .p-index-head-center{
        flex: 1;
        line-height: 60px;
        font-size: 18px;
        color: #333;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .p-index-head-right{
        display: flex;
        align-items: center;
        .add-btn{
          margin-right: 40px;
          background-color: #fff;
          cursor: pointer;
          position: relative;
          width: 58px;
          height: 58px;
          &:before{
            content:"";
            border-radius:2px; 
            position:absolute;
            left: 19px;
            top: 27px;
            width: 20px;
            height: 4px;
            background-color: #666;
          }
          &:after{
            content:"";
            position:absolute;
            left: 27px;
            top: 19px;
            width: 4px;
            border-radius:2px; 
            height: 20px;
            background-color: #666;
            
          }
          .menu{
            position: absolute;
            right: 0px;
            top: 58px;
            width: 130px;
            background-color: #fff;
            border: 1px solid #eee;
            z-index: 10;
            color: #666;
            .item{
              line-height: 30px;
              cursor: pointer; 
              padding-left: 40px;
            }
            .project{
              background-image: url("./images/pro.png");
              background-size: 20px 20px;
              background-position: 10px center;
              background-repeat: no-repeat;
            }
            .activity{
              margin-top: 5px;
              background-image: url("./images/activity.png");
              background-size: 20px 20px;
              background-position: 10px center;
              background-repeat: no-repeat;
            }
            .team{
              margin-top: 5px;
              background-image: url("./images/team.png");
              background-size: 20px 20px;
              background-position: 10px center;
              background-repeat: no-repeat;
            }
          }
        }
        .user-menus{
          position: relative;
          width: 70px;
          height: 60px;
          cursor: pointer;
          color: #666;
          .headimg{
            margin-top: 9px;
            width: 40px;
            height: 40px;
            border-radius: 25px;
          }
          .dropdown-icon{
            position: absolute;
            right: 5px;
            top: 20px;
            width: 10px;
            height: 10px;
            &:before{
                display: block;
                content: "";
                width: 100%;
                height: 100%;
                border-top: 2px solid #333;
                border-left: 2px solid #333;
                transform: rotate(225deg);
            }
          }
          .menu{
            position: absolute;
            right: 0px;
            top: 60px;
            width: 150px;
            background-color: #fff;
            border: 1px solid #eee;
            z-index: 10;
            color: #666;
            .item{
              line-height: 30px;
              cursor: pointer; 
              padding-left: 40px;
            }
            .home{
              background-image: url("./images/home.png");
              background-size: 20px 20px;
              background-position: 10px center;
              background-repeat: no-repeat;
            }
            .exit{
              margin-top: 5px;
              background-image: url("./images/exit.png");
              background-size: 20px 20px;
              background-position: 10px center;
              background-repeat: no-repeat;
            }
          }
        }
      }

      .p-index-head-menu{
        display: flex;
        .item{
            margin-left: 20px;
            cursor: pointer;
            line-height: 58px;
            padding-left: 40px;
        }
        .com{
            background-image: url("./images/com.png");
            background-size: 20px 20px;
            background-position: 10px center;
            background-repeat: no-repeat;
        }
      }
    }
    .p-index-main-body{
      width: 100%;
      height:calc(100% - 60px);
      overflow: auto;
      padding-top: 60px;
      background-color: #f2f4f6;
      .p-index-main-nav{
        float: left;
        width: 64px;
        height: 100%;
      }
      .p-index-main-center{
        width: calc(100% - 64px);
        height: 100%;
        float: left;
        overflow: auto;
        .p-index-content{
              flex: 1;
              height: 100%;
        }
        .p-index-container{
            width: 100%;
            height: 100%;
            overflow: auto;
            padding: 0px 0px 0px 0px;
        }
      }
    }
    .p-index-login{
        flex: 1;
        display: flex;
        height: 100%;
        width:100%;
        .p-index-main {
          width: 100%;
          min-width: 800px;
          .yii-nav{
            z-index: 1;
            background-color: #333;
            .yii-nav-sub{
              z-index: 10;
            }
          }
          .p-index-main-right{
            flex: 1;
            display: flex;
            overflow: auto;
            flex-direction: column;
            padding: 60px 0px 0px 0px;
            background-color: var(--color-contentbg);
          }

          .p-index-main-center{
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            .p-index-content{
              flex: 1;
              display: flex;
              height: 100%;
              
              .p-main-header{
                padding: 20px 20px 0 20px;
              }
            }

            .p-index-container{
              overflow: auto;
              width: 100%;
              flex: 1;
              height: 100%;
              padding: 0px 0px 0px 0px;
              .p-index-main-home{
                padding: 0;
              }
            }
          }
        }
    }
    

    .yii-nav-primary-list > li .text{
      color: #fff;
    }
    .yii-nav-primary-list > li{
      height: 70px;
    }
  }
}
  
  
</style>