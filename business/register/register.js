export default{
    data(){
      return {
        islogin:true,
        vcodeValidate:false,
        vcodeSending:false,
        sendBtnTitle:"发送验证码",
        vcode:"",
        vcodeValidateRight:0,
        errorMsg:"",
        params:{
          mobile:"",
          vcode:"",
          nickname:"",
          name:"",
          password:"",
          confirmPassword:""
        },
        msg:""
      }
    },
    computed: {
     
    },
    components: {

    },
    watch: {
      "params.vcode":function(newvalue){
        console.log("params.vcode",this.params.vcode);
        if(newvalue.length>=1){
          if(this.vcode!=this.params.vcode){
            this.vcodeValidateRight=2;
          }else{
            this.vcodeValidateRight=1;
          }
        }else{
          this.vcodeValidateRight=0;
        }
      }
    },
    created(){
        if(/(.*)login$/.test(window.location.href)){
            this.islogin = true;
        }else{
            this.islogin = false;
        }

    },
    mounted() {
        console.log("this.islogin",this.islogin);
      this.$nextTick(function() {
        
      })
    },
    methods: {
      submit(link){
        this.errorMsg = "";
        let params = this.params;
        if(""===params.mobile){
          this.errorMsg="请输入手机号";
          return;
        }
        if(!/1[0-9]{10}/.test(params.mobile)){
          this.errorMsg="手机号码格式不正确";
          return;
        }
        if(""===params.vcode){
          this.errorMsg="请输入验证码";
          return;
        }

        if(this.vcode!=params.vcode){
          this.errorMsg="验证码不正确";
          return;
        }
        if(""===params.nickname.trim()){
          this.errorMsg="请输入昵称";
          return;
        }
        if(""===params.name.trim()){
          this.errorMsg="请输入真实姓名";
          return;
        }
        if(""===params.password){
          this.errorMsg="请输入密码";
          return;
        }
        if(params.confirmPassword!=params.password){
          this.errorMsg="二次输入密码不一致";
          return;
        }

        this.errorMsg="";

        this.yiiLoading.show();
        this.$http.post("/casion/userinfo/add", this.params)
          .then((response) => {
            let json = response.data;
            if (json.code==200) {
                let userinfo = json.data;
                window.localStorage.setItem("userinfo",JSON.stringify(userinfo));
                this.yiiTips({
                  type: "success", 
                  message: "注册成功！即将自动登录...",
                  closehandler(el){
                    window.location.href="./home";
                  }
                });
                
            }else{
                this.msg = json.msg;
            }
        });
      },
      goLogin(){
          this.$router.push({name:"login"});
      },
      goRegister(){
          this.$router.push({name:"register"});
      },
      dealCode(){
        this.vcodeSending=true;
        let s=60;
        this.sendBtnTitle=`已发送${s}秒`;
        let inter = window.setInterval(()=>{
          s--;
          this.sendBtnTitle=`已发送${s}秒`;
          if(s<=0){
            window.clearInterval(inter);
            this.sendBtnTitle=`重新发送`;
            this.vcodeSending= false;
          }
        },1000);
      },
      sendVcode(){
        this.errorMsg = "";
        let params = this.params;
        if(""===params.mobile){
          this.errorMsg="请输入手机号";
          return;
        }
        if(!/1[0-9]{10}/.test(params.mobile)){
          this.errorMsg="手机号码格式不正确";
          return;
        }
        if(!this.vcodeSending){
          this.$http.post("/casion/userinfo/sendVcode", this.params)
            .then((response) => {
              this.vcode = response.data.msg;
              this.dealCode();
          });
        }
      }
    }
}