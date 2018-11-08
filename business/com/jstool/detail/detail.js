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
            jstool:{
                "name":"",
                "jsname":"",
                "code":""
            },
            defaultProps:{
                ref:{
                    type:String,
                    name:"组件引用",
                    desc:"组件引用"
                },
                width:{
                    type:String,
                    name:"宽度",
                    desc:"宽度"
                },
                height:{
                    type:String,
                    name:"高度",
                    desc:"高度"
                },
                paddingLeft:{
                    type:String,
                    name:"左内边距",
                    desc:"左内边距"
                },
                paddingRight:{
                    type:String,
                    name:"右内边距",
                    desc:"右内边距"
                },
                paddingTop:{
                    type:String,
                    name:"顶内边距",
                    desc:"顶内边距"
                },
                paddingBottom:{
                    type:String,
                    name:"底内边距",
                    desc:"底内边距"
                },
                marginLeft:{
                    type:String,
                    name:"左外边距",
                    desc:"左外边距"
                },
                marginRight:{
                    type:String,
                    name:"右外边距",
                    desc:"右外边距"
                },
                marginTop:{
                    type:String,
                    name:"顶外边距",
                    desc:"顶外边距"
                },
                marginBottom:{
                    type:String,
                    name:"底外边距",
                    desc:"底外边距"
                },
                borderLeft:{
                    type:String,
                    name:"左边框",
                    desc:"左边框"
                },
                borderRight:{
                    type:String,
                    name:"右边框",
                    desc:"右边框"
                },
                borderTop:{
                    type:String,
                    name:"顶边框",
                    desc:"顶边框"
                },
                borderBottom:{
                    type:String,
                    name:"底边框",
                    desc:"底边框"
                },
                borderBottom:{
                    type:String,
                    name:"底边框",
                    desc:"底边框"
                },
                backgroundColor:{
                    type:String,
                    name:"背景颜色",
                    desc:"背景颜色"
                },
                backgroundImage:{
                    type:String,
                    name:"背景图片",
                    desc:"背景图片"
                },
                backgroundRepeat:{
                    type:String,
                    name:"背景重复",
                    desc:"背景重复"
                },
                backgroundPosition:{
                    type:String,
                    name:"背景位置",
                    desc:"背景位置"
                },
                backgroundSize:{
                    type:String,
                    name:"背景大小",
                    desc:"背景大小"
                },
                fontSize:{
                    type:String,
                    name:"字体大小",
                    desc:"字体大小"
                },
                boxShadow:{
                    type:String,
                    name:"盒子阴影",
                    desc:"盒子阴影"
                },
                color:{
                    type:String,
                    name:"字体颜色",
                    desc:"字体颜色"
                },
                fontWeight:{
                    type:String,
                    name:"字体粗细",
                    desc:"字体粗细"
                },
                borderRadius:{
                    type:String,
                    name:"圆角半径",
                    desc:"圆角半径"
                }
                // textAlign:{
                //     type:String,
                //     name:"内容位置",
                //     desc:"内容位置",
                //     values:[
                //         {
                //             lab:"居左",
                //             val:"left"
                //         },
                //         {
                //             lab:"居中",
                //             val:"center"
                //         },
                //         {
                //             lab:"居右",
                //             val:"right"
                //         }
                //     ]
                // }
            },
            defaultUnProps:{
                "v-if":{
                    type:String,
                    name:"是否创建",
                    desc:"是否创建"
                },
                "v-show":{
                    type:String,
                    name:"是否显示",
                    desc:"是否显示"
                },
                click:{
                    type:String,
                    name:"单击事件",
                    desc:"单击事件"
                },
                dblclick:{
                    type:String,
                    name:"双击事件",
                    desc:"双击事件"
                },
                mouseover:{
                    type:String,
                    name:"鼠标over",
                    desc:"鼠标over"
                },
                mouseout:{
                    type:String,
                    name:"鼠标离开",
                    desc:"鼠标离开"
                }
            },
            codeEditorOption:{
                mode: "javascript",
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
            viewcode:"",
            code:"",
            testcode:"",
            stylecode:""
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
            this.$http.post("/casion/jstool/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.jstool = response.data.data ? response.data.data : {};   
                this.getBasiccomco(this.jstool.coid,()=>{
                    this.init();
                });
            });     
        },
        //获取组件库
        getBasiccomco(coid,callback){
            this.yiiLoading.show();
            this.$http.post("/casion/basiccomco/get", {
                id:coid
            }).then((response) => {
                this.basiccomco = response.data.data ? response.data.data : {};  
                this.basiccoms = this.basiccomco.coms;
                try{
                    for(let basiccom of this.basiccoms){
                        let jscode = basiccom.jscode;
                        jscode = this.dealJscode(jscode);
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
        codeChange(){
            let editor =  this.$refs.codeEditor.editor;
            this.code = editor.getValue();
            this.$http.post("/casion/jstool/saveCode", {
                id:this.$route.params.id,
                code:this.code
            }).then((response) => {
                
            });
            this.createPage();
        },
        testcodeChange(){

            let editor =  this.$refs.testEditor.editor;
            this.testcode = editor.getValue();
            this.$http.post("/casion/jstool/saveTestcode", {
                id:this.$route.params.id,
                testcode:this.testcode
            }).then((response) => {
                
            });
            this.createPage();
            
        },
        init(){
            let vm = this;
            this.code = this.jstool.code;
            console.log("code.....",this.code);
            this.testcode = this.jstool.testcode||"";

            this.createPage();
           
        },
        //处理js代码
        dealJscode(jscode){
            let code = JSON.stringify(this.defaultProps);
            code = code.substring(1,code.length-1);
            let uncode = JSON.stringify(this.defaultUnProps);
            uncode = uncode.substring(1,uncode.length-1);

            jscode = jscode.replace(/\.\.\.defaultProps/g,code);
            jscode = jscode.replace(/\.\.\.defaultUnProps/g,uncode);
            if(jscode.indexOf("render(")!=-1){
                let suffix = "var thishhhh = ";
                //含有jsx语法
                jscode=babel.transform(suffix+jscode, { presets: ['es2015'],plugins: ['vueJsx']}).code+"";  
                
                jscode = jscode.replace("\"use strict\";","");
                jscode = jscode.replace("'use strict';","");
                jscode = jscode.replace(suffix,"");

                
                let lastChar = "";
                lastChar = jscode.substring(jscode.length-1,jscode.length);
                
                if(lastChar==";"){
                    jscode = jscode.substring(0,jscode.length-1);
                }

            }
            return jscode;            
        },
        createPage(){

            //let codeToJs = eval(this.code);

            let content = $(".preview-page .content");
            content.children().remove();

            let e = $(`<div class="previewJstoolMount"></div>`);
            e.appendTo(content);
                        

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
                el:".previewJstoolMount",
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
        back(){
            this.$router.push("../list");
        },
        edit(){
            //发布项目
            this.$router.push({name:"jstool-modify",params:{id:this.$route.params.id}});
        }
    }
}
    