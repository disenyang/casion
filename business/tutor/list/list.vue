<!-- Created by gaoyang 导师列表页面-->
<template>
    <div class="tutor-list-wrapper">
        <div>
            <yii-row>
                <yii-button @click="gotoNew()">新建导师</yii-button>
            </yii-row>
        </div>
        <div class="p-search">
            <yii-row>
                <yii-col class="p-search-label">导师</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.tutor" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">学生</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.student" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">完成度</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.finishing" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">创建人</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.createusername" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">创建时间</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.createtime" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col span="3" class="p-search-content p-text-right">
                    <yii-button size="small" @click="search">查询</yii-button>
                </yii-col>
                </yii-row>
        </div>
        <yii-table :data-list="dataList" stripe empty-default="">
            <yii-table-column align="center" :width="120" title="导师" relate="tutor">
                <template slot-scope="props">
                    <router-link :to="{ name: 'tutor-detail', params: { id: props.line.id }}">
                        <yii-button type="text">{{props.line.tutor}}
                        </yii-button>
                    </router-link>
                </template>
            </yii-table-column>
            <yii-table-column align="center" :width="120" title="学生" relate="student"></yii-table-column>
            <yii-table-column align="center" :width="120" title="完成度" relate="finishing"></yii-table-column>
            <yii-table-column align="center" :width="120" title="创建人" relate="createusername"></yii-table-column>
            <yii-table-column align="center" :width="200" title="创建时间" relate="createtime"></yii-table-column>
            <yii-table-column align="center" :width="120" title="操作" fixed="right">
                <template slot-scope="props">
                    <router-link
                        :to="{name: 'tutor-modify', params: {id: props.line.id}}"
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