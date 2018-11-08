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
            componentName:"module-detail",
            //光标
            cursor:{
                el:null,
                ...defaultCursor
            },
            module:{
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
                    name:"生成模块代码",
                    selected:false
                }
            ],
            errors:[],
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
            }
        }
    },
    computed:{
        
    },
    components: {
        
    },
    watch: {
        "module.jsContent":function(newValue){
            this.$http.post("/casion/module/saveJsContent", {
                id:this.module.id,
                jsContent:this.module.jsContent,
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
            this.$http.post("/casion/module/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.module = response.data.data ? response.data.data : {};  
            });     
        },
        edit(){
            //发布项目
            this.$router.push({name:"module-modify",params:{id:this.$route.params.id}});
        },
        jsContentChange(){
            let editor =  this.$refs.jsContentEditor.editor;
            this.module.jsContent = editor.getValue();
        }
    }
}
    