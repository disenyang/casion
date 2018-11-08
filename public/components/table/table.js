export default {
	name:"YiTable",
	data(){
		return {
			data:[],
			columns:[]
		}
	},
	
	props:["width","height","data"],
	created(){
		this.filters = this.$root.$filters;
		console.log("this",this.$root);
	}
}