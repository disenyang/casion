/**
 * Created by gaoyang on 2018/03/27.
 * @title 团队列表js
 */
export default{
    data(){
        return {
            formModel:{
                "name":"",
                "remark":"",
                "company":"",
            },
            users:[],
            formRules:{
                "name":[{required: true, message: '请输入名称'}],
                "remark":[{required: true, message: '请输入描述'}],
                "company":[{required: true, message: '请输入公司'}],
            }
        }
    },
    computed:{
        defaultHeadimg:function(){
            return this.$store.state.defaultHeadimg;
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        this.$nextTick(function() {
            if(this.$route.params.id){
                this.getDetail();
            }
        })
    },
    methods: {
        //保存
        save(){
            let vue = this;
            this.$refs.form.validate()
                .then(() => {
                    let id = this.$route.params.id;

                    let userids = this.users.map((item)=>{
                        return item.id;
                    });
                    let params = Object.assign({}, this.formModel,{
                        createuser:userinfo.id,
                        createusername:userinfo.nickname,
                        userids
                    });
                    if(id){
                        //修改
                        params = Object.assign({}, this.formModel,{
                            updateuser:userinfo.id,
                            updateusername:userinfo.nickname,
                            id,
                            userids
                        });
                    }else{
                         params.company=this.$route.params.company;
                         params.owner = userinfo.id;
                    }

                    this.yiiLoading.show();
                    this.$http.post(id?"/casion/team/update":"/casion/team/add", params)
                        .then((response) => {
                            this.yiiTips({
                              type: "success", 
                              message: "成功啦！",
                              duration:1000, 
                              closehandler(el){
                                vue.back();
                              }
                            });
                    }).catch(function(){
                        
                    });
                })
                .catch(() => {
                    console.log('form1 validate fail')
                });
        },
        delUser(index){
            this.users.splice(index,1);
        },
        chooseUser(){
            // 创建弹窗，并传递参数
            let vm = this.yiiModal({}, Vue.extend(require('../../components/usersel/usersel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{
            })
            //监听确认事件
            vm.$on('confirm', (selectData)=>{
                console.log("users",this.users);
                for(let newUser of selectData){
                    let find = false;
                    for(let user of this.users){
                        if(user.id === newUser.id){
                            find = true;
                        }
                    }
                    if(!find){
                        this.users.push(newUser);
                    }
                }

                console.log("users",this.users);
                vm.close();
            })
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/team/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {}; 
                this.users =  this.formModel.users; 
            });     
        },
        back(){
            this.$router.go(-1);
        }
    }
}
    