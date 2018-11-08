<!-- Created by gaoyang 环境列表页面-->
<template>
    <div class="environment-list-wrapper">
        <div>
            
        </div>
        <div class="p-search">
            <yii-row>
                <yii-col span="3">
                    <yii-button @click="gotoNew()">新建环境</yii-button>
                </yii-col>
                <yii-col span="5" class="p-search-content">
                    <yii-input v-model="params.name" placeholder="请输入名称"></yii-input>
                </yii-col>
                <yii-col span="3" class="p-search-content p-text-right">
                    <yii-button @click="search">查询</yii-button>
                </yii-col>
            </yii-row>
        </div>
        <table class="casion-table">
            <tr>
                <th>名称</th>
                <th>描述</th>
                <th>ftp主机</th>
                <th>ftp端口</th>
                <th>ftp用户名</th>
                <th>ftp密码</th>
                <th>上传目录</th>
                <th>操作</th>
            </tr>
            <tr v-for="(row,index) in dataList">
                <td>{{row.name}}</td>
                <td>{{row.remark}}</td>
                <td>{{row.ftphost}}</td>
                <td>{{row.ftpport}}</td>
                <td>{{row.ftpusername}}</td>
                <td>{{row.ftppassword}}</td>
                <td>{{row.remotePath}}</td>
                <td><router-link
                        :to="{name: 'environment-modify', params: {id: row.id}}"
                        class="mr20">
                          <yii-button type="text">修改</yii-button>
                    </router-link>
                    <yii-button type="text"
                        @click="del($event, row.id)">删除
                    </yii-button>
                </td>
            </tr>  
        </table>
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