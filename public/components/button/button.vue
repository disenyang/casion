<template>
	<button class="button-wrapper" :style="{width:width,height:height}" 
	@mouseenter="elMouseenterHandler"
    @mouseleave="elMouseleaveHandler"
	@mouseover="elMouseoverHandler"
    @mouseout="elMouseoutHandler"
    @dblclick="elDblclickHandler"
    @click="elClickHandler">{{value}}</button>
</template>

<script>
    import button from "./button.js";
    export default button;
</script>

<style src="./button.css"></style>