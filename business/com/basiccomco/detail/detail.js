/**
 * Created by gaoyang on 2018/01/20.
 * @title 基础组件库列表js
 */
export default{
    data(){
        return {
            defaultComImg:"http://oxwmr019d.bkt.clouddn.com/com.png",
            basiccomco:{
                "name":"",
                "remark":"",
                "count":"",
                "images":"",
                "coms":[]
            },
            csscontent:"",
            csscontentEditorOption:{
                mode: 'css',
                theme:"dracula",
                lineNumbers: true,
                indentUnit:4,
                keyMap: "sublime",
                autoCloseBrackets: true,
                matchBrackets: true,
                showCursorWhenSelecting: true,
                extraKeys: {
                    // "'c'":(cm, pred)=> {
                    //     return this.complete(cm, pred);
                    // },
                    // "'r'":(cm, pred)=> {
                    //     return this.complete(cm, pred);
                    // },
                    // 'Cmd-Enter': 'autocomplete',
                    // 'Tab': (cm)=> {
                    //     this.tabKeyDeal(cm);
                    // }
                }
            }
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){

    },
    mounted() {
        this.$nextTick(function() {
            this.getDetail();
        })
    },
    methods: {
        //获取详情
        getDetail(){
            this.yiiLoading.show();
            this.$http.post("/casion/basiccomco/get", {
                id:this.$route.params.id
            }).then((response) => {
                this.basiccomco = response.data.data ? response.data.data : {};   
            });     
        },
        goCom(com){
            this.$router.push({name: 'basiccom-detail', params:{id: com.id}});
        },
        goTemplate(template){
            this.$router.push({name: 'template-detail', params:{id: template.id}});
        },
        goModule(module){
            this.$router.push({name: 'module-detail', params:{id: module.id}});
        },
        goJstool(jstool){
            this.$router.push({name: 'jstool-detail', params:{id: jstool.id}});
        },
        goBizcom(bizcom){
            this.$router.push({name: 'bizcom-detail', params:{id: bizcom.id}});
        },
        back(){
            this.$router.push("../list");
        },
        goAdd(){
            this.$router.push({name: 'basiccom-setting', params:{coid: this.basiccomco.id}});
        },
        goAddBiz(){
            this.$router.push({name: 'bizcom-setting', params:{coid: this.basiccomco.id}});
        },
        edit(){
            this.$router.push({name: 'basiccomco-modify', params:{coid: this.basiccomco.id}});
        },
        goAddJstool(){
            this.$router.push({name: 'jstool-setting', params:{coid: this.basiccomco.id}});
        },
        goAddTemplate(){
            this.$router.push({name: 'template-setting', params:{coid: this.basiccomco.id}});
        },
        goAddModule(){
            this.$router.push({name: 'module-setting', params:{coid: this.basiccomco.id}});
        },
        csscontentChange(){
            let editor =  this.$refs.csscontentEditor.editor;
            this.basiccomco.csscontent = editor.getValue();
            this.$http.post("/casion/basiccomco/saveCsscontent", {
                id:this.$route.params.id,
                csscontent:this.basiccomco.csscontent
            }).then((response) => {
                
            });
        },
    }
}
    