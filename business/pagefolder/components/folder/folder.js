/**
 * Created by gaoyang on 2018/01/04.
 * @title 数据模型列表js
 */
import Utils from 'utils'
const beautify = require('js-beautify');
const js_beautify = beautify.js_beautify;
const css_beautify = beautify.css_beautify;
const html_beautify = beautify.html_beautify;

export default{
    mixins:[Utils.emitter,Utils.mixins],
    data(){
        return {
            newfolder:null,
            contextmenu:{
                left:0,
                top:0,
                folderMenus:[
                {
                    name:"新建模块",
                    val:5,
                    enter:false
                },
                {
                    name:"新建页面",
                    val:1,
                    enter:false
                },
                {
                    name:"新建目录",
                    val:2,
                    enter:false
                },
                {
                    name:"修改名称",
                    val:3,
                    enter:false
                },
                {
                    name:"复制",
                    val:6,
                    enter:false
                },
                {
                    name:"黏贴",
                    val:7,
                    enter:false
                },
                {
                    name:"删除",
                    val:4,
                    enter:false
                }],
                pageMenus:[
                {
                    name:"修改名称",
                    val:1,
                    enter:false
                },
                {
                    name:"复制",
                    val:4,
                    enter:false
                },
                {
                    name:"黏贴",
                    val:5,
                    enter:false
                },
                {
                    name:"删除",
                    val:2,
                    enter:false
                },
                {
                    name:"版本记录",
                    val:3,
                    enter:false
                }]
            }
        }
    },
    props:{
        folders:[],
        folder:{

        },
        level:{
            default:0
        }
    },
    components: {
        "folder":resolve => require(['./folder.vue'], resolve)
    },
    watch: {
        selectedPage:function(){
        },
        folders:{
            handler:function(){
            },
            deep:true
        },
    },
    computed:{
        selectedPage:function(){
            return this.$store.state.page.selectedPage;
        },
        project:function(){
            return this.$store.state.project;
        },
        showMenuNode:function(){
            return this.$store.state.page.showMenuNode;
        }
    },
    created(){
    },
    mounted() {
        
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/model/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.formModel = response.data.data ? response.data.data : {};   
            });     
        },
        clickMenu(menu,node){
            if(!node.file){
                //文件夹
                if(menu.val==1){
                    this.newFile(node);
                }else if(menu.val==2){
                    this.newFolder(node);
                }else if(menu.val==3){
                    node.editable=true;
                }else if(menu.val==4){
                    this.deleteFolder(node);
                }else if(menu.val==5){
                    //新建模块
                    this.openSelModule(node);
                }else if(menu.val==6){
                    //复制
                    this.copyFile(node);
                }else if(menu.val==7){
                    //黏贴
                    this.paste(node);
                }
                this.contextmenu.folderMenus.forEach(function(menu){
                    menu.enter=false;
                });
            }else{
                //页面
                if(menu.val==1){
                    node.editable=true;
                }else if(menu.val==2){
                    if(node.name=="入口页面"){
                        this.yiiTips({type: "error", message: "入口页面不能删除！"});
                    }else{
                        this.deletePage(node);
                    }
                }else if(menu.val==3){
                    this.openVersion(node);
                }else if(menu.val==4){
                    //复制
                    this.copyFile(node);
                }else if(menu.val==5){
                    //黏贴
                    this.paste(node);
                }
                this.contextmenu.pageMenus.forEach(function(menu){
                    menu.enter=false;
                });
            }
            node.showMenu = false;  
        },
        copyFile(node){
            this.saveStorage("copy_node",JSON.stringify({id:node.id,name:node.name,file:node.file}));
            this.yiiTips({
              type: "success", 
              message: "复制成功啦！", 
              duration:1000,
              closehandler(el){

              }
            });
        },
        paste(node){
            let folderid = node.file?node.parent.id:node.id;
            let value = this.getStorageValue("copy_node");
            if(value){
                let copyNode = JSON.parse(value);
                if(copyNode.file){
                    //创建页面
                    this.$http.post("/casion/page/copy", {
                        folderid:folderid,
                        copyid:copyNode.id,
                        name:copyNode.name,
                        createuser:userinfo.id,
                        headimg:userinfo.headimg,
                        createusername:userinfo.nickname,
                        project:this.$route.params.projectid,
                        
                    })
                    .then((response) => {
                        let id = response.data.data.id;
                        node.expand=true;
                        node.showMenu = false;
                        let parentNode = node.file?node.parent:node;
                        let newnode = {name:copyNode.name,id:id,expand:true,file:true,showMenu:false,editable:false,selected:false,parentid:folderid,parent:parentNode};
                        parentNode.children.splice(0,0,newnode);

                    })
                    
                }
            }
        },
        attrCastToProps(e){
            var attArr = e.attributes;
            let props = {};
            for(var i in attArr){
                if(!isNaN(parseInt(i))){
                    props[attArr[i].name] = attArr[i].nodeValue;
                }
            }
            return props;
        },
        openVersion(node){
            let vm = this.yiiModal({pageid:node.id}, Vue.extend(require('../../../components/pageversionModal/pageversionModal.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (pageversion)=>{
                this.$store.commit("setRecoverPageversion",pageversion);
                vm.close();
            })
        },
        openSelModule(node){
            //存在模版
            let vm = this.yiiModal({project:this.$route.params.projectid}, Vue.extend(require('../../../components/modulesel/modulesel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (moduleCreatedWrapper)=>{
                console.log("moduleCreatedWrapper",moduleCreatedWrapper);
                let moduleName = moduleCreatedWrapper.moduleName;
                let createdWrapper = moduleCreatedWrapper.createdWrapper;
                let pages = createdWrapper.pages;
                moduleCreatedWrapper.project = this.$route.params.projectid;
                moduleCreatedWrapper.folder = vue.folder?vue.folder.id:null;
                moduleCreatedWrapper.createuser = userinfo.id;
                moduleCreatedWrapper.createusername = userinfo.nickname;


                this.$http.post("/casion/module/create", moduleCreatedWrapper)
                    .then((response) => {
                        let data = response.data.data;
                        let pages = data.pages;
                        let folder = data.folder;
                        let routerconfig = data.routerconfig;
                        this.$store.commit("setRouterconfig",routerconfig); 
                        node.expand=true;
                        node.showMenu = false;
                        let newfolder = {name:folder.name,id:folder.id,expand:true,file:false,showMenu:false,editable:false,selected:false,parentid:node.id,parent:node};
                        let children = [];
                        for(let page of pages){
                            let node = {
                                name:page.name,
                                id:page.id,
                                expand:false,
                                file:true,
                                showMenu:false,
                                editable:false,
                                selected:false,
                                parentid:newfolder.id,
                                parent:newfolder
                            };

                            children.push(node);
                            if(children.length==1){
                                this.$store.commit("setSelectedPage",node);
                                vue.saveNodeExpand(node);
                            }
                        }

                        newfolder.children = children;
                        node.children.splice(0,0,newfolder);
                        vue.saveNodeExpand(newfolder);
                        console.log("children",node.children);
                        vm.close();

                }).catch((e)=>{
                    console.error(e);
                    vm.close();
                });

            })
        },
        clickInput(node,event){

        },
        save(node){
            if(!node.file){
                if(!node.id){
                    let params = {
                        name:node.name,
                        createuser:userinfo.id,
                        parentid:node.parentid,
                        headimg:userinfo.headimg,
                        project:this.$route.params.projectid,
                        createusername:userinfo.nickname
                    };
                    this.yiiLoading.show();
                    this.$http.post("/casion/pagefolder/add", params)
                        .then((response) => {
                        node.id=response.data.data.id;
                        node.editable = false;
                    });
                }else{
                    let params = {
                        id:node.id,
                        name:node.name,
                        updateuser:userinfo.id,
                        parentid:node.parentid,
                        headimg:userinfo.headimg,
                        project:this.$route.params.projectid,
                        updateusername:userinfo.nickname
                    };
                    this.yiiLoading.show();
                    this.$http.post("/casion/pagefolder/update", params)
                        .then((response) => {
                        node.editable = false;
                    });
                }
            }else{
                if(!node.id){
                    let params = {
                        name:node.name,
                        createuser:userinfo.id,
                        folderid:node.parent.id,
                        headimg:userinfo.headimg,
                        project:this.$route.params.projectid,
                        createusername:userinfo.nickname
                    };
                    this.yiiLoading.show();
                    this.$http.post("/casion/page/add", params)
                        .then((response) => {
                        node.id=response.data.data.id;
                        node.editable = false;
                    });
                }else{
                    let params = {
                        id:node.id,
                        name:node.name,
                        project:this.$route.params.projectid,
                        updateuser:userinfo.id,
                        headimg:userinfo.headimg,
                        updateusername:userinfo.nickname
                    };
                    this.yiiLoading.show();
                    this.$http.post("/casion/page/update", params)
                        .then((response) => {
                        node.editable = false;
                    });
                }
            }
            
        },
        back(){
            this.$router.push({"name":"model-list"});
        },
        saveNodeExpand(node){
            if(node.id){
                //保存文件夹展开关闭信息
                if(!node.file){
                    //文件夹
                    let params = {
                        user:userinfo.id,
                        project:this.$route.params.projectid,
                        open:node.expand?1:0,
                        pagefolder:node.id,
                        back_run:true
                    };
                    this.$http.post("/casion/userpagefolder/add", params)
                        .then((response) => {
                       
                    });
                }else{
                    //页面
                    let params = {
                        user:userinfo.id,
                        project:this.$route.params.projectid,
                        openpageid:node.id,
                        back_run:true
                    };
                    this.$http.post("/casion/userprojectconfig/add", params)
                        .then((response) => {
                       
                    });
                }
                
            }else{
                //根结点，保存在项目配置里面
                let params = {
                    user:userinfo.id,
                    project:this.$route.params.projectid,
                    rootopen:node.expand?1:0,
                    back_run:true
                };
                this.$http.post("/casion/userprojectconfig/add", params)
                    .then((response) => {
                   
                });
            }
        },
        clickNode(node){
            node.expand = !node.expand;
            this.saveNodeExpand(node);
            if(node.file){
                this.$store.commit("setSelectedPage",node);
            }
        },
        popMenu(node,event){
            if(this.showMenuNode){
                this.showMenuNode.showMenu=false;
            }

            node.showMenu=true;

            this.contextmenu.left = event.layerX+5;
            this.contextmenu.top = event.layerY;
            event.preventDefault();
            event.stopPropagation();
            this.$store.commit("setShowMenuNode",node);
        },
        newFile(node){

            //存在模版
            let vm = this.yiiModal({project:this.$route.params.projectid}, Vue.extend(require('../../../components/pageTemplateSel/pageTemplateSel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (name,templateHtml,templateJs,templateCss)=>{
                templateJs = js_beautify(templateJs,{
                    "indent_size": 4,
                    "indent_char": " ",
                });
                let component=null;
                if(templateHtml && templateHtml.trim()){
                     component = Utils.domJson.domToJson(templateHtml,null,false);
                }
                let params = {
                    name:name,
                    createuser:userinfo.id,
                    folderid:node.id,
                    headimg:userinfo.headimg,
                    project:this.$route.params.projectid,
                    createusername:userinfo.nickname,
                    content:component?JSON.stringify(component):null,
                    viewModelContent:templateJs,
                    styleContent:templateCss
                };
                this.yiiLoading.show();
                this.$http.post("/casion/page/add", params)
                    .then((response) => {
                    let id=response.data.data.id;

                    let newfolder = {id:id,name:name,expand:false,file:true,showMenu:false,editable:false,selected:false,parentid:node.id,parent:node};
                    node.children.push(newfolder);

                    this.$store.commit("setSelectedPage",newfolder);
                    this.saveNodeExpand(newfolder);
                });

                
                vm.close();
            })

            
        },
        newFolder(node){
            node.expand=true;
            node.showMenu = false;
            let newfolder = {expand:false,file:false,showMenu:false,editable:true,selected:false,parentid:node.id,parent:node,children:[]};
            
            node.children.push(newfolder);
            this.saveNodeExpand(node);
        },
        deleteFolder(node){
            node.showMenu = false;
            let _this = this;
            this.yiiConfirm({
                content: "确认删除文件夹？",
                onConfirm(){
                    _this.$http.post("/casion/pagefolder/delete",{
                        id:node.id
                    }).then((response) => {
                        _this.folders.forEach(function(item,i){
                            if(item==node){
                                _this.folders.splice(i,1);
                            }
                        });
                    });
                }
            });
        },
        //删除
        deletePage(node){
            node.showMenu = false;
            let _this = this;
            this.yiiConfirm({
                content: "确认删除页面？",
                onConfirm(){
                    _this.$http.post("/casion/page/delete",{
                        id:node.id
                    }).then((response) => {
                        _this.folders.forEach(function(item,i){
                            if(item==node){
                                _this.folders.splice(i,1);
                                if(_this.selectedPage.id==node.id){
                                    _this.$store.commit("setSelectedPage",null);
                                }
                            }
                        });
                    });
                }
            });
        },
        modifyFolder(node){
            node.showMenu = false;
            node.editable=true;
        }
    }
}
    