/**
 * Created by gaoyang on 2018/01/04.
 * @title 数据模型列表js
 */
const modelitemTypes = [
    {
        "value":"string",
        "caption":"字符"
    },
    {
        "value":"int",
        "caption":"整型"
    },
    {
        "value":"float",
        "caption":"小数"
    },
    {
        "value":"date",
        "caption":"日期"
    },
    {
        "value":"image",
        "caption":"图片"
    },
    {
        "value":"file",
        "caption":"文件"
    },
    {
        "value":"mobile",
        "caption":"手机号码"
    },
    {
        "value":"email",
        "caption":"邮箱"
    },
    {
        "value":"idcard",
        "caption":"身份证"
    },
    {
        "value":"qq",
        "caption":"QQ"
    },
    {
        "value":"phone",
        "caption":"固定电话"
    }
];
export default{
    data(){
        return {
            params:{
                "name":"",
                "title":"",
                "dbname":"",
                "moduleid":"",
                "remark":"",
                "createusername":"",
                "createtime":"",
                "updateusername":"",
                "updatetime":""
            },
            modelitemTypes:modelitemTypes,
            modelList:[],
            dbList:[],
            selectModelitem:null,
            modelitems:[],
            selectedDb:null,
            selectedModel:null,
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
        this.$nextTick(function() {
            this.listDb();
        })
    },
    filters:{
        getItemTypeText(type){
            for(let i=0;i<modelitemTypes.length;i++){
                if(modelitemTypes[i].value==type){
                    return modelitemTypes[i].caption;
                }
            }
            return "";
        },
        getItemRequiredText(required){
            let str;
            switch(required){
                case "1":str="必填";break;
                case "2":str="非必填";break;
            }
            return str;
        }
    },
    methods: {
        //列表
        list() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize,
                dbid:this.selectedDb.id
            });
            this.yiiLoading.show();
            this.$http.post("/casion/model/query", params)
                .then((response) => {
                    this.modelList = response.data.data.data ? response.data.data.data : [];
                    this.pages.total = response.data.data.page.totalCount;
            });
        },
        listDb() {
            let params = Object.assign({}, this.params, {
                currentPage: this.pages.currentPage,
                pageSize: this.pages.pageSize
            });
            this.yiiLoading.show();
            this.$http.post("/casion/db/query", params)
                .then((response) => {
                    this.dbList = response.data.data.data ? response.data.data.data : [];
            });
        },
        clickDb(db){
            this.selectedDb = db;
            this.list();
        },
        clickModel(model){
            this.selectedModel = model;
            this.yiiLoading.show();
            this.$http.post("/casion/model/get", {
                id:model.id
            }).then((response) => {
                let modelitems = response.data.data.items ? response.data.data.items : [];
                for(let m of modelitems){
                    m.required = m.required+"";
                    m.refmodelitems = [];
                    if(m.refmodelshowitem){
                        this.changeRefmodel(m);
                    }
                }
                this.modelitems = modelitems;
                console.log("modelitems",modelitems);
            });
        },
        changeRefmodel(item){
            if(item &&item.refmodel){
                this.yiiLoading.show();
                this.$http.post("/casion/model/get", {
                    id:item.refmodel
                }).then((response) => {
                    let refmodelitems = response.data.data.items ? response.data.data.items : [];
                    for(let m of refmodelitems){
                        m.required = m.required+"";
                    }

                    item.refmodelitems = refmodelitems;
                });
            }
            
        },
        createBackend(){
            this.yiiLoading.show();
            this.$http.post("/casion/model/createBackend", {
                dbid:this.selectedDb.id,
                modelid:this.selectedModel.id
            }).then((response) => {
                let msg = response.data.data.msg;
                let vm = this.yiiModal({msg:msg}, Vue.extend(require('../../components/backendresultModal/backendresultModal.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{

                })
                let vue = this;
                //监听确认事件
                vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                        
                });
            });
        },
        createFe(){
            this.yiiConfirm({
                content: "确认生成前端代码?",
                onConfirm:()=>{
                    let vm = this.yiiModal({modelid:this.selectedModel.id}, Vue.extend(require('../../components/modelsel/modelsel.vue')));
                    // 监听子组件自定义事件
                    vm.$on('close', (v)=>{

                    })
                    //监听确认事件
                    vm.$on('confirm', (queryColumns,listColumns,settingColumns,detailColumns)=>{
                        vm.close();
                        this.yiiLoading.show();
                        this.$http.post("/casion/model/createFe", {
                            dbid:this.selectedDb.id,
                            modelid:this.selectedModel.id,
                            queryColumns,
                            listColumns,
                            settingColumns,
                            detailColumns
                        }).then((response) => {
                            let msg = response.data.data.msg;
                            let vm = this.yiiModal({msg:msg}, Vue.extend(require('../../components/backendresultModal/backendresultModal.vue')));
                            // 监听子组件自定义事件
                            vm.$on('close', (v)=>{

                            })
                            let vue = this;
                            //监听确认事件
                            vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                                    
                            });
                        });
                    })
                }
            });
            
        },
        createIos(){
            this.yiiLoading.show();
            this.$http.post("/casion/model/createIos", {
                dbid:this.selectedDb.id,
                modelid:this.selectedModel.id
            }).then((response) => {
                let msg = response.data.data.msg;
                let vm = this.yiiModal({msg:msg}, Vue.extend(require('../../components/backendresultModal/backendresultModal.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{

                })
                let vue = this;
                //监听确认事件
                vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                        
                });
            });
        },
        createAndroid(){
            this.yiiLoading.show();
            this.$http.post("/casion/model/createAndroid", {
                dbid:this.selectedDb.id,
                modelid:this.selectedModel.id
            }).then((response) => {
                let msg = response.data.data.msg;
                let vm = this.yiiModal({msg:msg}, Vue.extend(require('../../components/backendresultModal/backendresultModal.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{

                })
                let vue = this;
                //监听确认事件
                vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                        
                });
            });
        },
        clickModelitem(item){
            if(item){
                this.selectModelitem = item;
                this.modelitems.forEach((item,i)=>{
                    item.selected = false;
                });
                if(this.selectModelitem.valueschecktype){
                    this.selectModelitem.valueschecktype = this.selectModelitem.valueschecktype+"";
                }
                this.selectModelitem.selected = true;
            }
        },
        //上移，下移
        moveModelitems(flag){
            switch(flag){
                case 1:{
                    this.modelitems.forEach((item,i)=>{
                        if(item==this.selectModelitem){
                            if(i>=1){
                                this.modelitems.splice(i,1);
                                this.modelitems.splice(i-1,0,item);
                            }
                        }
                    });
                    break;
                }
                case 2:{
                    this.modelitems.forEach((item,i)=>{
                        if(item==this.selectModelitem){
                            if(i<this.modelitems.length-1){
                                this.modelitems.splice(i,1);
                                this.modelitems.splice(i+1,0,item);
                            }
                        }
                    });
                    break;
                }
            }
        },
        search(){
            this.pages.currentPage = 1;
            this.list();
        },
        gotoNew(){
            this.$router.push({name:"model-setting",params:{dbid:this.selectedDb.id}});
        },
        del(e, id){
            let _this = this;
            this.yiiConfirm({
            content: "是否删除",
            onConfirm(){
                    _this.$http.post("/casion/model/delete",{
                    id:id
                    }).then((response) => {
                        _this.list();
                    });
                }
            });
        },
        createOptionItems(){
            this.modelitems = this.modelitems.concat([
                {
                    title:"创建人",
                    name:"createuser",
                    required:"1",
                    type:"string",
                    selected:false,
                    maxlength:32,
                    valuelist:[]
                },
                {
                    title:"创建人",
                    name:"createusername",
                    required:"1",
                    type:"string",
                    selected:false,
                    maxlength:50,
                    valuelist:[]
                },
                {
                    title:"创建时间",
                    name:"createtime",
                    required:"1",
                    type:"string",
                    maxlength:19,
                    selected:false,
                    valuelist:[]
                },
                {
                    title:"修改人",
                    name:"updateuser",
                    required:"2",
                    type:"string",
                    maxlength:32,
                    selected:false,
                    valuelist:[]
                },
                {
                    title:"修改人",
                    name:"updateusername",
                    required:"2",
                    maxlength:50,
                    type:"string",
                    selected:false,
                    valuelist:[]
                },
                {
                    title:"修改时间",
                    name:"updatetime",
                    required:"2",
                    type:"string",
                    maxlength:19,
                    selected:false,
                    valuelist:[]
                },
                {
                    title:"删除标志",
                    name:"d_flag",
                    required:"2",
                    type:"int",
                    maxlength:1,
                    selected:false,
                    valuelist:[]
                }
            ]);
        },
        addModelitem(){
            this.modelitems.push({
                selected:false,
                valuelist:[]
            });
        },
        gotoNewDb(){
            this.$router.push({name:"db-setting"});
        },
        editDb(db){
            this.$router.push({name:"db-modify",params:{id:db.id}});
        },
        editModel(model){
            this.$router.push({name:"model-modify",params:{id:model.id}});
        },
        addModelitemValue(){
            this.selectModelitem.valuelist= this.selectModelitem.valuelist || [];
            this.selectModelitem.valuelist.push({val:"",title:""});
        },
        getSqlType(item){
            let type = "";
            switch(item.type){
                case "1":{type= "varchar";break;}
                case "2":{type= "int";break;}
                case "3":{type= "float";break;}
                default:{type="varchar";}
            }
            if(item.maxlength){
                type = `${type}(${item.maxlength})`;
            }
            return type;
        },
        createSql(){
            let sql = `create table ${this.selectedModel.name}(${this.modelitems.map((item)=>{return `${item.name} ${this.getSqlType(item) } ${item.required=="1"?" not null":""} comment '${item.title}'`}).join(",\n\t")}) comment '${this.selectedModel.title}';`;         
            let vm = this.yiiModal({sql:sql}, Vue.extend(require('../../components/sqlCat/sqlCat.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                    
            });
        },
        importIn(){
            let vm = this.yiiModal({dbid:this.selectedDb.id}, Vue.extend(require('../../components/dbtablesel/dbtablesel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (name,title,items)=>{
                let model = {
                    "title":title,
                    "name":name,
                    "remark":"",
                    createuser:userinfo.id,
                    createusername:userinfo.nickname,
                    dbid:vue.selectedDb.id
                };


                vue.$http.post("/casion/model/add", model)
                .then((response) => {
                    model.id = response.data.data.id;
                    this.$http.post("/casion/model/saveModelitems", {
                        id:model.id,
                        items:items,
                        createuser:userinfo.id,
                        createusername:userinfo.nickname
                    }).then((response) => {
                        vue.modelList.push(model);
                        vue.clickModel(model);
                        vm.close();
                    });

                }).catch(function(){
                    
                });
            });
        },
        saveModelitems(){
            this.yiiLoading.show();
            this.$http.post("/casion/model/saveModelitems", {
                id:this.selectedModel.id,
                items:this.modelitems,
                createuser:userinfo.id,
                createusername:userinfo.nickname
            }).then((response) => {
                this.modelitems = response.data.data.data ? response.data.data.data : [];
                this.yiiTips({
                  type: "success", 
                  message: "成功啦！", 
                  duration:500,
                  closehandler:(el)=>{
                    
                  }
                });
            });
        }
    }
}
    