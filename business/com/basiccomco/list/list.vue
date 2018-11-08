<!-- Created by gaoyang 基础组件库列表页面-->
<template>
    <div class="basiccomco-list-wrapper">
        <div class="p-header">
            <yii-button icon="plus" type="text" @click="gotoNew">创建组件库</yii-button>
            <div class="p-search-bar">
                <div class="p-search-input">
                    <yii-icon name="search" color="#888"></yii-icon>
                    <input class="input-search" v-model="params.name" placeholder="搜索">
                </div>
            </div>
        </div>
        <div class="list">
            <div class="basiccomco" v-for="(comco,index) in dataList" @click="goDetail(comco)">
                <div class="top">
                    <div class="wrapper1">
                        <div class="name">{{comco.name}}</div>
                        <!-- <div class="username">{{comco.createusername}}</div>
                        <div class="updatetime">{{comco.createtime.split(" ")[0]}}</div> -->
                    </div>
                    <div class="wrapper2">
                        <div class="remark">简介：{{comco.remark}}</div>
                    </div>
                </div>
                <div class="center">
                    <img class="image" :src="comco.images">
                </div>
                <div class="tail">
                    <div class="framework">技术框架：{{comco.framework}}</div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>