<template>
	<label :style="{width:width,height:height}" 
	@mouseenter="elMouseenterHandler"
    @mouseleave="elMouseleaveHandler"
	@mouseover="elMouseoverHandler"
    @mouseout="elMouseoutHandler"
    @dblclick="elDblclickHandler"
    @click="elClickHandler">{{value}}</label>
</template>

<script>
    import label from "./label.js";
    export default label;
</script>

<style src="./label.css"></style>