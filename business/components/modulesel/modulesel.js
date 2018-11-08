import  {$} from 'jquery'
import Utils from 'utils';

const postcss = require('postcss');
const postcssJs = require('postcss-js');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const babel = require("babel-standalone");
const vueJsx = require("babel-plugin-transform-vue-jsx");
babel.registerPlugin('vueJsx', vueJsx);
const beautify = require('js-beautify');
const js_beautify = beautify.js_beautify;
const css_beautify = beautify.css_beautify;
const html_beautify = beautify.html_beautify;

export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            moduleName:"",
            panelHeight: 570,
            panelWidth:800,
            checkedAll:false,
            selectedCo:null,
            defaultParams:{
                merchantId:0//固定
            },
            searchData: {},
            selectData:[],
            modules: [],
            selModuleId:"",
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png"
        }
    },
    components: {
        
    },
    props:{
        project:{
            type:String
        }
    },
    computed:{
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        this.list();
    },
    methods:{
        list(){
            this.yiiLoading.show();
            let params = {
                project:this.project
            };
            this.$http.post("/casion/module/queryByProject",params)
              .then((response) => {
                    this.yiiLoading.hide();
                    let res = response.data.data;
                    let list = res ? res.data : [];
                    for(let i=0;i<list.length;i++){
                        let co = list[i];
                        co.checked = false;
                    }
                    this.modules = list;
              }).catch((e)=>{
                    console.log("e",e);
              })
        },
        confirm(){
            if(!this.moduleName || !this.selModuleId){
                return;
            }
            this.$http.post("/casion/module/get",{
                id:this.selModuleId
            })
            .then((response) => {
                    let module = response.data.data;
                    this.dealModule(module);
            }).catch((e)=>{
                    console.log("e",e);
            })
        },
        
        dealModule(module){
            $("#module-mount-wrapper").remove();
            $(`<div id="module-mount-wrapper"></div>`).appendTo($("body"));

            let viewModel;
            let jsContent = module.jsContent;
            if(jsContent.indexOf("<script>")!=-1){
                let jscode = jsContent.replace(/((.|\n)*)<script>((.|\n)*)<\/script>((.|\n)*)/g,"$3");
                jscode = jscode.trim();
                jscode = jscode.replace(/__getTableList\((\{.*\})\)/g,`this.$http.post("/casion/model/query",$1)`);
                jscode = jscode.replace(/__getTableColumnList\((\{.*\})\)/g,`this.$http.post("/casion/modelitem/query",$1)`);
                viewModel= eval(`(${jscode})`);
            }else{
                viewModel={};
            }
            
            let ehtml = jsContent.replace(/((.|\n)*)<html>((.|\n)*)<\/html>((.|\n)*)$/g,"$3");
            let style = jsContent.replace(/((.|\n)*)<style>((.|\n)*)<\/style>((.|\n)*)$/g,"$3");
            
            let vm = this;

            viewModel.methods.confirmCallback=function(vue){
                let createdWrapper = vue.create();
                let pages =createdWrapper.pages;
                for(let page of pages){
                    if(page.vue){
                        page.vue = Utils.domJson.domToJson(page.vue,null,false);
                    }
                    if(page.js){
                        page.js = js_beautify(page.js,{
                            "indent_size": 4,
                            "indent_char": " ",
                        });
                    }
                }
                let moduleCreatedWrapper = {moduleName:vm.moduleName,createdWrapper:createdWrapper};
                vm.$emit("confirm",moduleCreatedWrapper);
            };
            
            let vueObj = {
                ...viewModel,
                el:"#module-mount-wrapper",
                template:ehtml,
                renderError (h, err) {
                    return h('pre', { style: { color: 'red' }}, err.stack)
                },
                errorCaptured:function(err, vm, info){
                    console.log("errorCaptured");
                    return false;
                }
            };

            postcss([precss,autoprefixer]).process(style, {}).then( (result) => {
                $("#moduleStylecode").remove();
                $(`<style id="moduleStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
            })

            try{
                let vue = new Vue(vueObj);
            }catch(e){
                console.error("!!!!error",e);
            }

            
        },
        close(){
            this.modalShow = false;
        }
    }
  }