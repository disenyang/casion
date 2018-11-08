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
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            name:"",
            title: '',
            size: "large",
            panelHeight: 570,
            checkedAll:false,
            selectedCo:null,
            defaultParams:{
                merchantId:0//固定
            },
            searchData: {},
            selectData:[],
            templates: [],
            selTemplateId:"",
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
            this.$http.post("/casion/template/queryByProject",params)
              .then((response) => {
                    this.yiiLoading.hide();
                    let res = response.data.data;
                    let list = res ? res.data : [];
                    for(let i=0;i<list.length;i++){
                        let co = list[i];
                        co.checked = false;
                    }
                    this.templates = list;
                    
              }).catch((e)=>{
                    console.log("e",e);
              })
        },
        confirm(){
            if(!this.name || !this.selTemplateId){
                return;
            }
            this.$http.post("/casion/template/get",{
                id:this.selTemplateId
            })
            .then((response) => {
                    let template = response.data.data;
                    this.dealTemplate(template);
            }).catch((e)=>{
                    console.log("e",e);
            })
        },
        
        dealTemplate(template){
            console.log("ehtml==");
            $("#template-mount-wrapper").remove();
            $(`<div id="template-mount-wrapper"></div>`).appendTo($("body"));

            let viewModel;
            let jsContent = template.jsContent;
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
            let vueWrapper = viewModel.vue;
            let vm = this;
            console.log("ehtml==",ehtml);


            vueWrapper.methods.confirmCallback=function(vue){
                let templateHtml = vue.createPage();
                let templateCss = vue.createCss();
                let templateJs = vue.createJs();
                vm.$emit("confirm",vm.name,templateHtml,templateJs,templateCss);
                
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

            postcss([precss,autoprefixer]).process(style, {}).then( (result) => {
                $("#templateStylecode").remove();
                $(`<style id="templateStylecode" type="text/css">${result.css}</style>`).appendTo($("head"));
            })

            try{
                let vue = new Vue(vueObj);
            }catch(e){
                console.log("!!!!error");
            }

            
        },
        close(){
            this.modalShow = false;
        }
    }
  }