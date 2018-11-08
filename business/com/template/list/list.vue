<!-- Created by gaoyang 模版列表页面-->
<template>
    <div class="template-list-wrapper">
        <div>
            <yii-row>
                <yii-button @click="gotoNew()">新建模版</yii-button>
            </yii-row>
        </div>
        <div class="p-search">
            <yii-row>
                <yii-col class="p-search-label">名称</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.name" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">视图内容</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.viewContent" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">css内容</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.cssContent" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">js内容</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.jsContent" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">图片</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.image" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col class="p-search-label">组件库</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.coid" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                </yii-row>
                <yii-row>
                <yii-col class="p-search-label">说明</yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.remark" placeholder="请输入规格ID"></yii-input>
                </yii-col>
                <yii-col span="3" class="p-search-content p-text-right">
                    <yii-button size="small" @click="search">查询</yii-button>
                </yii-col>
                </yii-row>
        </div>
        <yii-table :data-list="dataList" stripe empty-default="">
            <yii-table-column align="center" :width="120" title="名称" relate="name">
                <template slot-scope="props">
                    <router-link :to="{ name: 'template-detail', params: { id: props.line.id }}">
                        <yii-button type="text">{{props.line.name}}
                        </yii-button>
                    </router-link>
                </template>
            </yii-table-column>
            <yii-table-column align="center" :width="120" title="视图内容" relate="viewContent"></yii-table-column>
            <yii-table-column align="center" :width="120" title="css内容" relate="cssContent"></yii-table-column>
            <yii-table-column align="center" :width="120" title="js内容" relate="jsContent"></yii-table-column>
            <yii-table-column align="center" :width="120" title="图片" relate="image"></yii-table-column>
            <yii-table-column align="center" :width="120" title="组件库" relate="coid"></yii-table-column>
            <yii-table-column align="center" :width="120" title="说明" relate="remark"></yii-table-column>
            <yii-table-column align="center" :width="120" title="操作" fixed="right">
                <template slot-scope="props">
                    <router-link
                        :to="{name: 'template-modify', params: {id: props.line.id}}"
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