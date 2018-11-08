export default {
	name:"YiColumn",
	data(){
		return {

		}
	},
	props:{
		"title":String,
		"item":String,
		"formatter":{
			type:[Function,Array,String]
		}
	},
	watch: {
        "title":function(newValue,oldValue){
            console.log("change title");
    	}
	},
	mounted(){
		this.column = {
            title: this.title,
            item: this.item,
            formatter:this.formatter
        };

        if(!this.$parent.columns){
        	this.$parent.$set(this.$parent,"columns",[]);
        }
        this.$parent.columns.push(this.column);
	},
	methods:{
		
	}
}