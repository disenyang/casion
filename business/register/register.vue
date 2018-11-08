<template>
  <div class="register_home">
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
                    加入casion，让开发更简单高效
                </div>
                <div class="login-user">
                    <ul>
                        <li class="login-mobile">
                            <input type="number" v-model='params.mobile' placeholder="请输入手机号">
                            <button class="send-btn" @click="sendVcode"  :class="{sending:vcodeSending}">
                                {{sendBtnTitle}}
                            </button>
                        </li>
                        <li class="vcode" >
                            <input type='text'  v-model='params.vcode' placeholder="请输入验证码">
                            <div class="icon" :class="{right:vcodeValidateRight==1,error:vcodeValidateRight==2}">
                            </div>
                        </li>
                        <li >
                            <input type="text" v-model='params.nickname' placeholder="起一个开心的名字">
                        </li>
                        <li >
                            <input type="text" v-model='params.name' placeholder="你的真实姓名，便于工作管理">
                        </li>
                        <li >
                            <input type='password' v-model='params.password' placeholder="请输入密码">
                        </li>
                        <li >
                            <input type='password' v-model='params.confirmPassword' placeholder="确认密码">
                        </li>
                    </ul>
                </div>
                <div class="msg">
                    {{errorMsg}}
                </div>
                <!-- <div class="login-code" ng-if='isCode'>
                    <input type="text" name="verifyCode" ng-model='params.verifyCode' placeholder="验证码">
                    <span><img src={{codeImg}}></span>
                    <a href="javascript:void(0)" ng-click='changImg()'>换一张</a>
                </div> -->
                <!-- <div style="overflow: hidden; padding: 18px 0">
                    <a href="javascript:void(0);" ui-sref="cms.main.login.resetpwd" class="text-line">忘记密码</a>
                </div> -->
                <a class="ry-btn large solid-bright login-btn" @click='submit()'>确认注册</a>
            </div>
            
        </div>
    </div>
  </div>
</template>

<script>
    import register from "./register";
    export default register;
</script>

<style src="./register.css"></style>