/**
 * Created by gaoyang on 2018/01/20.
 * @title 基础组件列表js
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
export default{
    data(){
        return {
            enterEditBtn:false,
            basiccomco:{},
            basiccoms:[],
            basiccom:{
                "name":"",
                "icon":"",
                "viewcode":"",
                "stylecode":"",
                "jscode":"",
                "type":""
            },
            mixinsObj:[Utils.zindex,Utils.emitter,Utils.popper,Utils.mixins],
            selTab:1,
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png",
            viewEditorOption:{
                mode: "text/html",
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
                    "'/'":(cm, pred)=> {
                        return this.complete(cm, pred);
                    },
                    'Cmd-Enter': 'autocomplete',
                    'Tab': (cm)=> {
                        this.tabKeyDeal(cm);
                    }
                }
            },
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
                    'Cmd-Enter': 'autocomplete',
                    'Tab': (cm)=> {
                        this.tabKeyDeal(cm);
                    }
                }
            },
            documentEditorOption:{
                mode: 'text/html',
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
                    'Cmd-Enter': 'autocomplete',
                    'Tab': (cm)=> {
                        this.tabKeyDeal(cm);
                    }
                }
            },
            testEditorOption:{
                mode: 'text/html',
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
                    'Cmd-Enter': 'autocomplete',
                    'Tab': (cm)=> {
                        this.tabKeyDeal(cm);
                    }
                }
            },
            jsEditorOption:{
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
                    'Cmd-Enter': 'autocomplete',
                    'Tab': (cm)=> {
                        this.tabKeyDeal(cm);
                    }
                }
            },
            viewcodeEditor:null,
            jscodeEditor:null,
            stylecodeEditor:null,
            viewcode:"",
            jscode:"",
            testcode:"",
            stylecode:""
        }
    },
    computed:{
        defaultProps:function(){
            return this.$store.state.defaultProps;
        },
        defaultUnProps:function(){
            return this.$store.state.defaultUnProps;
        },
        dealJscode:function(){
            return this.$store.state.dealJscode;
        },
        userinfo:function(){
            return userinfo;
        }
    },
    components: {
        
    },
    watch: {

    },
    filters:{
        getBasiccomTypeText(val){
            return val==1?"基本组件":(val==2?"表格类":(val==3?"布局":(val==4?"弹窗":"")));
        }
    },
    created(){

    },
    mounted() {
        this.getDetail();
        $(".edit-area").height($(window).height()-60);
    },
    methods: {
        //tab健处理
        tabKeyDeal(cm){
            if (cm.somethingSelected()) {
                cm.indentSelection('add');
            }else{
                var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
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
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/bizcom/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.basiccom = response.data.data ? response.data.data : {};   
                
                this.getBasiccomco(this.basiccom.coid,()=>{
                    this.init();
                });
            });     
        },
        //获取组件库
        getBasiccomco(coid,callback){
            this.yiiLoading.show();
            this.$http.post("/casion/basiccomco/getAll", {
                id:coid
            }).then((response) => {
                this.basiccomco = response.data.data ? response.data.data : {};  
                this.basiccoms = this.basiccomco.coms;
                try{
                    for(let basiccom of this.basiccoms){
                        let jscode = basiccom.jscode;
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
                }catch(e){
                    console.error(e);
                }
                if(callback){
                    callback();
                    
                }
            });
        },
        viewcodeChange(){
            let editor =  this.$refs.viewEditor.editor;
            this.viewcode = editor.getValue();
            this.$http.post("/casion/bizcom/saveViewcode", {
                id:this.$route.params.id,
                viewcode:this.viewcode
            }).then((response) => {
                
            });
            if(this.testcode.trim()){
                
            }else{
                this.createPage();
            }
        },
        jscodeChange(){
            let editor =  this.$refs.jsEditor.editor;
            this.jscode = editor.getValue();
            this.$http.post("/casion/bizcom/saveJscode", {
                id:this.$route.params.id,
                jscode:this.jscode
            }).then((response) => {
                
            });
            if(this.testcode.trim()){
                
            }else{
                this.createPage();
            }
        },
        stylecodeChange(){
            let editor =  this.$refs.styleEditor.editor;
            this.stylecode = editor.getValue();
            this.$http.post("/casion/bizcom/saveStylecode", {
                id:this.$route.params.id,
                stylecode:this.stylecode
            }).then((response) => {
                
            });
            if(this.testcode.trim()){
                
            }else{
                this.createPage();
            }
        },
        testcodeChange(){

            let editor =  this.$refs.testEditor.editor;
            this.testcode = editor.getValue();
            this.$http.post("/casion/bizcom/saveTestcode", {
                id:this.$route.params.id,
                testcode:this.testcode
            }).then((response) => {
                
            });
            
        },
        init(){
            let vm = this;
            this.viewcode = this.basiccom.viewcode;
            this.jscode = this.basiccom.jscode;
            this.stylecode = this.basiccom.stylecode;
            this.testcode = this.basiccom.testcode||"";
            if(this.testcode.trim()){
                this.runTest();
            }else{
                this.createPage();
            }
           
        },
        //处理js代码
        createPage(){
            let content = $(".preview-page .content");
            content.children().remove();
            let ehtml = this.viewcode;
            let viewModel;
            try{
                let jscode = this.jscode;
                jscode = this.dealJscode(jscode,babel);
                viewModel =eval(`(${jscode})`);
                if(viewModel.config && (typeof(viewModel.config.preview)!="undefined" && !viewModel.config.preview)){
                    //不允许预览
                    return;
                }
                viewModel.mixins=this.mixinsObj;

                let previewData = viewModel.previewData;

            }catch(e){
                console.error(e);
                return;
            }
            
            let e = $(`<div class="previewMount"></div>`);
            e.appendTo(content);
            
            let cocsscontent = "";
            if(this.basiccomco.csscontent){
                cocsscontent = `:root\{${this.basiccomco.csscontent}\}`;
            }


            postcss([precss,autoprefixer]).process(cocsscontent+this.stylecode, {}).then( (result) => {
                $("#pageComponentStyle").remove();
                $(`<style id="pageComponentStyle" type="text/css">${result.css}</style>`).appendTo($("head"));
            })

            // let style = prefixer(this.stylecode);
            // console.log("style=======",style);
            
            
            let vueObj = {
                ...viewModel,
                el:".previewMount",
                mixins:this.mixinsObj,

                beforeMount(){
                    if(viewModel.preview){
                        viewModel.preview(this);
                    }
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
            if(ehtml){
                vueObj.template = ehtml;
            }

   
            vueObj.components={};
            let basiccomsStylecode = "";
            for(let basiccom of this.basiccoms){

                if(basiccom.id===this.$route.params.id || basiccom.enname=="router-view"){
                    continue;
                }
                let viewModel =eval(`(${basiccom.jscode})`);
                viewModel.mixins=this.mixinsObj;

                let component = {
                    ...viewModel,
                    template:basiccom.viewcode
                }


                Vue.component(basiccom.enname||basiccom.id, component);

                basiccomsStylecode= basiccomsStylecode+"\n"+basiccom.stylecode;

            }

            postcss([precss,autoprefixer]).process(basiccomsStylecode, {}).then( (result) => {
                $("#basiccomsStylecode").remove();
                $(`<style id="basiccomsStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
            })

            console.log("vueObj",vueObj);

            try{
                let vue = new Vue(vueObj);
            }catch(e){
                console.log("!!!!error");
            }
        },
        runTest(){
            this.getBasiccomco(this.basiccom.coid,()=>{
                this.runTestDo();
            });
        },
        runTestDo(){

            let content = $(".preview-page .content");
            content.children().remove();

            let e = $(`<div class="previewMount"></div>`);
            e.appendTo(content);
                        
            // let style = prefixer(this.stylecode);
            // console.log("style=======",style);

            let viewModel;
            if(this.testcode.indexOf("<script>")!=-1){
                let jscode = this.testcode.replace(/<script>((.|\n)*)<\/script>((.|\n)*)/g,"$1");
                viewModel= eval(`(${jscode})`);
            }else{
                viewModel={};
            }
            
            
            let ehtml = this.testcode.replace(/<script>((.|\n)*)<\/script>((.|\n)*)$/g,"$3");
            
            let vueObj = {
                ...viewModel,
                el:".previewMount",
                mixins:this.mixinsObj,
                beforeMount(){
                    if(viewModel.preview){ 
                        viewModel.preview(this);
                    }
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
            let basiccomsStylecode = "";
            for(let basiccom of this.basiccoms){
                if(basiccom.enname=="router-view"){
                    continue;
                }
                let viewModel =eval(`(${basiccom.jscode})`);
                viewModel.mixins=this.mixinsObj;
                let component = {
                    ...viewModel,
                    template:basiccom.viewcode
                }

                

                Vue.component(basiccom.enname||basiccom.id, component);

                basiccomsStylecode= basiccomsStylecode+"\n"+basiccom.stylecode;

            }

            let cocsscontent = "";
            if(this.basiccomco.csscontent){
                cocsscontent = `:root\{${this.basiccomco.csscontent}\}`;
            }

            postcss([precss,autoprefixer]).process(cocsscontent+basiccomsStylecode, {}).then( (result) => {
                $("#basiccomsStylecode").remove();
                $(`<style id="basiccomsStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
            })

            console.log("vueObj",vueObj);

            try{
                let vue = new Vue(vueObj);
            }catch(e){
                console.log("!!!!error");
            }
        },
        back(){
            this.$router.go(-1);
        },
        del(){
            let _this = this;
            this.yiiConfirm({
                content: "确认删除",
                onConfirm(){
                    _this.$http.post("/casion/bizcom/delete",{
                        id:_this.basiccom.id
                    }).then((response) => {
                        _this.back();
                    });
                }
            });
        },
        edit(){
            //发布项目
            this.$router.push({name:"basiccom-modify",params:{id:this.$route.params.id}});
        }
    }
}
    