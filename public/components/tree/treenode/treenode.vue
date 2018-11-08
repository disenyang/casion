<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="yi-node">
        <div class="yi-node-wrapper">
            <div class="node" @click="clickNode()"> 
                <div class="icon" @click="expand" :class="{expand:node.expand}"><i></i></div>
                <div class="title">
                    <div v-if="!node.editable">{{node.name}}</div>
                    <input v-if="node.editable" v-model="node.name" @click.stop="clickInput(node,$event)" class="folder-name" type="text" @blur="save(node)" v-focus>
                </div>
            </div>
            <yi-tree-node :node="cnode" v-show="node.expand" v-for="(cnode,index) in node.children"></yi-tree-node> 
        </div>
    </div>
</template>

<script>
    import treenode from "./treenode";
    export default treenode;
</script>

<style src="./treenode.css"></style>