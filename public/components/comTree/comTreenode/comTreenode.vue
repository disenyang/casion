<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="yi-com-tree-node">
        <div class="yi-node-wrapper">
            <div class="node" @click="clickNode()" :class="{selected:selectedComponent===node}"> 
                <div class="icon" @click.stop="expand" :class="{expand:node.expand}"><i></i></div>
                <div class="title" :style="{marginLeft:level*15+'px'}">
                    <div class="header" :class="{selected:selectedComponent===node}">
                        <div class="name">{{node.title}}</div>
                        <div class="prop" v-for="(value,key) in node.props" v-if="value!=='' && getKeyName(key)">

                            <span class="prop-name">{{getKeyName(key)}}</span>=<span  class="prop-value">"{{value}}"</span>
                            
                        </div>
                    <!-- <input v-if="node.editable" v-model="node.name" @click.stop="clickInput(node,$event)" class="folder-name" type="text" @blur="save(node)" v-focus> -->
                    </div>
                </div>
                <div class="split-line" :style="{left:30+level*15+'px'}">
                </div>
            </div>
            <yi-com-tree-node :level="level+1" :node="cnode" v-show="node.expand" v-for="(cnode,index) in node.children">
                
            </yi-com-tree-node> 
        </div>
    </div>
    
</template>

<script>
    import comTreenode from "./comTreenode";
    export default comTreenode;
</script>

<style src="./comTreenode.css"></style>