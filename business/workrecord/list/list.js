/**
 * Created by gaoyang on 2018/04/03.
 * @title 工作记录列表js
 */
import Utils from 'utils'
export default{
    mixins:[Utils.mixins],
    data(){
        return {
            params:{
                "content":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
            },
            dataList:[],
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
    computed:{
        userinfo:function(){
            return userinfo;
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.list();
        })
    },
    methods: {
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                createuser:this.$route.params.userid
            });
            this.yiiLoading.show();
            this.$http.post("/casion/workrecord/query", params)
                .then((response) => {
                    this.dataList = response.data.data.data ? response.data.data.data : [];
                    for(let d of this.dataList){
                        d.content=this.replaceContent(d.content);
                    }
                    this.set(this.dataList,"editable",false);
                    console.log("dataList",this.dataList);
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        //查询数据
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        addRow(){
            this.dataList.splice(0,0,{
                createtime:this.formatDate(),
                createusername:userinfo.name,
                createuser:userinfo.id,
                content:"",
                editable:true
            });
        },
        //跳转到新建页面
        gotoNew(){
            this.$router.push("setting");
        },
        edit(row){
            row.editable = true;
        },
        replaceContent(content){
            return content.replace(/\n/g,"<br>");
        },
        changeRow(row){
            if(row.content.trim()===""){
                this.yiiTips({
                  type: "error", 
                  message: "请输入日报内容", 
                  duration:1000,
                  closehandler(el){}
                });
                return;
            }
            row.createusername = userinfo.name?userinfo.name:userinfo.nickname;
            row.createuser = userinfo.id;
            row.updateusername = row.createusername;
            row.updateuser = row.createuser;

            this.yiiLoading.show();
            this.$http.post(row.id?"/casion/workrecord/update":"/casion/workrecord/add", row)
                .then((response) => {
                    if(!row.id){
                         row.id = response.data.data.id;
                         this.yiiTips({
                          type: "success", 
                          message: "保存成功！获得2积分~", 
                          duration:2000,
                          closehandler(el){}
                        });
                    }
                    row.editable = false;
                    row.content=this.replaceContent(row.content);
            });
        },
        //删除一条数据
        del(e, id,index){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                if(id){
                     _this.$http.post("/casion/workrecord/delete",{
                    id:id
                    }).then((response) => {
                        _this.list();
                    });
                }else{
                    _this.dataList.splice(index,1);
                }
            }
        });
    }
    }
}
    