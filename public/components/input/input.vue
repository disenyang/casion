<template>
	<input class="input-wrapper" :style="{width:width,height:height,borderBottom:borderBottom}"
	@input="elInputHandler"
	@mouseenter="elMouseenterHandler"
    @mouseleave="elMouseleaveHandler"
	@mouseover="elMouseoverHandler"
    @mouseout="elMouseoutHandler"
    @dblclick="elDblclickHandler">

</template>

<script>
    import input from "./input.js";
    export default input;
</script>

<style src="./input.css"></style>
