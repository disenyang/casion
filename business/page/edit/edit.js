/**
 * Created by gaoyang on 2018/01/09.
 * @title 页面文件夹列表js
 */
import  {$} from 'jquery'
import Utils from 'utils'
const postcss = require('postcss');
const postcssJs = require('postcss-js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const babel = require("babel-standalone");
const vueJsx = require("babel-plugin-transform-vue-jsx");
const beautify = require('js-beautify');
const js_beautify = beautify.js_beautify;
const css_beautify = beautify.css_beautify;
const html_beautify = beautify.html_beautify;

babel.registerPlugin('vueJsx', vueJsx);

//默认的焦点对象
let defaultCursor={
    component:null,//组件
    position:1//相对于组件的位置,1:内部,2:左边,3:右边
};
export default{
    name:"page-edit",
    data(){
        return {
            page:{
                content:[]
            },
            //光标
            cursor:{
                el:null,
                ...defaultCursor
            },
            pageid:null,
            //是否可以编辑
            editabled:false,
            showMobileDrop:false,
            moving:false,
            comTreeBig:false,
            showBasiccomponentsAll:false,
            showBizcomponentsAll:false,
            mixinsObj:[Utils.zindex,Utils.emitter,Utils.popper,Utils.mixins],
            showTemplate:false,
            moveComponents:[],//移动的组件列表
            styleEditorOption:{
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
            viewmodeEditorOption:{
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
            treeComs:[],
            treeComponents:[],
            showComTree:false,
            //上一次修改属性的组件:
            lastPropComponent:null,
            tabindex:1,
            idindex:1,
            dragType:1,//1:拖动组件，2:页面拖动
            dragBasiccom:null,//拖动的组件
            //样式内容
            styleContent:"",
            errors:[],
            viewModelContent:"",
            viewModelEditor:null,
            styleEditor:null,
            mode:1,//模式，1:编辑模式，2:预览模式
            showMode:false,
            showTree:false,
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png",
            //旧属性
            oldProps:null,
            mobiles:[
                {
                    name:"iphone5",
                    selected:false,
                    width:320,
                    height:568
                },
                {
                    name:"iphone6",
                    selected:true,
                    width:375,
                    height:667
                },
                {
                    name:"iphone6 Plus",
                    selected:false,
                    width:414,
                    height:736
                },
                {
                    name:"iphone7",
                    selected:false,
                    width:375,
                    height:667
                },
                {
                    name:"iphone7 Plus",
                    selected:false,
                    width:414,
                    height:736
                },
                {
                    name:"iphone7",
                    selected:false,
                    width:375,
                    height:667
                },
                {
                    name:"iphone8 Plus",
                    selected:false,
                    width:414,
                    height:736
                },
                {
                    name:"iphonex",
                    selected:false,
                    width:414,
                    height:736
                },
                {
                    name:"Nexus5",
                    selected:false,
                    width:360,
                    height:640
                },
                {
                    name:"Nexus5x",
                    selected:false,
                    width:411,
                    height:731
                },
                {
                    name:"Nexus6",
                    selected:false,
                    width:412,
                    height:731
                }
            ],
            propTabs:[
                {
                    name:"属性",
                    selected:true
                },
                {
                    name:"样式",
                    selected:false
                },
                {
                    name:"事件",
                    selected:false
                }
            ],
            tabs:[
                {
                    name:"视图",
                    selected:true
                },
                {
                    name:"组件树编辑",
                    selected:false
                },
                {
                    name:"样式",
                    selected:false
                },
                {
                    name:"视图模型",
                    selected:false
                }
                // {
                //     name:"服务",
                //     selected:false
                // }
            ],
            tabSelectedIndex:0,
            coms:[
                {
                    name:"layout",
                    title:"布局"
                },
                {
                    name:"label",
                    title:"文本"
                },
                {
                    name:"input",
                    title:"输入框"
                },
                {
                    name:"button",
                    title:"按钮"
                },
                {
                    name:"table",
                    title:"数据表"
                }
            ],
            props:{
                
            },
            commonDoBefore(vm){
                vm.lastPropComponent = vm.selectedComponent;
                vm.selectedComponent.props = vm.selectedComponent.props || [];
            },
            commonDoAfter(vm){
                //vm.savePageContent();
            },
            table:{
                rows:4,
                cols:4
            },
            //历史的组件操作栈
            historyStack:[],
            //前进栈
            aheadStack:[],
            //复制的组件
            copyComponent:null,
            showTable:false,
            viewModel:null
        }
    },
    computed:{
        pages:function(){
            return this.$store.state.project.pages;
        },
        recoverPageversion:function(){
            return this.$store.state.recoverPageversion;
        },
        project:function(){
            return this.$store.state.project.data;
        },
        projectconfig:function(){
            let projectconfig = this.$store.state.project.projectconfig;
            if(projectconfig){
                return  eval("("+projectconfig+")");
            }
            return {};
        },
        selectMobile:function(){
            for(let mobile of this.mobiles){
                if(mobile.selected){
                    return mobile;
                }
            }
            return null;
        },
        //选择的组件
        selectedComponent:function(){
            return this.$store.state.selectedComponent;
        },
        routerconfig:function(){
            let routerconfig = this.$store.state.project.routerconfig;
            if(routerconfig){
                return  eval("("+routerconfig+")");
            }
            return [];
        },
        defaultProps:function(){
            return this.$store.state.defaultProps;
        },
        defaultUnProps:function(){
            return this.$store.state.defaultUnProps;
        },
        dealJscode:function(){
            return this.$store.state.dealJscode;
        }
    },
    props:{
        pageid:{
            type:String
        },
        pagename:{
            type:String
        },
        basiccoms:{
            type:Array
        },
        allcoms:{
            type:Array
        },
        bizcoms:{
            type:Array
        },
        basiccomcos:{
            type:Array
        }
    },
    components: {
        
    },
    watch: {
        "recoverPageversion":function(newValue){
            if(newValue){
                this.recoverPage(newValue);
            }
        },
        
        "tabSelectedIndex":function(newValue,oldValue){
            if(this.tabSelectedIndex==0){
                this.createPageView();
            }
        }    
    },
    created(){

    },
    mounted() {
        //this.pageid = this.$route.params.id;
        //默认的原生属性
        let defaulVueProps ={
            "v-if":{
                name:"创建"
            },
            "v-show":{
                name:"显示"
            },
            "v-for":{
                name:"循环"
            },
            "slot-scope":{
                name:"插槽作用域"
            }
        };

        for(let basiccom of this.allcoms){
            let jscode = basiccom.jscode;
            basiccom.jscode = this.dealJscode(jscode,babel);
            try{
                let viewModel =eval(`(${basiccom.jscode})`);
                basiccom.props = [];
                basiccom.config = viewModel.config;
                let props = viewModel.props;
                //非props属性
                let unProps = viewModel.unProps;

                props = {...defaulVueProps,...props};
                if(unProps){
                    props = {...unProps,...props};
                }
                
                for(let key in props){
                    basiccom.props.push({
                        prop:key,
                        ...props[key],
                        value:""
                    });
                }
            }catch(e){
                console.error(basiccom.name+"组件定义错误",e);
            }
        }
        if(this.pageid){
            this.init();
        }
        this.$watch("pageid",(newvalue)=>{
            if(this.pageid){
                this.init();
            }
        });

        this.$watch('props', (props)=>{

            if(this.lastPropComponent==this.selectedComponent){
                //属性值是否改变
                let changed = false;
                for(let prop of props){
                    for(let oldProp of this.oldProps){
                        if(prop.prop===oldProp.prop && prop.value!==oldProp.value){
                            changed = true;
                        }
                    }
                }
                if(changed){
                    for(let prop of props){
                        let v = prop.value;
                        if(typeof(v)!="undefined"){
                            this.selectedComponent.props[prop.prop] = v;
                        }
                    }
                    this.commonDoBefore(this);
                    this.commonDoAfter(this);
                    this.createPageView();

                    console.log("changed",props);
                }
                
            }
            this.lastPropComponent = this.selectedComponent;

            this.oldProps = props.map((item)=>{
                return {...item};
            });
            
        },{
            deep: true
        });
        this.$watch('tabs', (tabs)=>{
            let vm = this;
        },{
            deep:true
        })
    },
    methods: {
        complete(cm, pred){
            var cur = cm.getCursor();
            if (!pred || pred()) setTimeout(function() {
              if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
            }, 100);
            return "CodeMirror.Pass";
        },
        init(){
            this.getDetail();
            if($(".cursor").length==0){
                this.cursor.el = $("<div class='cursor'></div>");
                this.cursor.el.appendTo("body");
            }else{
                this.cursor.el = $(".cursor");  
            }
            
            this.bindEvent();
        },
        //获取组件
        getCom(id){
            for(let com of this.allcoms){
                if(com.id==id){
                    return com;
                }
            }
            for(let com of this.allcoms){
                if(com.enname==id){
                    return com;
                }
            }
            return null;
        },
        //获取组件
        getComByName(name){
            for(let com of this.allcoms){
                if(com.name==name){
                    return com;
                }
            }
            return null;
        },
        dblclickCom(com){
            window.open(`../../basiccom/detail/${com.id}`);
        },
        openPropEdit(prop){
            let vm = this.yiiModal({propValue:prop.value,title:prop.name}, Vue.extend(require('../../components/propEdit/propEdit.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            //监听确认事件
            vm.$on('confirm', (value)=>{
                prop.value = value;
                vm.close();
            })
        },
        clickCom(com){
            let vm = this.yiiModal({}, Vue.extend(require('../../components/cominsert/cominsert.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            //监听确认事件
            vm.$on('confirm', (position)=>{
                let props = {};
                this.cursor.position = position;
                this.cursor.component = this.selectedComponent;

                this.insertDeal(com);
                vm.close();
            })
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/page/get", {
                id:this.pageid
            }).then((response) => {
                let page = response.data.data ? response.data.data : {};
                this.initPage(page);
            });
        },
        //初始化页面
        initPage(page){
            let vm = this;
            function digui(cs,p){
                cs.forEach(function(c,i){
                    c.id = vm.getId();

                    let com = vm.getCom(c.name);

                    c.name = com?com.enname:c.name;
                    c.expand=true;
                    if(c.name=="router-link"){
                        c.title="路由链接";
                    }
                    if(com){ 
                        c.title = com.name;
                    }
                    if(p){
                        c.parent = p;
                    }

                    if(c.children){
                        digui(c.children,c);
                    }
                })
            }

            if(!page.content){
                page.content={name:"page",title:"页面",expand:true};
                page.content.id = this.getId();
            }else {
                page.content.children = page.content.children || [];
                page.content.id = this.getId();
                page.content.title="页面";
                page.content.expand=true;
                digui(page.content.children,page.content);
            }


            this.page = page;
            this.styleContent = this.page.styleContent || "";
            this.viewModelContent = this.page.viewModelContent || "{\n}";
            this.viewModel = eval(`(${this.viewModelContent})`);

            this.createPageView(true);
        },
        //设置编辑器的代码
        setEditorCode(id,code){
            
            // //行数
            // let lines = code.split("\n");

            // for(let i=0;i<lines.length;i++){
            //     let line = lines[i];
            //     line = line.replace(/\s/g,"&nbsp;");
            //     let ele = $(`<div class="line"><div class="info"></div><div class="no">${i+1}</div><div class="code">${line}</div></div>`);
            //     ele.appendTo($("#"+id));
            // }
        },
        //获取像素值
        getPxValue(val){
            if(val){
                if(/[\w+]*px/.test()){
                    return val;
                }else if(/[\w+]*%/.test()){
                    return val;
                }else{
                    return val+"px";
                }
            }
            return val;
        },
        //递归拷贝
        diguiCopy(cs){
            let newcs=[];
            cs.forEach((c,i)=>{
                let newc = {};
                newc.name = c.name;
                newc.props = c.props;
                if(c.columns){
                    newc.columns = this.diguiCopy(c.columns);
                }
                if(c.rows){
                    newc.rows = this.diguiCopy(c.rows);
                }
                if(c.cells){
                    newc.cells = this.diguiCopy(c.cells);
                }
                if(c.children){
                    newc.children = this.diguiCopy(c.children);
                }
                newcs.push(newc);
            })
            return newcs;
        },
        //保存页面内容
        savePageContent(){
            let saveContent = {name:this.page.content.name};
            
            if(this.page.content.children){
                let newChildren = this.diguiCopy(this.page.content.children);
                saveContent.children = newChildren;
            }
            if(!this.page.content || !this.page.content.children || this.page.content.children.length==0){
                //过滤掉没有任何组件的保存
                //return;
            }
            this.$http.post("/casion/page/saveContent", {
                id:this.pageid,
                project:this.project.id,
                content:saveContent,
                createuser:userinfo.id,
                createusername:userinfo.nickname
            }).then((response) => {
                
            });
        },
        //绑定事件
        bindEvent(){
            let vm = this;
            $(".components .com,.biz-components .biz-com").off("dragstart");
            $(".components .com,.biz-components .biz-com").off("click");

            $(".components .com,.biz-components .biz-com").on("click",function(event){
                let cid = $(this).attr("cid");
                vm.allcoms.forEach((com,index)=>{
                    if(com.id==cid){
                        vm.clickCom(com);
                    }
                });
            });

            $(".components .com,.biz-components .biz-com").on("dragstart",function(event){
                let cid = $(this).attr("cid");
                console.log("allcoms",vm.allcoms,cid);
                vm.allcoms.forEach((com,index)=>{
                    if(com.id==cid){
                        vm.dragType = 1;
                        vm.dragBasiccom = com;
                    }
                });
                vm.dragBasiccom.showTip=false;
                window.setTimeout(function(){
                    vm.showBasiccomponentsAll = false;
                    vm.showBizcomponentsAll = false;
                },100);
                
                event.originalEvent.dataTransfer.setData("id",vm.dragBasiccom.id);
            });


            $(".components .com").on("dragend",function(event){
                $(".inner-insert").removeClass("inner-insert");
            });
            $("body").on("keydown",(event)=>{
                if(this.mode==1){
                    if( event.keyCode == 90 && (event.metaKey || event.ctrlKey)){
                        //回退
                        this.backComponent();
                    }
                    if( event.keyCode == 89 && (event.metaKey || event.ctrlKey)){
                        //前进
                        this.aheadComponent();
                    }
                    if( event.keyCode == 83 && (event.metaKey || event.ctrlKey)){
                        //保存
                        this.savePageContent();
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
                
            });
        },
        //恢复页面
        recoverPage(pageversion){
            
            if(pageversion.content.startsWith("\"")){
                pageversion.content=pageversion.content.substring(1,pageversion.content.length-1);
            }
            this.page.content=eval(`(${pageversion.content})`);
            //this.styleContent=eval(`(${pageversion.styleContent})`);
            //this.viewModelContent=eval(`(${pageversion.viewModelContent})`);
            this.initPage(this.page);
        },
        //获取组件的id
        getId(){
            this.idindex = this.idindex+1;
            return "c"+(this.idindex);
        },
        back(){
            this.$router.push("../list");
        },
        //创建组件树
        createComTree(){
            let treeNodes = [];
            let vm = this;
            let rootNode = {name:"page",children:[],expand:true,id:this.page.content.id,propValues:"",nodeProps:[],props:[]};
            function digui(components,parentNode){
                for(let component of components){
                    component.props = component.props || [];
                    let com = vm.getCom(component.name);
                    let title = com.enname;
                    let props = component.props;
                    let nodeProps = [];
                    let propValues = "";
                    for(let key in component.props){
                        let v = component.props[key];
                        if(v!=""){
                            nodeProps.push({name:key,value:v});
                            propValues = `${propValues?propValues+" ":""}${key}="${v}"`;
                        }
                    }
                    let node = {name:title,children:[],expand:true,id:component.id,nodeProps:nodeProps,propValues:propValues,props:component.props,parent:parentNode};
                    parentNode.children.push(node);
                    if(component.children){
                        digui(component.children,node);
                    }
                }
            }
            treeNodes.push(rootNode);
            digui(this.page.content.children,rootNode);

            this.treeComponents = treeNodes;
        },
        clickTab(tab,index){
            this.tabs.forEach(function(item,i){
                item.selected=false;
            });
            this.tabSelectedIndex = index;
            tab.selected=true;
            if(index==1){
                this.createComTree();
            }
        },
        clickPropTab(tab,index){
            this.propTabs.forEach(function(item,i){
                item.selected=false;
            });
            tab.selected = true;
            this.createProps(this.selectedComponent);
        },
        //重置页面数据
        resetPage(){
            this.cursor={
                el:this.cursor.el,
                ...defaultCursor
            };
            //this.selectedComponent = null;
            $("#view").children().remove();
            $(`<div id="viewMount"></div>`).appendTo($("#view"));
        },
        //获取所有的组件-返回array
        getComponents(){
            let list = [];
            function digui(cs){
                cs.forEach((c,i)=>{
                    if(c.children){
                        digui(c.children);
                    }
                    list.push(c);
                })
            }
            if(this.page.content){
                list.push(this.page.content);
                if(this.page.content.children){
                    digui(this.page.content.children);
                }
            }
            return list;
        },
        getComponentById(id){
            let list = this.getComponents();
            for(let component of list){
                if(component.id==id){
                    return component;
                }
            }
            return null;
        },
        clickMobile(mobile){
            this.selectMobile.selected = false;
            mobile.selected=true;
            this.showMobileDrop = false;
        },
        stylecodeChange(){
            let editor =  this.$refs.styleEditor.editor;
            this.styleContent = editor.getValue();
            $("#pageStyle").remove();
            $(`<style id="pageStyle" type="text/css">${this.styleContent}</style>`).appendTo($("head"));
            if(this.styleContent){
                this.$http.post("/casion/page/saveStyleContent", {
                    id:this.pageid,
                    project:this.project.id,
                    styleContent:this.styleContent || "",
                    createuser:userinfo.id,
                    createusername:userinfo.nickname
                }).then((response) => {
                    
                });
            }
        },
        viewmodecodeChange(){
            let editor =  this.$refs.viewmodeEditor.editor;
            this.viewModelContent = editor.getValue();

            this.viewModel = eval(`(${this.viewModelContent})`);
            if(this.viewModelContent){
                this.$http.post("/casion/page/saveViewModelContent", {
                    id:this.pageid,
                    project:this.project.id,
                    viewModelContent:this.viewModelContent,
                    createuser:userinfo.id,
                    createusername:userinfo.nickname
                }).then((response) => {
                    
                });
            }
        },
        //创建页面视图
        createPageView(unsave){
            this.errors = [];
            this.resetPage();
            let vm = this;
            if(this.page.content){
                let ehtml = this.createComponent(this.page.content);
                console.log("ehtml",ehtml);
                let viewModelContent = this.viewModelContent;
                let replace = this.projectconfig.replace;
                if(replace){
                    for(let r of replace){
                        let from = r.from;
                        let type = typeof(r.to);
                        let ro;
                        if(type=="object"){
                            ro = r.to.rd;
                        }else{
                            ro = r.to;
                        }
                        let re = new RegExp(from,["g"]) ;
                        viewModelContent = viewModelContent.replace(re,ro);
                        ehtml = ehtml.replace(re,ro);
                    }
                }
                let viewModel =eval(`(${viewModelContent})`);
                if(viewModel.mounted){
                    delete viewModel.mounted;
                }
                if(viewModel.created){
                    delete viewModel.created;
                }
                if(viewModel.computed){
                    delete viewModel.computed;
                }
                if(viewModel.beforeCreate){
                    delete viewModel.beforeCreate;
                } 
                
                let vueObj = {
                    ...viewModel,
                    mixins:this.mixinsObj,
                    el:"#viewMount",
                    beforeCreate(){
                        this.$nextTick(function(){
                            if($("#viewMount").length==0){
                                //渲染成功才保存
                                if(!unsave){
                                    vm.savePageContent();
                                }
                            }
                            let list = vm.getComponents();
                            for(let i=0;i<list.length;i++){
                                let component = list[i];
                                component.el = $(`#${component.id}`);
                                component.el.attr("tabindex",vm.tabindex++);
                                vm.bindComponentEvent(component);
                                if(vm.selectedComponent && vm.selectedComponent.id==component.id){
                                    vm.selectComponent(component);
                                }
                            }
                        });
                    },
                    renderError (h, err) {
                        return h('pre', { style: { color: 'red' }}, err.stack)
                    },
                    errorCaptured:function(err, vm, info){
                        console.error("errorCaptured",err);
                        return false;
                    },
                    template:ehtml
                };

                vueObj.components={};
                let allcomsStylecode = "";
                for(let basiccom of this.allcoms){
                    if(basiccom.enname=="router-view"){
                        continue;
                    }
                    let viewModel =eval(`(${basiccom.jscode})`);
                    viewModel.mixins=this.mixinsObj;
                    let component = {
                        ...viewModel,
                        template:basiccom.viewcode
                    }
                    Vue.component(basiccom.enname,component);

                    allcomsStylecode= allcomsStylecode+"\n"+basiccom.stylecode;

                }


                let cocsscontent = "";
                for(let co of this.basiccomcos){
                    if(co.csscontent){
                        cocsscontent = `${cocsscontent}\n${co.csscontent}`;
                    }
                }

                if(this.project.cssconfig){
                    cocsscontent = `${cocsscontent}\n${this.project.cssconfig}`;
                }



                let cocsscontents = `:root\{${cocsscontent}\}`;

                
                postcss([precss,autoprefixer]).process(cocsscontents+allcomsStylecode, {}).then( (result) => {
                    $("#allcomsStylecode").remove();
                    $(`<style id="allcomsStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
                })

                
                // Vue.config.errorHandler = function (err, vm, info) {
                //     console.log("3333");
                // } 
                try{
                    let vue = new Vue(vueObj);
                    console.log("vue======",this.vue);

                }catch(e){
                    console.error("!!!!error",e);
                }
                

                // if(e){
                //     //$("#view").append(e);
                // }
            }
        },
        getPageByName(name){
            for(let page of this.pages){
                if(page.name==name){
                    return page;
                }
            }
            return null;
        },
        openSelTemplate(){
            if(!this.selectedComponent){
                return;
            }
            //存在模版
            //let vm = this.yiiModal({project:this.project.id}, Vue.extend(require('../../components/templatesel/templatesel.vue')));
            // 监听子组件自定义事件
            vm.$on('close', (v)=>{

            })
            let vue = this;
            //监听确认事件
            vm.$on('confirm', (templateHtml,templateJs,templateCss)=>{
                
                let viewModelContent = this.viewModelContent;
                
                let dataExp = /data\([^\{]*\)[^\{]*\{[^\{]*return[^\{]*\{/;

                if(templateJs.match(dataExp) && !viewModelContent.match(dataExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义data，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    return;
                }
                viewModelContent = this.insertTemplatejsStr(dataExp,viewModelContent,templateJs);

                let methodsExp = /methods:[^\{]*\{/;
                if(templateJs.match(methodsExp) && !viewModelContent.match(methodsExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义methods，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    vm.close();
                    return;
                }
               
                viewModelContent = this.insertTemplatejsStr(methodsExp,viewModelContent,templateJs);

                let mountedExp = /mounted\([^\{]*\)[^\{]*\{/;
                if(templateJs.match(mountedExp) && !viewModelContent.match(mountedExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义mounted，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    vm.close();
                    return;
                }
                 
                viewModelContent = this.insertTemplatejsStr(mountedExp,viewModelContent,templateJs);


                let createdExp = /created\([^\{]*\)[^\{]*\{/;
                if(templateJs.match(createdExp) && !viewModelContent.match(createdExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义created，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    vm.close();
                    return;
                }

                viewModelContent = this.insertTemplatejsStr(createdExp,viewModelContent,templateJs);

                let beforeCreateExp = /beforeCreate\([^\{]*\)[^\{]*\{/;
                if(templateJs.match(beforeCreateExp) && !viewModelContent.match(beforeCreateExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义beforeCreate，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    return;
                }
                
                viewModelContent = this.insertTemplatejsStr(beforeCreateExp,viewModelContent,templateJs);
                
                let watchExp = /watch:[^\{]*\{/;
                if(templateJs.match(watchExp) && !viewModelContent.match(watchExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义watch，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    vm.close();
                    return;
                }
                viewModelContent = this.insertTemplatejsStr(watchExp,viewModelContent,templateJs);

                let computedExp = /computed:[^\{]*\{/;
                if(templateJs.match(computedExp) && !viewModelContent.match(computedExp)){
                    this.yiiTips({
                      type: "error", 
                      message: "视图模型未定义computed，请先定义!",
                      duration:3000, 
                      closehandler(el){console.log(el)}
                    });
                    vm.close();
                    return;
                }

                viewModelContent = this.insertTemplatejsStr(computedExp,viewModelContent,templateJs);

                viewModelContent = js_beautify(viewModelContent,{
                    "indent_size": 4,
                    "indent_char": " ",
                });

                this.viewModelContent = viewModelContent;

                let component = Utils.domJson.domToJson(templateHtml,vue.getId,true);;
                
                component.parent=this.selectedComponent;
                this.selectedComponent.children = this.selectedComponent.children || [];
                this.selectedComponent.children.push(component);

                this.createPageView();
                
                vm.close();
            })
        },
        //插入模版js的字符串
        insertTemplatejsStr(regExp,viewModelContent,templateJs){
            let viewModelSuffix = viewModelContent.match(regExp);
            if(viewModelSuffix){

                viewModelSuffix = viewModelSuffix[0];
            }else{
                return viewModelContent;
            }

            


            let viewModelContentWrapper = this.stringPositionWrapper(viewModelContent,viewModelSuffix,"{","}");
            if(viewModelContentWrapper.startIndex==-1 || viewModelContentWrapper.endIndex==-1){
                return viewModelContent;
            }
            let viewModelFindContent = viewModelContentWrapper.content;

            let templateSuffix = templateJs.match(regExp);
            if(templateSuffix){
                templateSuffix = templateSuffix[0];
            }else{
                return viewModelContent;
            }



            let templateContentWrapper = this.stringPositionWrapper(templateJs,templateSuffix,"{","}");
            let templateContent = templateContentWrapper.content;

            

            if(viewModelFindContent.trim()!="" && templateContent.trim()!=""){
                templateContent=","+templateContent;
                viewModelContent = this.insertStr(viewModelContent,viewModelContentWrapper.endIndex,templateContent);
                return viewModelContent;
            }else if(viewModelFindContent.trim()=="" ){
                viewModelContent = this.insertStr(viewModelContent,viewModelContentWrapper.endIndex,templateContent);
                return viewModelContent;
            }
            
        },
        //字符串位置信息封装
        stringPositionWrapper(str,contentSuff,specialCharLeft,specialCharRight){
            let startIndex =str.indexOf(contentSuff)+contentSuff.length;
            let leaveContent = str.substring(startIndex);
            let endIndex = startIndex+this.findKuoHaoPosition(leaveContent,specialCharLeft,specialCharRight);
            let content = str.substring(startIndex,endIndex);
            return {startIndex:startIndex,endIndex:endIndex,content:content};
        },
        //在指定位置插入字符串
        insertStr(str,index,insert){
            let left =str.substring(0,index);
            let right =str.substring(index);
            
            return `${left}${insert}${right}`;
        },
        //找到语法匹配的内容，比如{{{aaaaa}}},找到aaaaaa
        findKuoHaoPosition(content,specialCharLeft,specialCharRight){
            let length = content.length;
            let leftKuohaoStack =0; 
            for(let i=0;i<length;i++){
                let char = content[i];
                if(char==specialCharLeft){
                    leftKuohaoStack ++;
                }else if(char==specialCharRight){
                    if(leftKuohaoStack==0){
                        return i;
                    }else{
                        leftKuohaoStack --;
                    }
                }
            }

            return -1;
        },
        //创建一个组件
        createComponent(component){
            let name = component.name;
            let el = null;
            switch(name){
                //页面
                case "page":{
                    name = "yi-page";
                    break;
                }
                default:{
                    let com = this.getCom(name);
                    if(com&&com.type==5){
                        //路由
                        name = "div style='width:100%;height:100%'";
                    }
                }
            }
            if(!name){
                return "";
            }
            el = `<${name} class="edit-component"`;
            let childrenDefine=null;
            if(el){
                for(let key in component.props){
                    if(key=="v-model"){
                        let v = component.props[key];
                        if(this.viewModel.data){
                            let data = this.viewModel.data();
                            try{
                                eval(`data.${v}`)

                            }catch(e){
                                continue;
                            }
                        }else{
                            continue;
                        }
                    }
                    if(key=="v-for" || key=="v-if"){
                        continue;
                    }
                    if(key=="childrenDefine"){
                        childrenDefine = component.props[key];
                    }else{
                        let v = component.props[key];
                        if(v==="true" || v==="false" || v===true || v===false){
                            //绑定数据
                            if(this.viewModel.data){
                                let data = this.viewModel.data();
                                if(data[v]){
                                    key = this.tuofengCast(key);
                                    el = el+" :"+key+"=\""+v+"\"";
                                }else{
                                    this.errors.push("数据绑定错误[数据不存在]");
                                }
                            }
                            
                        }else if(/{{(.*)}}/.test(v)){
                            //绑定数据
                            let vc = v.replace(/{{(.*)}}/,"$1");
                            vc = vc.replace(/\s/,"");
                            if(this.viewModel.data){
                                let data = this.viewModel.data();
                                data = {...data,...this.viewModel.methods};
                                if(data[vc] || vc=="true" || vc=="false"){
                                    key = this.tuofengCast(key);
                                    el = el+" :"+key+"=\""+vc+"\"";

                                }else{
                                    this.errors.push("数据绑定错误[数据不存在]");
                                }
                            }
                            
                        }else{
                            let isEvent = false;
                            let basiccom = this.getCom(component.name);
                            if(basiccom){
                                let p = null;
                                for(let prop of basiccom.props){
                                    if(prop.prop===key){
                                        p = prop;
                                    }
                                }
                                
                                if(p && p.propType==="event"){
                                    if(v && v!=""){
                                        let methods = this.viewModel.methods;

                                        if(methods){
                                            let methodname = v.replace(/\(.*\)/,"");
                                            if(methods[methodname]){
                                                el = el+" v-on:"+key+"=\""+v+"\"";
                                            }else{
                                                this.errors.push("事件绑定错误[事件定义不存在]"); 
                                            }
                                        }
                                        continue;
                                    }
                                }
                            }

                            if(v!=""){
                                key = this.tuofengCast(key);
                                el = el+" "+key+"=\""+v+"\"";
                            }
                            
                            
                            
                        }
                    }
                    
                }

                el = el+" id=\""+component.id+"\"";
                el = el + ">";

            }
            if(!childrenDefine){
                if(component.children){
                    for(let i=0;i<component.children.length;i++){
                        let child = component.children[i];
                        let elc = this.createComponent(child);
                        el = el+elc;
                    }
                }
            }else{
               el = el+childrenDefine; 
            }
            
            el = el +`</${name}>`;

            return el;
        },
        //绑定组件的事件
        bindComponentEvent(component){
            let el = component.el;
            //可以在组件前插入
            let beforeable=false;
            //可以在组件后插入
            let afterable=false;
            //可以在组件内部插入
            let innerable=false;

            //组件的配置信息
            let config={};
            if(component.name!="page"){
                let com = this.getCom(component.name);
                if(!com){
                    return;
                }
                config = com.config;
                
            }else{
                config={
                    insert:{
                        inner:true,
                        before:false,
                        after:false
                    }
                }
            }
            
            innerable = config.insert.inner;
            beforeable = config.insert.before;
            afterable =  config.insert.after;
            
            el.on("click",(event)=>{
                if(this.mode==1){
                    this.selectComponent(component);
                    event.stopPropagation();
                    event.preventDefault();
                }
            });

            el.on("keyup",(event)=>{
                
            });
            el.on("mouseenter",(event)=>{
                el.addClass("component-hover");
                event.stopPropagation();
            });
            el.on("mouseleave",(event)=>{
                el.removeClass("component-hover");
                event.stopPropagation();
            });

            el.on("keydown",(event)=>{  
                if(this.mode==1){
                   if(event.keyCode == 8){
                        //删除
                        this.deleteComponent();
                    }
                    if( event.keyCode == 67 && (event.metaKey || event.ctrlKey) && this.selectedComponent){
                        //复制
                        this.copyComponent = this.deepCopyComponent(this.selectedComponent);
                    }else if( event.keyCode == 86 && (event.metaKey || event.ctrlKey) && this.selectedComponent){
                        //黏贴
                        if(this.selectedComponent.name=="cell" || this.selectedComponent.name=="page"){
                            this.cursor.position=1;
                            this.cursor.component = this.selectedComponent;
                            this.createComponent(this.copyComponent);
                            this.insertComponent(this.copyComponent);
                            //this.savePageContent();
                        }else{
                             this.yiiTips({type: "error", message: "只能插入到页面组件、单元格组件!"});
                        }
                    }

                    event.originalEvent.stopPropagation();
                    event.originalEvent.preventDefault();
                }
            });

            //左右插入鼠标移动距离占比
            let leftRightWidth = 1/4;
            if(!innerable){
                leftRightWidth = 1/2;
            }
            el.attr("draggable","true");

            el.on("dragstart",(event)=>{
                this.dragType = 2;
                this.dragBasiccom = component;
                event.stopPropagation();
            });
            el.on("dragover",(event)=>{
                //必须在dragover中执行preventDefault否则不会执行drop事件
                event.originalEvent.preventDefault();
            });
            el.on("dragenter",(event)=>{

                let mouseX = event.originalEvent.clientX;
                let mouseY = event.originalEvent.clientY;
                let elX = el.offset().left;
                let elY = el.offset().top;
                let elWidth = el.outerWidth();
                let elHeight = el.outerHeight();
                
                let cursorY = elY+(elHeight-this.cursor.el.height())/2;
                if(mouseX < (elX+elWidth*leftRightWidth) && beforeable){
                    //左边
                    $(".inner-insert").removeClass("inner-insert");
                    this.cursor.el.show();
                    this.cursor.position = 2;
                    this.cursor.el.css("left",elX-4);
                    this.cursor.el.css("top",cursorY);
                }else if(mouseX > (elX+elWidth*(1-leftRightWidth)) && afterable){
                    //右边
                    $(".inner-insert").removeClass("inner-insert");
                    this.cursor.el.show();
                    this.cursor.position = 3;
                    this.cursor.el.css("left",elX+elWidth+2);
                    this.cursor.el.css("top",cursorY);
                }else if(innerable){
                    //中间
                    this.cursor.el.hide();
                    $(".inner-insert").removeClass("inner-insert");
                    
                    component.el.addClass("inner-insert");
                    this.cursor.position = 1;
                    // this.cursor.el.css("left",elX+elWidth/2+1);
                    // this.cursor.el.css("top",cursorY);
                }
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
                this.cursor.component = component;
            });

            el.on("dragleave",(event)=>{
                console.log("dragleave");
                this.cursor.component = null;
                this.cursor.el.hide();
                component.el.removeClass("inner-insert");
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
            })


            el.on("drop",(event)=>{
                console.log("drop");
                if(this.dragType===1){
                    this.insertDeal(this.dragBasiccom,event);
                }else if(this.dragType===2){
                    
                    this.moveComponent([this.dragBasiccom],component,this.cursor.position);
                }
                event.originalEvent.stopPropagation();
            })
        },
        //插入处理
        insertDeal(basiccom,event){
            let config = basiccom.config;

            if(config.template&&config.template.html){
                $("#template-mount-wrapper").remove();
                $(`<div id="template-mount-wrapper"></div>`).appendTo($("body"));
                let ehtml = config.template.html;
                let style = config.template.style;
                let vueWrapper = config.template.js;
                let vm = this;
                console.log("ehtml==",ehtml,vueWrapper);


                vueWrapper.methods.confirmCallback=function(vue){
                    let com = vue.create();
                    console.log("com",com);
                    vm.insert(basiccom,com.props,com.children);
                };
                
                
                let vueObj = {
                    ...vueWrapper,
                    el:"#template-mount-wrapper",
                    template:ehtml,
                    renderError (h, err) {
                        return h('pre', { style: { color: 'red' }}, err.stack)
                    },
                    errorCaptured:function(err, vm, info){
                        console.log("errorCaptured");
                        return false;
                    }
                };
                if(style){
                     postcss([precss,autoprefixer]).process(style, {}).then( (result) => {
                        $("#templateStylecode").remove();
                        $(`<style id="templateStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
                    })
                }
                try{
                    let vue = new Vue(vueObj);
                }catch(e){
                    console.log("!!!!error");
                }
            }else if(config.template&&config.template.templates&&config.template.templates.length>0){
                //存在模版
                let vm = this.yiiModal({template:config.template,popSize:config.template.popSize}, Vue.extend(require('../../components/comtemplate/comtemplate.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{

                })
                //监听确认事件
                vm.$on('confirm', (template)=>{
                    if(this.cursor.component){
                        let children = this.deepCopy(template.children);
                        this.insert(basiccom,template.props,children);
                    }
                    vm.close();
                })
            }else if(config.props&&config.props.vals&&config.props.vals.length>0){
                //存在属性配置，创建弹窗，并传递参数
                let props = basiccom.props;
                let configProps= [];
                for(let p of config.props.vals){
                    for(let pr of props){
                        if(p==pr.prop){
                            configProps.push(pr);
                        }
                    }
                }
                let vm = this.yiiModal({configProps:configProps,popSize:config.props.popSize}, Vue.extend(require('../../components/comconfig/comconfig.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{

                })
                //监听确认事件
                vm.$on('confirm', (configProps)=>{
                    let props = {};
                    for(let p of configProps){
                        props[p.prop]=p.value;
                    }
                    let children = config.children;
                    let cs = [];
                    if(children){
                        let name = children.name;
                        let repeat = props[children.repeatProp];
                        let basiccom = this.getComByName(name);
                        for(let i=0;i<repeat;i++){
                            let obj = {
                                //组件标签名称
                                name:basiccom.id,
                                props:{},
                                title:basiccom.name,
                                id:this.getId()//元素id
                            };
                            cs.push(obj);
                        }
                    }
                    if(this.cursor.component){
                        this.insert(basiccom,props,cs);
                    }

                    vm.close();
                })
            }else{
                if(this.cursor.component){
                    this.insert(basiccom);
                }
            }

            this.cursor.el.hide();
            if(event){
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
            }
        },
        //深拷贝对象
        deepCopy(obj){
            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if(window.JSON){
                str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? 
                    cloneObj(obj[i]) : obj[i]; 
                }
            }
            return newobj;

        },
        createProps(component){
            let events=["click","dblclick","mouseover","mouseout","mouseenter","mouseleave","keyup","keydown"];
            if(component.name=="page"){
                this.props = [];
            }else{
                let basiccom = this.getCom(component.name);
                let newProps = [];
                if(!basiccom){
                    for(let key in component.props){
                        let v = component.props[key];
                        let newProp = {prop:key,name:key,value:v};
                        newProps.push(newProp);
                    }
                    this.props = newProps;
                    return ;
                }
                let props = basiccom.props;
                
                let copyProps=this.deepCopy(props);

                
                for(let prop of copyProps){
                    let v = component.props[prop.prop];
                    if(!prop.name){
                        continue;
                    }

                    if(this.propTabs[0].selected){
                        //属性
                        if(prop.propType!=="style" && prop.propType!=="event"){
                            newProps.push(prop);
                        }
                    }else if(this.propTabs[1].selected){
                        //样式
                        if(prop.propType==="style"){
                            newProps.push(prop);
                        }
                    }else if(this.propTabs[2].selected){
                        //事件
                        if(prop.propType==="event"){
                            newProps.push(prop);
                        }
                    }
                    if(!v){
                        //驼峰转字符串
                        let p = prop.prop.replace(/([A-Z])/g,"-$1").toLowerCase();
                        v = component.props[p];
                    }
                    if(!v){
                        //字符串转驼峰
                        let p = prop.prop.replace(/-(\w)/g, function(all, letter){
                             return letter.toUpperCase();
                        });
                        v = component.props[p];
                    }
                    let defaultValue = prop.default;

                    // if(v==="" || v===null || v===undefined && defaultValue){
                    //     console.log("defaultValue",defaultValue);
                    //     v = defaultValue;
                    // }
                    // if(v){
                        prop.value = v;
                    // }
                }
                this.props = newProps;
                
            }
        },
        //选择组件
        selectComponent(component){
            if(this.selectedComponent){
                this.selectedComponent.el.removeClass("component-sel");
            }
            this.$store.commit("setSelectedComponent",component);
            this.createProps(component);
            this.selectedComponent.el.addClass("component-sel");
            this.selectedComponent.el.focus();
            this.showBizcomponentsAll=false;
            this.showBasiccomponentsAll = false;
        },
        //删除选择的组件
        deleteComponent(){
            if(this.selectedComponent && this.selectedComponent.name!="page" && this.selectedComponent.name!="cell"){
                //深拷贝页面内容并放入历史栈
                this.deepCopyPageContent();
                let children =this.selectedComponent.parent.children;
                
                let index = children.indexOf(this.selectedComponent);
                children.splice(index,1);
                //this.savePageContent();
                this.createPageView();
            }
        },
        //撤销
        backComponent(){
            let content = this.popHistoryStack();
            if(content){
                this.page.content = content;
                this.createPageView();
                //this.savePageContent();
            }
        },
        //前进
        aheadComponent(){
            let content = this.popAheadStack();
            if(content){
                this.page.content = content;
                this.createPageView();
                //this.savePageContent();
            }
            
        },
        //深拷贝页面内容并放入历史栈
        deepCopyPageContent(){
            let newContent = {name:this.page.content.name};
            if(this.page.content.children){
                let newChildren = this.diguiCopy(this.page.content.children);
                newContent.children = newChildren;
            }
            this.pushHistoryStack(newContent);
        },
        //深拷贝一个组件
        deepCopyComponent(component){
            let newComponent = {name:component.name,props:{...component.props}};
            if(component.children){
                let newChildren = this.diguiCopy(component.children);
                newComponent.children = newChildren;
            }      
            return newComponent;      
        },
        //放入历史栈
        pushHistoryStack(content){
            this.historyStack.push(content);
            //清空前进栈
            this.aheadStack.splice(0,this.aheadStack.length);
        },
        //弹出历史栈
        popHistoryStack(){
            if(this.historyStack.length>0){
                //先将当前组件树放入前进栈
                this.aheadStack.push(this.page.content);
                return this.historyStack.splice(this.historyStack.length-1,1)[0];
            }
            return null;
        },
        //弹出前进栈
        popAheadStack(){
            if(this.aheadStack.length>0){
                //先将当前组件树放入历史栈
                this.historyStack.push(this.page.content);
                return this.aheadStack.splice(this.aheadStack.length-1,1)[0];
            }
            return null;
        },
        //驼峰转字符串
        tuofengCast(str){
            if(str){
                return str.replace(/([A-Z])/g,"-$1").toLowerCase();
            }
            return str;
        },
        //插入组件,同时在model和视图插入
        insertComponent(obj){
            this.page.content = this.page.content || [];
            if(!this.cursor.component){
                this.page.content.push(obj);
                $("#view").append(obj.el);
            }else{
                switch(this.cursor.position){
                    case 1:{
                        this.cursor.component.children=this.cursor.component.children||[];
                        this.cursor.component.children.push(obj);
                        obj.parent = this.cursor.component;
                        break;
                    }
                    case 2:{
                        let children = this.cursor.component.parent.children;
                        for(let i=0; i<children.length;i++){
                            let c = children[i];
                            if(c==this.cursor.component){
                                children.splice(i,0,obj);
                                obj.parent = this.cursor.component.parent;
                                break;
                            }
                        }
                        
                        break;
                    }
                    case 3:{
                        let children = this.cursor.component.parent.children;
                        for(let i=0; i<children.length;i++){
                            let c = children[i];
                            if(c==this.cursor.component){
                                children.splice(i+1,0,obj);
                                obj.parent = this.cursor.component.parent;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            this.createPageView();
        },
        //选择父级组件
        selectParent(){
            if(this.selectedComponent && this.selectedComponent.parent){
                this.selectedComponent.parent.el.focus();
                this.selectedComponent.parent.el.click();
            }
        },
        //界面拖拽后插入
        insert(basiccom,props,children){

            let obj = {
                //组件标签名称
                name:basiccom.enname,
                props:props||{},
                title:basiccom.name,
                children:children||[],
                expand:true,
                id:this.getId()//元素id
            };

            if(children){
                let vm = this;
                function digui(children,parent){
                    if(children){
                        for(let com of children){
                            com.parent = parent;
                            com.id = vm.getId();//元素id
                            com.expand = true;
                            let basiccom = vm.getCom(com.name);
                            if(!basiccom){
                                basiccom = vm.getComByName(com.name);
                                com.name = basiccom.id;
                                com.title=basiccom.name;
                            }else{
                                com.title=basiccom.name;
                            }
                            digui(com.children,com);
                        }
                    }
                    
                }
                digui(children,obj);
            }


            //深拷贝页面内容并放入历史栈
            this.deepCopyPageContent();
            this.insertComponent(obj);
        },
        hasValue(val){
            if(typeof(val)!="undefined"){
                return true;
            }else{
                return false;
            }
        },
        //单击模式按钮
        clickModeBtn(){
            this.mode = this.mode==1?2:1;
            if(this.selectedComponent){
                this.selectedComponent.el.removeClass("component-sel");
            }
        },
        //预览
        preview(){
            console.log("projectconfig",this.projectconfig);
            let devServer = this.projectconfig.devServer;
            if(devServer){
                this.yiiLoading.show();
                this.$http.post("/casion/project/run", {
                    id:this.project.id,
                }).then((response) => {
                    let url = "http://"+devServer.host+":"+devServer.port+"/"+this.project.enname;
                    window.open(url, '_blank');
                });
                
            }else{
                this.yiiTips({type: "error", message: "项目没有配置开发服务，请在项目配置中配置！"});
            }            
        },
        getProp(name,props){
            for(let prop of props){
                if(prop.prop==name){
                    return prop;
                }
            }
            return null;
        },
        getPropValLab(val,values){
            for(let v of values){
                if(v.val==val){
                    return v.lab;
                }
            }
            return null;
        },

        clickComTreeBtn(){
            this.showComTree = !this.showComTree;
            if(this.showComTree){
                //打开组件树
                let treeNodes = [];
                let vm = this;
                let rootNode = {name:"页面",children:[],expand:true,id:this.page.content.id,nodeProps:[]};
                function digui(components,parentNode){
                    if(!components){
                        return;
                    }
                    for(let component of components){
                        let com = vm.getCom(component.name);

                        let title = com?(com.name+" "):component.name;
                        let props = component.props;
                        let nodeProps = [];
                        if(com){
                            for(let key in component.props){
                                let v = component.props[key];
                                let prop =vm.getProp(key,com.props);
                                let pname = key;
                                if(prop){
                                    pname = prop.name;
                                }
                                if(v!=""){
                                    if(prop && prop.values){
                                        let vv = vm.getPropValLab(v,prop.values);
                                        if(vv){
                                            v = vv;
                                        }
                                    }
                                    nodeProps.push({name:pname,value:v});
                                }
                            }
                        }
                        
                        let node = {name:title,children:[],expand:true,id:component.id,nodeProps:nodeProps};
                        parentNode.children.push(node);
                        if(component.children){
                            digui(component.children,node);
                        }
                    }
                }
                treeNodes.push(rootNode);

                digui(this.page.content.children,rootNode);
                console.log("this.page.content",this.page.content);
                let yiiModal = this.yiiModal({treeComs:treeNodes,vmParent:this}, Vue.extend(require('../../components/comTreeModal/comTreeModal.vue')));
                // 监听子组件自定义事件
                yiiModal.$on('close', (v)=>{
                    
                })

            }
        },
        clickTreeComNode(node){
            let component = this.getComponentById(node.id);
            this.selectComponent(component);
        },
        moveComponent(source,to,position){
            to.children = to.children || [];
            function deleteComp(component){
                let children =component.parent.children;
                let index = children.indexOf(component);
                children.splice(index,1);
            }
            console.log("source",source,position);
            if(position==1){
                for(let i=0;i<source.length;i++){
                    let c = source[i];
                    deleteComp(c);
                    c.parent = to;
                    to.children.push(c);
                }
            }else if(position==2){
                let index = to.parent.children.indexOf(this.selectedComponent);
                let p = to.parent;
                for(let i=0;i<source.length;i++){
                    let c = source[i];
                    deleteComp(c);
                    c.parent = p;
                    to.children.splice(index+i,0,c);
                }
            }else if(position==3){
                let index = to.parent.children.indexOf(this.selectedComponent);
                let p = tto.parent;
                for(let i=0;i<source.length;i++){
                    let c = source[i];
                    deleteComp(c);
                    c.parent = p;
                    this.selectedComponent.children.splice(index+i+i,0,c);   
                }
            }
            this.createPageView();
        },
        move(){
            if(!this.moving){
                this.moveComponents.push(this.selectedComponent);
                this.moving = true;
            }else{
                let vm = this.yiiModal({}, Vue.extend(require('../../components/cominsert/cominsert.vue')));
                // 监听子组件自定义事件
                vm.$on('close', (v)=>{
                    this.moveComponents = [];
                })

                let vue = this;
                
                //监听确认事件
                vm.$on('confirm', (position)=>{
                    vue.moveComponent(this.moveComponents,this.selectedComponent,position);
                    
                    this.moveComponents=[];
                    vm.close();
                })

                this.moving = false;
            }
        }
    },
    filters:{
        getComponentName(val){
            let text = "";
            switch(val){
                case 'page':text = "页面";break;
                case 'layout':text = "布局";break;
                case 'row':text = "行";break;
                case 'cell':text = "单元格";break;
                case 'input':text = "输入框";break;
                case 'label':text = "文本";break;
                case 'table':text = "数据表";break;
                case 'column':text = "数据列";break;
                case 'button':text = "按钮";break;
            }
            return text;
        } 
    }
}
    