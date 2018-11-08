<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="yi-node">
        <div class="yi-node-wrapper">
            <div class="node" @click="clickNode()" :id="'element'+node.id"> 
                <div class="icon" @click="expand" :class="{expand:node.expand}"><i></i></div>
                <div class="node-wrapper">
                    <div class="header">
                        <div class="name-wrapper" @mouseenter="showOptBtn=true" @mouseleave="showOptBtn=false" @click="node.focus=true">
                            <div class="name" :id="node.id">
                                <input class="name-input" v-focus="selectedNode==node && selectedNodeFocusType==1" @input="changeNodeName()"  :id="'nodeInput'+node.id"  v-model="node.name">
                               <!--  <i class="del-icon" v-if="showOptBtn && node.name!='page'"  @click="delNode()"></i> -->
                                <div class="pop-menu"  v-if="popNodeNameMenu.showMenu && popNodeNameMenu.popMenus.length!=0">
                                    <div class="menu" v-for="(menu,index) in popNodeNameMenu.popMenus" @mouseenter="menu.enter=true" @keydown="keydownPopMenu(event)"  @mouseleave="menu.enter=false" :class="{selected:menu.selected}" @click.stop="clickPropNodeMenu(menu)">
                                        <div class="prop">
                                            <span class="before-prop">{{menu.beforeProp}}</span>
                                            <span class="sel-prop">{{menu.selProp}}</span>
                                            <span class="after-prop">{{menu.afterProp}}</span>
                                        </div>
                                        <span class="name">{{menu.name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="editor">
                            <input class="prop-values" v-focus="selectedNode==node && selectedNodeFocusType==2" :id="'input'+node.id" @input="changePropValues()" v-model="node.propValues">
                            <div class="pop-menu"  v-if="popMenu.showMenu && popMenuProps.length!=0" :style="{left:popMenu.left+'px',top:popMenu.top+'px'}" >
                                <div class="menu" v-for="(menu,index) in popMenuProps" @mouseenter="menu.enter=true" @keydown="keydownPopMenu(event)"  @mouseleave="menu.enter=false" :class="{selected:menu.selected}" @click.stop="clickPropMenu(menu)">
                                    <div class="prop">
                                        <span class="before-prop">{{menu.beforeProp}}</span>
                                        <span class="sel-prop">{{menu.selProp}}</span>
                                        <span class="after-prop">{{menu.afterProp}}</span>
                                    </div>
                                    <span class="name">{{menu.name}}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- <div class="prop" v-for="(p,index) in node.nodeProps">
                            <span class="prop-name">{{p.name}}</span>=<span  class="prop-value">{{p.value}}</span>
                        </div> -->
                    <!-- <input v-if="node.editable" v-model="node.name" @click.stop="clickInput(node,$event)" class="folder-name" type="text" @blur="save(node)" v-focus> -->
                    </div>
                </div>
                <div class="split-line">
                </div>
            </div>
            <yi-edit-com-tree-node :node="cnode" v-show="node.expand" v-for="(cnode,index) in node.children">
                
            </yi-edit-com-tree-node> 
        </div>
    </div>
</template>

<script>
    import editComTreenode from "./editComTreenode";
    export default editComTreenode;
</script>

<style src="./editComTreenode.css"></style>