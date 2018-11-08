export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight: 570,
            selectedIndex:0,
            propValueEditorOption:{
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
                    'Cmd': 'autocomplete'
                }
            }
        }
    },
    props:{
        configProps:{
            type:[Array,Object]
        },
        popSize:{
            type:[Array,Object]
        },
        propValue:{
            type:[String]
        },
        title:{
            type:[String]
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        this.size = "large";
    },
    mounted() {
        
    },
    methods:{
        confirm(){
            this.$emit("confirm",this.propValue);
        },
        close(){
            this.modalShow = false;
        },
        propValueChange(){
            let editor =  this.$refs.propValueEditor.editor;
            this.propValue = editor.getValue();
        },
        complete(cm, pred){
            var cur = cm.getCursor();
            if (!pred || pred()) setTimeout(function() {
              if (!cm.state.completionActive)
                cm.showHint({completeSingle: false});
            }, 100);
            return "CodeMirror.Pass";
        }
    }
}