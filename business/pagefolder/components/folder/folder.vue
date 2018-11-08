<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="folder-wrapper">
        <div class="node-wrapper"  v-for="node in folders">
            <div class="node" @click="clickNode(node)" :class="{selected:node.file && selectedPage==node}" @contextmenu.prevent="popMenu(node,$event)" > 
                <div :style="{width: level*10+'px'}"></div>
                <div class="icon" v-if="!node.file" :class="{expand:node.expand}"><i></i></div>
                <div class="icon-page" v-if="node.file"></div>
                <div class="title" :class="{selected:node.file && selectedPage==node}">
                    <span v-if="!node.editable">{{node.name}}</span>
                    <input v-if="node.editable" v-model="node.name" @click.stop="clickInput(node,$event)" class="folder-name" type="text" @blur="save(node)" v-focus>
                </div>
                <!-- <div class="options" @click.stop="popMenu(node)">
                    <i></i>
                </div> -->
                <div class="right-menu" v-if="node.showMenu" :style="{left:contextmenu.left+'px',top:contextmenu.top+'px'}">
                    <div class="menu" v-for="(menu,index) in node.file?contextmenu.pageMenus:contextmenu.folderMenus" @mouseenter="menu.enter=true"  @mouseleave="menu.enter=false" :class="{enter:menu.enter}" @click.stop="clickMenu(menu,node)">{{menu.name}}</div>
                </div>
            </div>
            <folder :folders="node.children" :level="level+1" folder="node" @clickCNode="clickCNode" v-if="node.expand"></folder>
        </div>
    </div>
</template>

<script>
    import folder from "./folder";
    export default folder;
</script>

<style src="./folder.css"></style>