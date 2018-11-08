<template>
	<table class="table-wrapper" :style="{width:width,height:height}">
       	<tr><slot></slot></tr>
       	<tr v-for="(line,row) in data">
       		<template v-for="(column,col) in columns">
	       		<yi-table-cell
	       			:line="line"
					:row="row"
					:col="col"
					:column="column"
	            ></yi-table-cell>
       		</template>
       	</tr>
    </table>
</template>
<script>
    import table from "./table";
    export default table;
</script>

<style src="./table.css"></style>