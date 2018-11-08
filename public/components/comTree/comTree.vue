<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="com-tree">
        <yi-com-tree-node :node="node" v-for="node in nodes">
        </yi-com-tree-node>
    </div>
</template>

<script>
    import comTree from "./comTree";
    export default comTree;
</script>

<style src="./comTree.css"></style>