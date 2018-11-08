<!-- Created by gaoyang 积分明细列表页面-->
<template>
    <div class="scoredetail-list-wrapper">
        <div>
            <yii-row>
                <yii-button @click="gotoNew()">新建积分明细</yii-button>
            </yii-row>
        </div>
        <div class="p-search">
            <yii-row>
                <yii-col class="p-search-label">用户</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.user" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">创建时间</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.createtime" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">类型</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.type" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">获得积分</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.score" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col span="3" class="p-search-content p-text-right">
                    <yii-button size="small" @click="search">查询</yii-button>
                </yii-col>
                </yii-row>
                <yii-row>
                </yii-row>
        </div>
        <yii-table :data-list="dataList" stripe empty-default="">
            <yii-table-column align="center" :width="120" title="用户" relate="user">
                <template slot-scope="props">
                    <router-link :to="{ name: 'scoredetail-detail', params: { id: props.line.id }}">
                        <yii-button type="text">{{props.line.user}}
                        </yii-button>
                    </router-link>
                </template>
            </yii-table-column>
            <yii-table-column align="center" :width="200" title="创建时间" relate="createtime"></yii-table-column>
            <yii-table-column align="center" :width="120" title="类型" relate="type"></yii-table-column>
            <yii-table-column align="center" :width="120" title="获得积分" relate="score"></yii-table-column>
            <yii-table-column align="center" :width="120" title="操作" fixed="right">
                <template slot-scope="props">
                    <router-link
                        :to="{name: 'scoredetail-modify', params: {id: props.line.id}}"
                        class="mr20">
                          <yii-button type="text">修改</yii-button>
                    </router-link>
                    <yii-button type="text"
                        @click="del($event, props.line.id)">删除
                    </yii-button>
                </template>
            </yii-table-column>
        </yii-table>
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