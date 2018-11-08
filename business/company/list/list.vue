<!-- Created by gaoyang 公司列表页面-->
<template>
    <div class="company-list-wrapper">
        <div class="p-header">
            <yii-button icon="plus" type="text" @click="gotoNew">创建公司</yii-button>
            <div class="p-search-bar">
                <div class="p-search-input">
                    <yii-icon name="search" color="#888"></yii-icon>
                    <input class="input-search" v-model="params.name" placeholder="搜索">
                </div>
            </div>
        </div>
        <div class="company-list">
            <div class="company" v-for="(row,index) in dataList" @click="goDetail(row)">
                <div class="logo"><img :src="row.logo"></div>
                <div class="name">{{row.name}}</div>
                <div class="remark">{{row.remark}}</div>
                <div class="owner">by{{row.createusername}}</div>
                <div class="edit-btn" v-if="row.owner == userinfo.id">
                    <yii-button icon="edit" type="text" @click="updateGo(row)"></yii-button>
                </div>
            </div>
        </div>
        <yii-pagination 
            class="p-pagination"
            :total-items="pages.total" 
            :items-per-page="pages.pageSize" 
            align="right"
            v-model="pages.currentPage"
            @current-change="currentPageChange"
            @page-size-change="pageSizeChange"></yii-pagination>
    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>