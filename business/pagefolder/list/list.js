/**
 * Created by gaoyang on 2018/01/09.
 * @title 页面文件夹列表js
 */ 

export default{
    name:"pagefolder",
    data(){
        return {
            folders:[],
            folderlist:[],
            newfolder:null,
            selectFolder:null,
            project:{bizcoms:[]},
            pageid:null,
            pages:[],
            myRouter:null,
            selectedConfig:0,
            projectconfig:"",
            cssconfig:"",
            tabSelectIndex:1,
            comTabSelectIndex:1,
            projectconfigOption:{
                mode: 'javascript',
                theme:"dracula",
                lineNumbers: true,
                indentUnit:4,
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                extraKeys: {
                    "'c'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    "'r'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    'Cmd': 'autocomplete'
                }
            },
            cssconfigOption:{
                mode: 'css',
                theme:"dracula",
                lineNumbers: true,
                indentUnit:4,
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                extraKeys: {
                    "'c'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    "'r'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    'Cmd': 'autocomplete'
                }
            },
            routerconfigOption:{
                mode: 'javascript',
                theme:"dracula",
                lineNumbers: true,
                indentUnit:4,
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                extraKeys: {
                    "'c'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    "'r'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    'Cmd': 'autocomplete'
                }
            }
        }
    },
    components: {
        "folder":resolve => require(['../components/folder/folder.vue'], resolve),
        "page-editor":resolve => require(['../../page/edit/edit.vue'], resolve)
    },
    // router:(()=>{
    //     //创建路由
    //     // createRouter(folders,path){
    //     //     let router = [];
    //     //     function digui(fs,p,prouter){
    //     //         for(let f of fs){
    //     //             if(f.file){
    //     //                 let filename = f.id;
    //     //                 if(f.name!="入口页面"){
    //     //                     let r = {
    //     //                         "name":`${f.id}`,
    //     //                         "path":`${f.id}`,
    //     //                         "meta":{
    //     //                             "title":`${f.name}`
    //     //                         },
    //     //                         "component":`resolve => require(['business/${p}${filename}.vue'], resolve)`
    //     //                     };
    //     //                     prouter.push(r);
    //     //                 }
    //     //             }else{
    //     //                 digui(f.children,p+f.id+"/",prouter);
    //     //             }
    //     //         }
    //     //     }
    //     //     digui(folders,"",router);
    //     //     let rstring = this.formatJson(router,false);
    //     //     rstring = rstring.replace(/"resolve =>/g,"resolve =>");
    //     //     rstring = rstring.replace(/resolve\)"/g,"resolve)");
    //     //     let routercode = `export default function(Vue){return ${rstring}}`;
    //     // },
        

    //     console.log("aaaa=============");
    //     return router;
    // })(),
    watch: {
        selectedPage:function(val,oldValue){
            
            // if(this.myRouter){
            //     this.myRouter.push({name:"foo"});
            // }
            
            if(val==null){
                this.pageid ==null

            }else{
                this.pageid = val.id;
                this.pagename = val.name;
                this.selectedConfig = 0;
            }
            
            //this.$router.push({name:`redirect`,params:{pageid:this.pageid}});
        },
        routerconfig:function(val,oldValue){
            this.$store.commit("setRouterconfig",val); 
            
        }
    },
    created(){
        
    },
    computed:{
        selectedPage:function(){
            return this.$store.state.page.selectedPage;
        },
        routerconfig:function(){
            return this.$store.state.project.routerconfig;
        },
        basiccoms:function(){
            return this.$store.state.project.basiccoms;
        }
    },
    mounted() {
        this.getProject();
        
        
    },
    methods: {
        //列表
        getProject() {
            this.yiiLoading.show();
            this.$http.post("/casion/project/getEdit", {
                id:this.$route.params.projectid,
                back_run:true
            }).then((response) => {
                let project = response.data.data || {};
                this.projectconfig = project.projectconfig;
                this.cssconfig= project.cssconfig;
                if(project.basiccoms){
                    project.basiccoms.forEach(function(com){
                        com.showTip=false;
                    });
                }
                this.project = project;
                this.project.allcoms = [...project.basiccoms,...project.bizcoms];
                this.$store.commit("setHead_title",this.project.name); 
                this.$store.commit("setBasiccoms",project.basiccoms); 
                this.$store.commit("setProjectconfig",project.projectconfig); 

                this.$store.commit("setProject",project); 
                this.$store.commit("setRouterconfig",project.routerconfig);    
                this.getFolders();
            });
        },
        clickConfig(config){
            this.selectedConfig = config;
            console.log("selectedConfig",this.selectedConfig);
            this.$store.commit("setSelectedPage",null); 
        },
        test(){
            this.folders.push({id:"aaa",name:"aaa1"});
        },
        getFolders() {
            let params = {
                id:this.$route.params.projectid,
                userid:userinfo.id,
                back_run:true
            };
            
            
            this.$http.post("/casion/project/getAllFile", params)
                .then((response) => {
                let defaultVals = {
                    expand:false,
                    showMenu:false,
                    editable:false,
                    selected:false,
                    file:false
                };
                let folders = response.data.data.folders || [];
                let userfolders = response.data.data.userfolders || [];

                let pages = response.data.data.pages || [];
                let userprojectconfig =  response.data.data.userprojectconfig;
                let rootFolder={name:this.project.name,...defaultVals};
                let level_folders = [];

                //是否有打开的文件夹  
                folders.forEach(function(item,i){
                    for(let key in defaultVals){
                        item[key]=defaultVals[key];
                    }
                    item.children = [];
                    folders.forEach(function(it,i){
                        if(it.parentid==item.id){
                            item.children.push(it);
                            it.parent = item;
                        }
                    });
                    if(!item.parentid){
                        level_folders.push(item);
                        item.parent = rootFolder;
                    }
                    userfolders.forEach(function(it,i){
                        if(it.pagefolder==item.id){
                            item.expand = it.open;
                        }
                    });
                })

                if(userprojectconfig && userprojectconfig.rootopen){
                    rootFolder.expand= true;
                }
                if(userprojectconfig && userprojectconfig.openpageid){
                    this.pageid = userprojectconfig.openpageid;
                }else{
                    this.yiiLoading.hide();
                }

                folders.push(rootFolder);
                rootFolder.children = level_folders;

                this.folderlist = folders;   

                pages.forEach((page,i)=>{
                    page.file=true;
                    page.showMenu = false;
                    page.editable = false;
                    if(page.id == this.pageid){

                        this.$store.commit("setSelectedPage",page); 
                    }
                    
                    if(userprojectconfig && userprojectconfig.openpageid===page.id){
                        page.selected = true;
                    }
                    if(page.folderid==null){
                        rootFolder.children.push(page);
                        page.parent = rootFolder;
                    }else{
                        this.setFolder(page);
                    }
                });
                
                this.folders = [rootFolder];
                this.pages = pages;
                let router = this.$router;
                let routes = [];
                for(let page of this.pages){
                    let r = {
                        "name":`${page.id}`,
                        "path":`${page.id}/:id`,
                        "meta":{
                            "title":`${page.name}`
                        },
                        "component":resolve => require(['business/page/edit/edit.vue'], resolve)
                    }; 
                    routes.push(r);
                }

                let r = {
                    "name":`redirect`,
                    "path":`redirect/:id`,
                    "meta":{
                        "title":`redirect`
                    },
                    "component":resolve => require(['business/page/edit/redirect.vue'], resolve)
                }; 
                routes.push(r);

                router.options.routes[0].children[5].children[0].children.push(...routes);
                this.$store.commit("setPages",this.pages); 
                router.addRoutes(router.options.routes);
            });
        },
        setFolder(page){
            for(let folder of this.folderlist){
                if(page.folderid==folder.id){
                    folder.children.push(page);
                    page.parent = folder;
                    break;
                }
            }
        },
        projectconfigChange(){
            let editor =  this.$refs.projectconfigEditor.editor;
            this.projectconfig = editor.getValue();
            this.$store.commit("setProjectconfig",this.projectconfig); 
            if(this.projectconfig){
                this.$http.post("/casion/project/saveProjectconfig", {
                    id:this.$route.params.projectid,
                    projectconfig:this.projectconfig
                }).then((response) => {
                    
                });
            }
        },
        routerconfigChange(){
            let editor =  this.$refs.routerconfigEditor.editor;
            let routerconfig = editor.getValue();
            this.$store.commit("setRouterconfig",routerconfig); 
            if(routerconfig){
                this.$http.post("/casion/project/saveRouterconfig", {
                    id:this.$route.params.projectid,
                    routerconfig:routerconfig
                }).then((response) => {
                    
                });
            }
        },
        cssconfigChange(){
            let editor =  this.$refs.cssconfigEditor.editor;
            this.cssconfig = editor.getValue();
            this.project.cssconfig = this.cssconfig;
            this.$store.commit("setCssconfig",val); 
            if(this.cssconfig){
                this.$http.post("/casion/project/saveCssconfig", {
                    id:this.$route.params.projectid,
                    cssconfig:this.cssconfig
                }).then((response) => {
                    
                });
            }

        },
        complete(cm, pred){
            var cur = cm.getCursor();
            if (!pred || pred()) setTimeout(function() {
              if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
            }, 100);
            return "CodeMirror.Pass";
        },
        click(){
            function ditui(folders){
                if(folders){
                    folders.forEach(function(f,i){
                        f.showMenu = false;
                        ditui(f.children);
                    });
                }
            }
            ditui(this.folders);
        }
    }
}
    