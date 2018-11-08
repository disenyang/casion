<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="yi-tree">
        <yi-tree-node :node="node" v-for="node in nodes">
        </yi-tree-node>
    </div>
</template>

<script>
    import tree from "./tree";
    export default tree;
</script>

<style src="./tree.css"></style>