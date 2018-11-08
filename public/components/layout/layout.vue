<template>
	<table class="layout" :style="{width:width,height:height}">
		<tr v-for="row in rows">
            <td v-for="col in cols" @click="clickCell(row,col)">
            </td>
        </tr>
	</table>
</template>

<script>
    import layout from "./layout";
    export default layout;
</script>

<style src="./layout.css"></style>