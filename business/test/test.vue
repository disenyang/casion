<template>
	<div style="display: flex;width: 100%;height: 100%;flex-direction: column;min-width:0px;min-height:0px">
    
    <div style="flex: 1;overflow: auto;min-width:0px;min-height: 0px">
      <div style="width:2010px;background-color: blue;height: 100px;min-width:0px;min-height: 0px"></div>
    </div>

  </div>
	<!-- <div style="width: 2000px;height: 200px;overflow: auto;background-color: red">
		<codemirror
          :value="viewcode"
          :options="viewEditorOption"
          ref="viewEditor"
          @change="viewcodeChange">
        </codemirror>
	</div> -->
</template>

<script>
  	require('codemirror/mode/css/css')
    require('codemirror/mode/javascript/javascript')
    require('codemirror/mode/htmlmixed/htmlmixed')
    require('codemirror/mode/xml/xml')

    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')

    require('codemirror/addon/hint/xml-hint.js')
    require('codemirror/addon/hint/html-hint.js')
    require('codemirror/addon/hint/css-hint.js')
    require('codemirror/keymap/sublime.js')

    require('codemirror/theme/dracula.css');
    
  	export default{
		data () {
	    	return {
	    		viewcode:"aaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaaasaaaaaaaaaaaaaaasasasa",
		      	viewEditorOption:{
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
	                    "'/'":(cm, pred)=> {
	                        return this.complete(cm, pred);
	                    },
	                    'Cmd-Enter': 'autocomplete',
	                    'Tab': (cm)=> {
	                        this.tabKeyDeal(cm);
	                    }
	                }
	            },
		    }
		},
		computed: {
		    
		},
		props: {
		 
		},
		components: {

		},
		created(){
		  
		},
		mounted() {
			
		},
		methods: {
			
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