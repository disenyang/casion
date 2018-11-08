export default{
    mixins: [Vue.prototype.yiiModalDefault],
    data() {
        return {
            modalShow: true,
            title: '',
            panelHeight: 570,
            selectedIndex:0,
        }
    },
    props:{
        template:{
            type:[Object]
        }
    },
    components: {
        
    },
    watch: {

    },
    created(){
        for(let i=0;i<this.template.templates.length;i++){
            let template  = this.template.templates[i];
            if(i==0){
                template.selected=true;
            }else{
                 template.selected=false;
            }
        }
        this.size = this.template.popSize;
    },
    mounted() {
        
    },
    methods:{
        confirm(){
            let selectedTemplate=this.template.templates[this.selectedIndex];
            this.$emit("confirm",selectedTemplate);
        },
        close(){
            this.modalShow = false;
        }
    }
}