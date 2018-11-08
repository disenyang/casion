import  {$} from 'jquery'

export default {
	name:"yiEditor",
	data(){
		return {

		}
	},
	mounted(){
		let textarea = $(".editor-text");

		$(".casion-editor-wrapper").on("click",function(){
			if (window.getSelection) {
			    let sel = window.getSelection()
			    console.log("sel",sel);
			    if (sel.anchorNode && sel.extend) {
			    	let anchorOffset =  sel.anchorOffset;
			    	let offsetX = $(sel.anchorNode).offset().left;
			    	let offsetY = $(sel.anchorNode).offset().top;
			    	console.log(offsetY);
			    	textarea.css("left",offsetX);
			    	textarea.css("top",offsetY);
			      // result.anchorNode = sel.anchorNode
			      // result.anchorOffset = sel.anchorOffset
			      // result.focusNode = sel.focusNode
			      // result.focusOffset = sel.focusOffset
			    }
			}
		});
	},
	props:{
		
	},
	methods:{
		
	}
}