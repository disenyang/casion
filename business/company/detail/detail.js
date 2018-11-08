/**
 * Created by gaoyang on 2018/03/27.
 * @title 公司列表js
 */
export default{
    data(){
        return {
            company:{
                "name":"",
                "remark":"",
                "site":"",
                "owner":"",
                "usernum":""
            }
        }
    },
    components: {
        
    },
    computed:{
        userinfo:function(){
            return userinfo;
        },
        defaultHeadimg:function(){
            return this.$store.state.defaultHeadimg;
        }
    },
    watch: {

    },
    created(){

    },
    mounted() {
        this.$nextTick(function() {
            this.getDetail();
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/company/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.company = response.data.data ? response.data.data : {};   
            });     
        },
        back(){
            this.$router.push("../list");
        },
        updateTeamGo(team){
            this.$router.push({name: 'team-modify', params: {id: team.id}});
        },
        goTeamDetail(team){
            this.$router.push({name: 'team-detail', params: {id: team.id}});
        },
        //跳转到新建页面
        gotoNewTeam(){
            this.$router.push({name:"team-setting",params:{company:this.company.id}});
        },
        addCompany(){
            this.$http.post("/casion/userinfo/update", {
                id:userinfo.id,
                company:this.company.id
            }).then((response) => {
                  this.getDetail();
            });     
        }
    }
}
    