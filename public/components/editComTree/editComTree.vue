<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="edit-com-tree">
        <yi-edit-com-tree-node :node="node" v-for="node in nodes">
        </yi-edit-com-tree-node>
    </div>
</template>

<script>
    import editComTree from "./editComTree";
    export default editComTree;
</script>

<style src="./editComTree.css"></style>