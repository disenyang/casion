<template>
  <div class="login_home">
    <div class="login_bg">
    </div>
    <div class="login_con">
        <div class="login-topbar">
            <div class="logo">
            </div>
            <div class="title">
                大前端统一开发平台
            </div>
            <div class="btns">
                <div class="log-btn" :class="{selected:islogin}" @click="goLogin">登录</div>
                <div class="reg-btn" :class="{selected:!islogin}" @click="goRegister">注册</div>
            </div>
        </div>
        <div class="page-login">
            <div class="login">
                <div class="login-title">
                    用户登录
                </div>
                <div class="login-user">
                    <ul>
                        <li>
                          <!--   <span></span> -->
                            <input type="text" autocomplete="off"  v-model='params.username' ng-keyup="enterSubmit($event)" placeholder="请输入手机号">
                        </li>
                        <li>
                           <!--  <span></span> -->
                            <input type='password' autocomplete="off" v-model='params.password' ng-keyup="enterSubmit($event)" placeholder="请输入密码">
                        </li>
                    </ul>
                </div>
                <div class="msg">
                    {{msg}}
                </div>
                <!-- <div class="login-code" ng-if='isCode'>
                    <input type="text" name="verifyCode" ng-model='params.verifyCode' placeholder="验证码">
                    <span><img src={{codeImg}}></span>
                    <a href="javascript:void(0)" ng-click='changImg()'>换一张</a>
                </div> -->
                <!-- <div style="overflow: hidden; padding: 18px 0">
                    <a href="javascript:void(0);" ui-sref="cms.main.login.resetpwd" class="text-line">忘记密码</a>
                </div> -->
                <a class="ry-btn large solid-bright login-btn" @click='submit()'>立即登录</a>
                <div class="register-alert" @click="goRegister">还没有账户，马上注册</div>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
    import login from "./login";
    export default login;
</script>
<style src="./login.css"></style>