/**
 * Created by gaoyang on 2018/01/09.
 * @title 页面文件夹列表js
 */
import  {$} from 'jquery'
import  {CodeMirror} from 'CodeMirror'
//默认的焦点对象
let defaultCursor={
    component:null,//组件
    position:1//相对于组件的位置,1:内部,2:左边,3:右边
};
export default{
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
            //选择的组件
            selectedComponent:null,
            //上一次修改属性的组件:
            lastPropComponent:null,
            tabindex:1,
            idindex:1,
            //样式内容
            styleContent:"",
            errors:[],
            viewModelContent:"",
            viewModelEditor:null,
            styleEditor:null,
            tabs:[
                {
                    name:"视图",
                    selected:true
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
            //属性定义
            propsDefines:(()=>{
                //默认的属性
                let defaultProps={
                    width:"",
                    height:"",
                    click:"",
                    dblclick:"",
                    mouseover:"",
                    mouseout:""
                }
                return {
                    layout:{
                        ...defaultProps
                    },
                    cell:{
                        ...defaultProps
                    },
                    input:{
                        placeholder:"",
                        value:"",
                        ...defaultProps
                    },
                    button:{
                        value:"",
                        ...defaultProps
                    },
                    label:{
                        value:"标签",
                        formatter:"",
                        ...defaultProps
                    },
                    table:{
                        ...defaultProps,
                        width:"100%",
                        data:[]
                    },
                    column:{
                        title:"列标题",
                        item:"",
                        formatter:"",
                        ...defaultProps
                    },
                    table:{
                        data:"",
                        ...defaultProps
                    }
                }
            })(),
            props:{
                width:""
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
    props:{
        "pageid":{
            type:String
        },
        "basiccoms":{
            type:Array
        }
    },
    components: {
        
    },
    watch: {
        // "props.width":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.width=newValue;
        //     this.selectedComponent.el.css("width",newValue);
        //     this.commonDoAfter(this);
        // },
        // "props.height":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.height=newValue;
        //     this.selectedComponent.el.css("height",newValue);
        //     this.commonDoAfter(this);
        // },
        // "props.title":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.title=newValue;
        //     this.commonDoAfter(this);
        //     this.createPageView();
        // },
        // "props.item":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.item=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.value":function(newValue,oldValue){
        //     console.log("props.value",newValue,oldValue);
        //     if(this.lastPropComponent==this.selectedComponent){
        //         console.log("props.value",newValue,oldValue);
        //         this.commonDoBefore(this);
        //         this.selectedComponent.props.value=newValue;
        //         this.commonDoAfter(this);
        //         this.createPageView();
        //     }
        //     this.lastPropComponent = this.selectedComponent;
        // },
        // "props.click":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.click=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.dblclick":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.dblclick=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.mouseover":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.mouseover=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.mouseout":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.mouseout=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.mouseenter":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.mouseenter=newValue;
        //     this.commonDoAfter(this);
        // },
        // "props.mouseleave":function(newValue,oldValue){
        //     this.commonDoBefore(this);
        //     this.selectedComponent.props.mouseleave=newValue;
        //     this.commonDoAfter(this);
        // },
        "styleContent":function(newValue,oldValue){
            $("#pageStyle").remove();
            $(`<style id="pageStyle" type="text/css">${this.styleContent}</style>`).appendTo($("head"));
            this.$http.post("/casion/page/saveStyleContent", {
                id:this.pageid,
                styleContent:this.styleContent
            }).then((response) => {
                
            });
        },
        "viewModelContent":function(newValue,oldValue){
            this.viewModel = eval(`(${this.viewModelContent})`);

            this.$http.post("/casion/page/saveViewModelContent", {
                id:this.pageid,
                viewModelContent:this.viewModelContent
            }).then((response) => {
                
            });
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
        this.$watch("pageid",(newvalue)=>{
            if(this.pageid){
                this.getDetail();
                this.cursor.el = $("<div class='cursor'></div>");
                this.cursor.el.appendTo("body");
                this.bindEvent();
            }
        });

        this.$watch('props', (props)=>{
            if(this.lastPropComponent==this.selectedComponent){
                this.commonDoBefore(this);
                this.commonDoAfter(this);
                this.createPageView();
            }
            this.lastPropComponent = this.selectedComponent;
        },{
            deep: true
        });
        this.$watch('tabs', (tabs)=>{
            let vm = this;
            if(tabs[1].selected){
                if(!this.styleEditor){
                    
                    let value = this.styleContent;
                    let editor = CodeMirror(document.getElementById("styleValue"),{
                        lineNumbers: true,
                        indentWithTabs:true,
                        value:value,
                        theme:"dracula",
                        extraKeys: {"Shift-Space": "autocomplete"}  //避免热键冲突  
                    });
                    editor.on('change', function() {
                        vm.styleContent = editor.getValue();
                    });
                    this.styleEditor = editor;
                } 
            }else if(tabs[2].selected){
                if(!this.viewModelEditor){
                    let value = this.viewModelContent;
                    let editor = CodeMirror(document.getElementById("viewModelValue"),{
                        lineNumbers: true,
                        indentWithTabs:true,
                        value:value,
                        theme:"dracula"
                    });
                    editor.on('change', function() {
                        vm.viewModelContent = editor.getValue();
                    });
                    this.viewModelEditor = editor;
                }
                
            }
            
        },{
            deep:true
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/page/get", {
                id:this.pageid
            }).then((response) => {
                let vm = this;
                this.page = response.data.data ? response.data.data : {};
                function digui(cs,p){

                    cs.forEach(function(c,i){
                        //原有的属性
                        c.id = vm.getId();
                        let oprops = c.props;
                        
                        //默认属性
                        let dprops = vm.propsDefines[c.name];
                        c.props = {...dprops,...oprops};
                        
                        if(p){
                            c.parent = p;
                        }
                        if(c.name=="layout"){
                            digui(c.rows,c);
                        }else if(c.name=="row"){
                            digui(c.cells,c);
                        }else if(c.name=="table"){
                            digui(c.columns,c);
                        }else if(c.children){
                            digui(c.children,c);
                        }
                    })
                }

                if(!this.page.content){
                    this.page.content={name:"page"};
                    this.page.content.id = this.getId();
                }else if(this.page.content.children){
                    this.page.content.id = this.getId();
                    digui(this.page.content.children,this.page.content);
                }

                this.styleContent = this.page.styleContent;
                this.viewModelContent = this.page.viewModelContent;
                this.viewModel = eval(`(${this.viewModelContent})`);

                this.createPageView();

            });
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
            this.$http.post("/casion/page/saveContent", {
                id:this.pageid,
                content:saveContent
            }).then((response) => {
                
            });
        },
        //绑定事件
        bindEvent(){
            $(".components .com").on("dragstart",function(event){
                event.originalEvent.dataTransfer.setData("name",$(this).attr("name"));
            });
            $("body").on("keydown",(event)=>{
                
                if( event.keyCode == 90 && (event.metaKey || event.ctrlKey)){
                    //回退
                    this.backComponent();
                }
                if( event.keyCode == 89 && (event.metaKey || event.ctrlKey)){
                    //前进
                    console.log("ahead");
                    this.aheadComponent();
                }


                
                // event.stopPropagation();
                // event.preventDefault();
            });
            // $("#viewModelValue").on("keydown",(event)=>{
            //     let el = $("#viewModelValue").get(0);
            //     if (event.keyCode == 9) {
            //         event.preventDefault();
            //         var indent = '    ';
            //         var start = el.selectionStart;
            //         var end = el.selectionEnd;
            //         var selected = window.getSelection().toString();
            //         selected = indent + selected.replace(/\n/g, '\n' + indent);
            //         el.value = el.value.substring(0, start) + selected
            //                 + el.value.substring(end);
            //         el.setSelectionRange(start + indent.length, start
            //                 + selected.length);
            //     }
            // })

            // $("#styleValue").on("keydown",(event)=>{
            //     let el = $("#styleValue").get(0);
            //     if (event.keyCode == 9) {
            //         event.preventDefault();
            //         var indent = '    ';
            //         var start = el.selectionStart;
            //         var end = el.selectionEnd;
            //         var selected = window.getSelection().toString();
            //         selected = indent + selected.replace(/\n/g, '\n' + indent);
            //         el.value = el.value.substring(0, start) + selected
            //                 + el.value.substring(end);
            //         el.setSelectionRange(start + indent.length, start
            //                 + selected.length);
            //     }
            // })
        },
        //获取组件的id
        getId(){
            return "c"+(this.idindex++);
        },
        back(){
            this.$router.push("../list");
        },
        clickTab(tab,index){
            this.tabs.forEach(function(item,i){
                item.selected=false;
            });
            this.tabSelectedIndex = index;
            tab.selected=true;
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
                    if(c.columns){
                        digui(c.columns);
                    }
                    if(c.rows){
                        digui(c.rows);
                    }
                    if(c.cells){
                        digui(c.cells);
                    }
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
        //创建页面视图
        createPageView(){
            this.errors = [];
            this.resetPage();
            let vm = this;
            
            if(this.page.content){
                let e = this.createComponent(this.page.content);
                console.log("ehtml",this.page.content);
                let ehtml = e.prop('outerHTML');
                let viewModel =eval(`(${this.viewModelContent})`);
                let vueObj = {
                    ...viewModel,
                    el:"#viewMount",
                    mounted(){

                        if(this.myMounted){
                            this.myMounted();
                        }
                        this.$nextTick(function(){
                            if($("#viewMount").length==0){
                                //渲染成功才保存
                                vm.savePageContent();
                            }
                            console.log("mounted");
                            let list = vm.getComponents();
                            for(let i=0;i<list.length;i++){
                                let component = list[i];
                                component.el = $(`#${component.id}`);
                                component.el.attr("tabindex",vm.tabindex++);
                                vm.bindComponentEvent(component);
                                if(vm.selectedComponent && vm.selectedComponent.id==component.id){
                                    console.log("selectedComponent",component);
                                    vm.selectComponent(component);
                                }
                            }
                        });
                    },
                    renderError (h, err) {
                        return h('pre', { style: { color: 'red' }}, err.stack)
                    },
                    errorCaptured:function(err, vm, info){
                        console.log("errorCaptured");
                        return false;
                    },
                    template:ehtml
                };
                vueObj.components={};
                for(let basiccom in this.basiccoms){
                    vueObj.components[basiccom.id]={
                        template:basiccom.viewcode
                    }
                }
                // Vue.config.errorHandler = function (err, vm, info) {
                //     console.log("3333");
                // } 
                console.log("vueObj",vueObj);
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
        //创建一个组件
        createComponent(component){
            let name = component.name;
            let el = null;
            switch(name){
                //页面
                case "page":{
                    el = $("<yi-page></yi-page>");
                    break;
                }
                //布局
                case "layout":{
                    let vm=new layout({
                        propsData:component.props
                    }).$mount();
                    el =  $(vm.$el);
                    for(let i=0;i<component.rows.length;i++){
                        let row = component.rows[i];
                        let elc = this.createComponent(row);
                        row.el = elc;
                        row.parent=component;
                        el.append(elc);
                    }
                    break;
                }
                case "row":{
                    let vm=new row({
                        propsData:component.props
                    }).$mount();
                    el =  $(vm.$el);
                    for(let i=0;i<component.cells.length;i++){
                        let cell = component.cells[i];
                        let elc = this.createComponent(cell);
                        cell.el = elc;
                        cell.parent=component;
                        el.append(elc);
                    }
                    break;
                }
                case "cell":{
                    let vm=new cell({
                        propsData:component.props
                    }).$mount();
                    el =  $(vm.$el);
                    
                    break;
                }
                //数据表
                case "table":{
                    el = $("<yi-table></yi-table>");
                    component.children = component.children ||[];
                    for(let i=0;i<component.columns.length;i++){
                        let column = component.columns[i];
                        let elc = this.createComponent(column);
                        column.parent=component;
                        el.append(elc);
                    }
                    break;
                }
                //数据列
                case "column":{
                    el =  $("<yi-column></yi-column>");
                    break;
                }
                case "input":{
                    el = $("<yi-input></yi-input>");
                    break;
                }
                case "button":{
                    el = $("<yi-button></yi-button>");
                    break;
                }
                case "label":{
                    el = $(`<yi-label></yi-label>`);
                    break;
                }
            }

            if(el){

                for(let key in component.props){
                    let v = component.props[key];
                    if(/{{(.*)}}/.test(v)){
                        //绑定数据
                        let vc = v.replace(/{{(.*)}}/,"$1");
                        vc = vc.replace(/\s/,"");
                        let data = this.viewModel.data();
                        data = {...data,...this.viewModel.methods};
                        console.log("data",data);
                        if(data[vc]){
                            el.attr(":"+key,vc);
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
                                console.log("methodname",methodname);
                                if(methods[methodname]){
                                    el.attr("v-on:"+key,v);
                                }else{
                                    
                                    this.errors.push("事件绑定错误[事件定义不存在]"); 
                                }
                                
                            }
                        }else{
                            el.attr(key,v);
                        }
                        
                    }
                }
                el.attr("id",component.id);
            }
            if(component.children){
                for(let i=0;i<component.children.length;i++){
                    let child = component.children[i];
                    let elc = this.createComponent(child);
                    el.append(elc);
                }
            }

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
            if(component.name=="page"){
                if(!component.children || component.children.length==0){
                    innerable = true;
                }
            }else if(component.name=="layout"){
                beforeable = true;
                afterable = true;
            }else if(component.name=="row"){
                
            }else if(component.name=="cell"){
                if(!component.children || component.children.length==0){
                    innerable = true;
                }
            }else if(component.name=="input"){
                beforeable = true;
                afterable = true;
            }else if(component.name=="label"){
                beforeable = true;
                afterable = true;
            }else if(component.name=="button"){
                beforeable = true;
                afterable = true;
            }else if(component.name=="table"){
                beforeable = true;
                afterable = true;
            }else if(component.name=="column"){
                // beforeable = true;
                // afterable = true;
            }

            el.on("click",(event)=>{
                this.selectComponent(component);
                event.stopPropagation();
            });

            el.on("keyup",(event)=>{
                
            });

            el.on("keydown",(event)=>{  
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
                        console.log("com",this.copyComponent);
                        this.insertComponent(this.copyComponent);
                        //this.savePageContent();
                    }else{
                         this.yiiTips({type: "error", message: "只能插入到页面组件、单元格组件!"});
                    }
                }

                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
                
            });

            
            
            el.on("dragover",(event)=>{
                this.cursor.component = component;
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
                this.cursor.el.show();
                let cursorY = elY+(elHeight-this.cursor.el.height())/2;
                if(mouseX < (elX+elWidth/4) && beforeable){
                    //左边
                    this.cursor.position = 2;
                    this.cursor.el.css("left",elX-4);
                    this.cursor.el.css("top",cursorY);
                }else if(mouseX > (elX+3*elWidth/4) && afterable){
                    //右边
                    this.cursor.position = 3;
                    this.cursor.el.css("left",elX+elWidth+2);
                    this.cursor.el.css("top",cursorY);
                }else if(innerable){
                    //中间
                    this.cursor.position = 1;
                    this.cursor.el.css("left",elX+elWidth/2+1);
                    this.cursor.el.css("top",cursorY);
                }
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();

            });

            el.on("dragleave",(event)=>{
                this.cursor.component = null;
                this.cursor.position=0;
                this.cursor.el.hide();
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
            })

            el.on("drop",(event)=>{
                
                if(this.cursor.component){
                    var name=event.originalEvent.dataTransfer.getData("name");

                    this.insert(name);
                }
                this.cursor.el.hide();
                event.originalEvent.stopPropagation();
                event.originalEvent.preventDefault();
            })
        },
        //选择组件
        selectComponent(component){
            if(this.selectedComponent){
                this.selectedComponent.el.removeClass("component-sel");
            }
            this.selectedComponent = component;
            this.props = component.props||{};
            this.selectedComponent.el.addClass("component-sel");
        },
        //删除选择的组件
        deleteComponent(){
            if(this.selectedComponent && this.selectedComponent.name!="page" && this.selectedComponent.name!="cell"){
                //深拷贝页面内容并放入历史栈
                this.deepCopyPageContent();
                let children =this.selectedComponent.parent.children;
                let name = this.selectedComponent.parent.name;
                switch(name){
                    case "layout":{
                        children = this.selectedComponent.parent.rows;
                        break;
                    }
                    case "row":{
                        children = this.selectedComponent.parent.cells;
                        break;
                    }
                    case "table":{
                        children = this.selectedComponent.parent.columns;
                        break;
                    }
                }
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
                console.log("上次组件树",content);
                this.createPageView();
                //this.savePageContent();
            }
        },
        //前进
        aheadComponent(){
            let content = this.popAheadStack();
            console.log("前进栈",this.aheadStack);
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
                        //this.cursor.component.el.append(obj.el);
                        break;
                    }
                    case 2:{
                        let children = this.cursor.component.parent.children;
                        children.forEach((c,i)=>{
                            if(c==this.cursor.component){
                                children.splice(i,0,obj);
                                obj.parent = this.cursor.component.parent;
                                //obj.el.insertBefore(this.cursor.component.el);
                            }
                        });
                        break;
                    }
                    case 3:{
                        let children = this.cursor.component.parent.children;
                        children.forEach((c,i)=>{
                            if(c==this.cursor.component){
                                children.splice(i+1,0,obj);
                                obj.parent = this.cursor.component.parent;
                                //obj.el.insertAfter(this.cursor.component.el);
                            }
                        });
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
        insert(name,row,col){
            
            let obj;
            if(name=="layout"){
                obj = {
                    name:"layout",
                    rows:[],
                    props:this.propsDefines[name]
                };
                for(var i=row;i--;){
                    let row={
                        name:"row",
                        id:this.getId()
                    };
                    row.cells=[];
                    for(var j=col;j--;){
                        row.cells.push({
                            name:"cell",
                            id:this.getId(),
                            props:this.propsDefines[name]
                        });
                    }
                    obj.rows.push(row);
                }
            }else if(name=="table"){
                obj = {
                    name:"table",
                    columns:[],
                    props:this.propsDefines[name]
                };
                for(var i=4;i--;){
                    let column={
                        name:"column",
                        id:this.getId(),
                        props:this.propsDefines["column"]
                    };
                    obj.columns.push(column);
                }
                console.log("obj",obj);
            }else{
                obj = {
                    name:name,
                    props:this.propsDefines[name]
                };
            }
            if(obj){
                obj.id = this.getId();
                //深拷贝页面内容并放入历史栈
                this.deepCopyPageContent();
                // let e = this.createComponent(obj);
                // obj.el = e;
                this.insertComponent(obj);
                this.createPageView();
                //this.savePageContent();
            }
        },
        hasValue(val){
            if(typeof(val)!="undefined"){
                return true;
            }else{
                return false;
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
    