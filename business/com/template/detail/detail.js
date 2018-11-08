/**
 * Created by gaoyang on 2018/03/08.
 * @title 模版列表js
 */
import  {$} from 'jquery'
import Utils from 'utils';

const postcss = require('postcss');
const postcssJs = require('postcss-js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const babel = require("babel-standalone");
const vueJsx = require("babel-plugin-transform-vue-jsx");
babel.registerPlugin('vueJsx', vueJsx);
//默认的焦点对象
let defaultCursor={
    component:null,//组件
    position:1//相对于组件的位置,1:内部,2:左边,3:右边
};
export default{
    data(){
        return {
            componentName:"template-detail",
            //光标
            cursor:{
                el:null,
                ...defaultCursor
            },
            template:{
                "name":"",
                "viewContent":"",
                "cssContent":"",
                "jsContent":"",
                "image":"",
                "coid":"",
                "remark":""
            },
            tabs:[
                {
                    name:"预览",
                    selected:true
                },
                {
                    name:"生成模版代码",
                    selected:false
                }
            ],
            cssEditorOption:{
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
            jsContentEditorOption:{
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
            idindex:0,
            tabindex:0,
            treeComs:[],
            errors:[],
            //历史的组件操作栈
            historyStack:[],
            //前进栈
            aheadStack:[],
            //复制的组件
            copyComponent:null,
            basiccomco:null,
            dragBasiccom:null

        }
    },
    computed:{
        defaultProps:function(){
            return this.$store.state.defaultProps;
        },
        basiccoms:function(){
            return this.$store.state.project.basiccoms;
        },
        defaultUnProps:function(){
            return this.$store.state.defaultUnProps;
        },
        dealJscode:function(){
            return this.$store.state.dealJscode;
        },
        editVersion:function(){
            return this.$store.state.editVersion;
        }
    },
    components: {
        
    },
    watch: {
        editVersion:function(newValue){
            this.savePageContent();
        },
        "template.jsContent":function(newValue){

            this.$http.post("/casion/template/saveJsContent", {
                id:this.template.id,
                jsContent:this.template.jsContent,
                createuser:userinfo.id,
                createusername:userinfo.nickname
            }).then((response) => {
                
            });
        }
    },
    created(){

    },
    mounted() {
        this.getDetail();
        
    },
    methods: {
        createComTree(){
            //创建组件树
            let treeNodes = [];
            let vm = this;
            let rootNode = {name:"page",children:[],expand:true,id:this.template.viewContent.id,propValues:"",nodeProps:[],props:[]};
            function digui(components,parentNode){
                for(let component of components){
                    component.props = component.props || [];
                    let com = vm.getCom(component.name);
                    let title = com.enname+" ";
                    let props = component.props;
                    let nodeProps = [];
                    let propValues = "";
                    for(let key in component.props){
                        let v = component.props[key];
                        if(v!=""){
                            nodeProps.push({name:key,value:v});
                            propValues = `${propValues} ${key}="${v}"`;
                        }
                    }
                    let node = {name:title,children:[],expand:true,id:component.id,nodeProps:nodeProps,propValues:propValues,props:component.props};
                    parentNode.children.push(node);
                    if(component.children){
                        digui(component.children,node);
                    }
                }
            }
            treeNodes.push(rootNode);
            digui(this.template.viewContent.children,rootNode);
            this.treeComs = treeNodes;
        },
        complete(cm, pred){
            var cur = cm.getCursor();
            if (!pred || pred()) setTimeout(function() {
              if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
            }, 100);
            return "CodeMirror.Pass";
        },
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/template/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.template = response.data.data ? response.data.data : {};  
                this.getBasiccomco(this.template.coid,()=>{
                    this.init();
                });
                this.$store.commit("setTemplate",this.template);
            });     
        },
        //绑定事件
        bindEvent(){
            let vm = this;
            $(".components").on("dragstart",".com",function(event){
                let cid = $(this).attr("cid");
                vm.basiccoms.forEach((com,index)=>{
                    if(com.id==cid){
                        vm.dragBasiccom = com;
                    }
                });
                vm.dragBasiccom.showTip=false;
                event.originalEvent.dataTransfer.setData("id",vm.dragBasiccom.id);
            });
        },
        //获取组件的id
        getId(){
            this.idindex = this.idindex+1;
            return "c"+(this.idindex);
        },
        back(){
            this.$router.push("../list");
        },
        //获取组件库
        getBasiccomco(coid,callback){
            this.yiiLoading.show();
            this.$http.post("/casion/basiccomco/getAll", {
                id:coid
            }).then((response) => {
                this.basiccomco = response.data.data ? response.data.data : {};  
                let basiccoms = this.basiccomco.coms;
                try{
                    for(let basiccom of basiccoms){
                        let jscode = basiccom.jscode;
                        basiccom.showTip=false;
                        if(!jscode){
                            continue;
                        }
                        jscode = this.dealJscode(jscode,babel);
                        basiccom.jscode = jscode;
                        let viewModel =eval(`(${jscode})`);
                        basiccom.props = [];
                        basiccom.config = viewModel.config;
                        let props = viewModel.props;
                        //非props属性
                        let unProps = viewModel.unProps;

                        props = {...props};
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
                    }

                    this.$store.commit("setBasiccoms",basiccoms);
                }catch(e){
                    console.error(e);
                }
                if(callback){
                    callback();
                    
                }
            });    
        },
        init(){
            for(let basiccom of this.basiccoms){
                let jscode = basiccom.jscode;
                if(!jscode){
                    continue;
                }
                basiccom.jscode = this.dealJscode(jscode,babel);
                try{
                    let viewModel =eval(`(${basiccom.jscode})`);
                    basiccom.props = [];
                    basiccom.config = viewModel.config;
                    let props = viewModel.props;
                    //非props属性
                    let unProps = viewModel.unProps;

                    props = {...props};
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

            this.createPageView();
        },
        cssContentChange(){
            let editor =  this.$refs.cssContentEditor.editor;
            this.template.cssContent = editor.getValue();
        },
        jsContentChange(){
            let editor =  this.$refs.jsContentEditor.editor;
            this.template.jsContent = editor.getValue();
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
            if(this.template.viewContent){
                list.push(this.template.viewContent);
                if(this.template.viewContent.children){
                    digui(this.template.viewContent.children);
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
        clickTab(tab,index){
            this.tabs.forEach(function(item,i){
                item.selected=false;
            });
            this.tabSelectedIndex = index;
            tab.selected=true;
            if(index==0){
                this.createPageView();
            }else if(index==1){
                // this.createComTree();
                // let vm = this;
                // this.$nextTick(function(){
                //     let list = vm.getComponents();
                //     for(let i=0;i<list.length;i++){
                //         let component = list[i];
                //         component.el = $(`#${component.id}`);
                //         component.el.attr("tabindex",vm.tabindex++);
                //         vm.bindComponentEvent(component);
                //         if(vm.selectedComponent && vm.selectedComponent.id==component.id){
                //             vm.selectComponent(component);
                //         }
                //     }
                // })
            }
        },
         //获取组件
        getCom(id){
            for(let com of this.basiccoms){
                if(com.id==id || com.enname==id){
                    return com;
                }
            }
            return null;
        },
        //获取组件
        getComByName(name){
            for(let com of this.basiccoms){
                if(com.name==name){
                    return com;
                }
            }
            return null;
        },
        //创建一个组件
        createComponent(component){
            let name = component.name;
            let icon = "";
            let el = null;
            switch(name){
                //页面
                case "page":{
                    name = "yi-page";
                    break;
                }
                default:{
                    let com = this.getCom(name);
                    icon = com.icon;
                }
            }
            if(!name){
                return "";
            }
            el = `<${name} class="edit-component"`;
            let childrenDefine=null;
            if(el){
                for(let key in component.props){
                    if(key=="childrenDefine"){
                        childrenDefine = component.props[key];
                    }else{
                        let v = component.props[key];
                        if(/{{(.*)}}/.test(v)){
                            //绑定数据
                            let vc = v.replace(/{{(.*)}}/,"$1");
                            vc = vc.replace(/\s/,"");
                            let data = this.viewModel.data();
                            data = {...data,...this.viewModel.methods};
                            if(data[vc]){
                                el = el+" :"+key+"=\""+vc+"\"";

                            }else{
                                this.errors.push("数据绑定错误[数据不存在]");
                            }
                        }else{
                            let isEvent = false;
                            let events = ["click","dblclick","mouseover","mouseout","mouseenter","mouseleave"];
                            if(events.indexOf(key)!=-1){
                                if(v && v!=""){
                                    let methods = this.viewModel.methods;
                                    let methodname = v.replace(/\(.*\)/,"");
                                    if(methods[methodname]){
                                        //el = el+" v-on:"+key+"=\""+v+"\"";
                                    }else{
                                        this.errors.push("事件绑定错误[事件定义不存在]"); 
                                    }
                                }
                            }else{
                                if(v!=""){
                                    if(key=="borderBottom"){
                                        console.log("key///////");
                                    }
                                    el = el+" "+key+"=\""+v+"\"";
                                }
                            }
                            
                        }
                    }
                    
                }

                el = el;
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

            el.on("dragover",(event)=>{

                console.log("innerable",innerable);
                
                // if(this.cursor.component){
                //     this.cursor.component.el.removeClass("component-dragover");
                // }
                                
                // this.cursor.component.el.addClass("component-dragover");

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
                this.cursor.component = null;
                this.cursor.position=0;
                this.cursor.el.hide();
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
                el.removeClass("inner-insert");
            })

            el.on("drop",(event)=>{
                this.insertDeal(this.dragBasiccom,event);
                el.removeClass("inner-insert");
            })
        },
        //插入处理
        insertDeal(basiccom,event){
            let config = basiccom.config;
            if(config.template&&config.template.templates&&config.template.templates.length>0){
                //存在模版
                let vm = this.yiiModal({template:config.template,popSize:config.template.popSize}, Vue.extend(require('../../../components/comtemplate/comtemplate.vue')));
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
                let vm = this.yiiModal({configProps:configProps,popSize:config.props.popSize}, Vue.extend(require('../../../components/comconfig/comconfig.vue')));
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
        //选择组件
        selectComponent(component){
            if(this.selectedComponent){
                this.selectedComponent.el.removeClass("component-sel");
            }
            this.selectedComponent = component;
            if(component.name=="page"){
                this.props = [];
            }else{
                let props = this.getCom(component.name).props;
                this.props=this.deepCopy(props);
                for(let prop of this.props){
                    let v = component.props[prop.prop];
                    if(v){
                        prop.value = v;
                    }
                }
            }
            this.selectedComponent.el.addClass("component-sel");
        },
        //删除选择的组件
        deleteComponent(id){
            let components = this.getComponents();
            for(let component of components){
                if(component.id ==id){
                    if(component && component.name!="page"){
                        //深拷贝页面内容并放入历史栈
                        this.deepCopyPageContent();
                        let children =component.parent.children;
                        let index = children.indexOf(component);
                        children.splice(index,1);
                        this.savePageContent();
                        this.createPageView();
                        this.createComTree();
                    }
                    break;
                }
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
        //深拷贝页面内容并放入历史栈
        deepCopyPageContent(){
            let newContent = {name:this.template.viewContent.name};
            if(this.template.viewContent.children){
                let newChildren = this.diguiCopy(this.template.viewContent.children);
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
        //界面拖拽后插入
        insert(basiccom,props,children){
            let obj = {
                //组件标签名称
                name:basiccom.id,
                props:props||{},
                title:basiccom.name,
                children:children||[],
                id:this.getId()//元素id
            };

            if(children){
                let vm = this;
                function digui(children,parent){
                    if(children){
                        for(let com of children){
                            com.parent = parent;
                            com.id = vm.getId();//元素id
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
            this.savePageContent();
            this.createComTree();

            console.log("template",this.template);
        },
        //插入组件,同时在model和视图插入
        insertComponent(obj){
            this.template.viewContent = this.template.viewContent || [];
            if(!this.cursor.component){
                this.template.viewContent.push(obj);
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
            
        },
        //创建页面视图
        createPageView(){
            $("#preview-wrapper").children().remove();
            $(`<div id="template-preview"></div>`).appendTo($("#preview-wrapper"));

            this.errors = [];
            let vm = this;
            if(this.template.jsContent){

                let viewModel;
                let jsContent = this.template.jsContent;
                if(jsContent.indexOf("<script>")!=-1){
                    let jscode = jsContent.replace(/((.|\n)*)<script>((.|\n)*)<\/script>((.|\n)*)/g,"$3");
                    jscode = jscode.trim();
                    jscode = jscode.replace(/__getTableList\((\{.*\})\)/g,`this.$http.post("/casion/model/query",$1)`);
                    jscode = jscode.replace(/__getTableColumnList\((\{.*\})\)/g,`this.$http.post("/casion/modelitem/query",$1)`);

                    viewModel= eval(`(${jscode})`);
                }else{
                    viewModel={};
                }
                
               
                
                let vueWrapper = viewModel.vue;
                console.log("vueWrapper",vueWrapper);

                vueWrapper.methods.outData = viewModel.preview.data;
                let ehtml = vueWrapper.methods.createPage();
                let js = vueWrapper.methods.createJs();
                let css = vueWrapper.methods.createCss();
                let jsObj = eval(`(${js})`);
                delete jsObj.mounted;
                let vm = this;
                let vueObj = {
                    ...jsObj,
                    el:"#template-preview",
                    template:ehtml,
                    renderError (h, err) {
                        return h('pre', { style: { color: 'red' }}, err.stack)
                    },
                    errorCaptured:function(err, vm, info){
                        console.log("errorCaptured");
                        return false;
                    }
                };

                if(css){
                    postcss([precss,autoprefixer]).process(css, {}).then( (result) => {
                        $("#templateStylecode").remove();
                        $(`<style id="templateStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
                    })
                }
                


                
                vueObj.components={};
                let basiccomsStylecode = "";
                for(let basiccom of this.basiccoms){
                    if(basiccom.enname=="router-view"){
                        continue;
                    }
                    let viewModel =eval(`(${basiccom.jscode})`);
                    let component = {
                        ...viewModel,
                        template:basiccom.viewcode
                    }
                    vueObj.components[basiccom.enname||basiccom.id]=component;
                    basiccomsStylecode= basiccomsStylecode+"\n"+basiccom.stylecode;
                }

                let cocsscontent = `${this.basiccomco.csscontent}`;
                
                let cocsscontents = `:root\{${cocsscontent}\}`;
                console.log("css",cocsscontents+basiccomsStylecode);
                if(basiccomsStylecode){
                    postcss([precss,autoprefixer]).process(cocsscontents+basiccomsStylecode, {}).then( (result) => {
                        $("#basiccomsStylecode").remove();
                        $(`<style id="basiccomsStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
                    })
                }
                
                try{
                    let vue = new Vue(vueObj);

                }catch(e){
                    console.log("!!!!error");
                }
                

                // if(e){
                //     //$("#view").append(e);
                // }
            }
        },
        //保存页面内容
        savePageContent(){
            let viewContent = {name:this.template.viewContent.name};
            
            if(this.template.viewContent.children){
                let newChildren = this.diguiCopy(this.template.viewContent.children);
                viewContent.children = newChildren;
            }
            this.$http.post("/casion/template/saveViewContent", {
                id:this.template.id,
                viewContent:viewContent,
                createuser:userinfo.id,
                createusername:userinfo.nickname
            }).then((response) => {
                
            });
        },
        edit(){
            //发布项目
            this.$router.push({name:"template-modify",params:{id:this.$route.params.id}});
        },
        clickCom(com){
            let vm = this.yiiModal({}, Vue.extend(require('../../../components/cominsert/cominsert.vue')));
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
    }
}
    