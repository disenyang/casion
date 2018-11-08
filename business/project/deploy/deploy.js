/**
 * Created by gaoyang on 2018/01/22.
 * @title 项目列表js
 */

export default{
    data(){
        return {
            project:{
                name:""
            },
            envs:[],
            params:{
                envid:"",
                version:"",
                remark:""
            },
            deploydetails:[],
            pages:{
                total:0,
                pageSize:15,
                currentPage:1
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
        
        this.getDetail();
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/project/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.getEnvs();
                this.project = response.data.data ? response.data.data : {};  
                this.$store.commit("setHead_title",this.project.name+"-发布"); 
            });     
        },
        getEnvs(){
            this.yiiLoading.show();
            this.$http.post("/casion/environment/query", {
            }).then((response) => {
                let envs = response.data.data.data ? response.data.data.data : [];
                for(let env of envs){
                    env.selected = false;
                }
                if(envs.length>0){
                    envs[0].selected = true;
                    this.queryProjectdeploydetail();
                }
                
                this.envs = envs;
                //this.envs.splice(0,0,{name:"dev",remark:"开发环境",selected:true});
            });     
        },
        queryProjectdeploydetail(){
            let envid = "";
            for(let env of this.envs){
                envid = env?env.id:"";
            }
            this.$http.post("/casion/projectdeploydetail/query", {
                project:this.project.id,
                envid:envid
            }).then((response) => {
                this.deploydetails = response.data.data.data ? response.data.data.data : [];
                this.pages.total = response.data.data.page.totalCount;
            });     
        },
        deploy(){
            //window.open("/casion/project/deploy?id="+this.$route.params.id);
            let params={
                project:this.$route.params.id,
                envid:this.params.envid,
                createuser:userinfo.id,
                createusername:userinfo.nickname,
                version:this.params.version,
                remark:this.params.remark,
            };
            this.yiiLoading.show();
            this.$http.post("/casion/project/deploy", params).then((response) => {
                this.queryProjectdeploydetail();
            });   
        },
        exportProject(){
            window.open(`/casion/project/export?project=${this.$route.params.id}&envid=${this.params.envid}`);

        },
        clickTab(env){
            for(let e of this.envs){
                e.selected = false;
            }
            env.selected = true;
            this.queryProjectdeploydetail();
        }

    }
}
    