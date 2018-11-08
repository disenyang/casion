/**
 * Created by gaoyang on 2018/01/22.
 * @title 项目列表js
 */
import stores from 'stores';

export default{
    data(){
        return {
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png",
            coms:[],
            cos:[],
            users:[userinfo],
            defaultHeadimg:stores.defaultHeadimg,
            params:{
                name:"",
                enname:"",
                remark:"", 
                backendpath:"",
                fepath:"",
                backendlanguage:"",
                private:1,
                javabasepackage:"",
                type:"pc",
                iosprojectpath:"",
                androidprojectpath:""
            },
            checkParams:{
                name:{
                    error:false,
                    msg:"名称不能为空"
                },
                remark:{
                    error:false,
                    msg:"名称不能为空"
                },
                enname:{
                    error:false,
                    msg:"英文名称不能为空"
                }
            }
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        console.log("this",this);
        this.$nextTick(function() {
            if(this.$route.params.id){
                this.getDetail();
            }
        })
    },
    methods: {
        //保存
        save(){
            let checkParams = this.checkParams;
            checkParams.name.error=false;
            checkParams.remark.error=false;
            if(this.params.name==""){
                checkParams.name.error=true;
                checkParams.name.msg="名称不能为空";
                return;
            }
            if(this.params.enname==""){
                checkParams.enname.error=true;
                checkParams.enname.msg="英文名称不能为空";
                return;
            }
            if(this.params.remark==""){
                checkParams.remark.error=true;
                checkParams.remark.msg="描述不能为空";
                return;
            }
            let vue = this;
            let comids = this.coms.map(function(item){
                return item.id;
            })
            let coids = this.cos.map(function(item){
                return item.id;
            })
            let userids = this.users.map(function(item){
                return item.id;
            })
            let params = {
                id:this.$route.params.id,
                name:this.params.name,
                enname:this.params.enname,
                backendpath:this.params.backendpath,
                fepath:this.params.fepath,
                backendlanguage:this.params.backendlanguage,
                remark:this.params.remark,
                private:this.params.private,
                type:this.params.type,
                javabasepackage:this.params.javabasepackage,
                comids:comids,
                coids:coids,
                userids:userids,
                createuser:userinfo.id,
                headimg:userinfo.headimg,
                createusername:userinfo.nickname,
                iosprojectpath:this.params.iosprojectpath,
                androidprojectpath:this.params.androidprojectpath
            };
            this.yiiLoading.show();
            this.$http.post("/casion/project/add", params)
                .then((response) => {
                    let id = response.data.data.id||params.id;
                    this.yiiTips({
                        type: "success", 
                        message: "成功啦！", 
                        duration:1000,
                        closehandler:(el)=>{
                            this.$router.push({"name":"project-detail","params":{id:id}});
                        }
                    });
            }).catch(function(){
                
            });
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/project/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.params = response.data.data ? response.data.data : {}; 
                this.coms=this.params.basiccoms;
                this.cos = this.params.basiccomcos;  
                this.user = this.params.users;  
            });     
        },
        back(){
            this.$router.push({"name":"project-list"});
        },
        popAddCom(){
            // 创建弹窗，并传递参数
            let vm = this.yiiModal({}, Vue.extend(require('../../components/comsel/comsel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{
            })
            //监听确认事件
            vm.$on('confirm', (selectData,selectedCos)=>{
                this.coms.push(...selectData);
                this.cos.push(...selectedCos);
                vm.close();
            })
        },
        popAddUser(){
            // 创建弹窗，并传递参数
            let vm = this.yiiModal({}, Vue.extend(require('../../components/usersel/usersel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{
            })
            //监听确认事件
            vm.$on('confirm', (selectData)=>{
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

                this.users=selectData;
                console.log("users",this.users);
                vm.close();
            })
        }
    }
}
    