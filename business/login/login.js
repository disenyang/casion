export default{
    data(){
        return {
            islogin:true,
            params:{
                username:"",
                password:""
            },
            msg:""
        }
    },
    computed: {
        
    },
    components: {

    },
    watch: {
        
    },
    created(){
        if(/(.*)login$/.test(window.location.href)){
            this.islogin = true;
        }else{
            this.islogin = false;
        }

    },
    mounted() {
        
    },
    methods: {
        submit(link){
            this.yiiLoading.show();
            this.$http.post("/casionj/user/login", this.params)
                .then((response) => {
                    console.log("response",response)
                    let json = response.data;
                    if (json.meta.errno==0) {
                        let userinfo = json.result;
                        window.localStorage.setItem("userinfo",JSON.stringify(userinfo));
                        window.location.href="./home";
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
        }
    }
}