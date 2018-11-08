<template>
	<div class="casion-tip-wrapper" >
		<div class="tip-right" v-if="place=='right'">
			<div class="arg">
				
			</div>
			<div class="con">
				{{msg}}
			</div>
		</div> 
		<div class="tip-top" v-if="place=='top'">
			<div class="arg">
				
			</div>
			<div class="con">
				{{msg}}
			</div>
		</div> 
	</div>
</template>

<script>
    import tip from "./tip.js";
    export default tip;
</script>

<style src="./tip.css"></style>