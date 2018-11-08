<template>
  <div class="test-home">
	  <codemirror
	  :value="code"
	  :options="editorOption"
	  ref="myEditor"
	  @change="yourCodeChangeMethod">
	</codemirror>
  </div>
</template>

<script>
  	require('codemirror/mode/css/css')

  	require('codemirror/addon/hint/show-hint.js')
  	require('codemirror/addon/hint/show-hint.css')
  	require('codemirror/addon/hint/css-hint.js')
	require('codemirror/theme/dracula.css');

  	export default{
		data () {
	    	return {
		      code: '',
		      editorOption:{
		      	mode: 'css',
		      	theme:"dracula",
	    		extraKeys: {
	    			"'c'":(cm, pred)=> {
	    				return this.complete(cm, pred);
				    },
				    "'r'":(cm, pred)=> {
	    				return this.complete(cm, pred);
				    },
	    			'Cmd-Enter': 'autocomplete'
	    		}
		      }
		    }
		},
		computed: {
		    editor() {
		      // get current editor object
		      return this.$refs.myEditor.editor
		    }
		},
		props: {
		 
		},
		components: {

		},
		created(){
		  
		},
		mounted() {
			this.editor.focus();
			this.editor.on('change', ()=> {  
	          //this.editor.showHint();  //满足自动触发自动联想功能  
	      	});  
		},
		methods: {
			complete(cm, pred){
				let editor =  this.$refs.myEditor.editor;
				console.log("cm", editor);
		        var cur = cm.getCursor();
		        if (!pred || pred()) setTimeout(function() {
		          if (!cm.state.completionActive)
		            cm.showHint({completeSingle: false});
		        }, 100);
		        return "CodeMirror.Pass";
			}
		}
  	}
</script>
<style>
	

	.test-home{
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;	
	}
</style>