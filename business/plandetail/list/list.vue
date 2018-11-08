<!-- Created by gaoyang 计划明细列表页面-->
<template>
    <div class="plandetail-list-wrapper">
        <div>
            <yii-row>
                <yii-button @click="gotoNew()">新建计划明细</yii-button>
            </yii-row>
        </div>
        <div class="p-search">
            <yii-row>
                <yii-col class="p-search-label"></yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.plan" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label"></yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.title" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label"></yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.content" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">完成度</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.finished" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">创建人</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.createusername" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">创建时间</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.createtime" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">修改人</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.updateusername" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">修改时间</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.updatetime" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col span="3" class="p-search-content p-text-right">
                    <yii-button size="small" @click="search">查询</yii-button>
                </yii-col>
                </yii-row>
                <yii-row>
                </yii-row>
        </div>
        <yii-table :data-list="dataList" stripe empty-default="">
            <yii-table-column align="center" :width="120" title="" relate="plan">
                <template slot-scope="props">
                    <router-link :to="{ name: 'plandetail-detail', params: { id: props.line.id }}">
                        <yii-button type="text">{{props.line.plan}}
                        </yii-button>
                    </router-link>
                </template>
            </yii-table-column>
            <yii-table-column align="center" :width="120" title="" relate="title"></yii-table-column>
            <yii-table-column align="center" :width="120" title="" relate="content"></yii-table-column>
            <yii-table-column align="center" :width="120" title="完成度" relate="finished"></yii-table-column>
            <yii-table-column align="center" :width="120" title="创建人" relate="createusername"></yii-table-column>
            <yii-table-column align="center" :width="200" title="创建时间" relate="createtime"></yii-table-column>
            <yii-table-column align="center" :width="120" title="修改人" relate="updateusername"></yii-table-column>
            <yii-table-column align="center" :width="200" title="修改时间" relate="updatetime"></yii-table-column>
            <yii-table-column align="center" :width="120" title="操作" fixed="right">
                <template slot-scope="props">
                    <router-link
                        :to="{name: 'plandetail-modify', params: {id: props.line.id}}"
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