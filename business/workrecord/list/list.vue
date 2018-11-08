<!-- Created by gaoyang 工作记录列表页面-->
<template>
    <div class="workrecord-list-wrapper">
        <div class="p-search-req">
            
            <div class="p-search-input">
                <yii-icon name="search" color="#888"></yii-icon>
                <input class="input-search" v-model="params.name" placeholder="内容">
                
            </div>
            <div class="p-search-date-start">
                <yii-date-picker @change="changeDate()" placeholder="开始日期" v-model="params.date_start"></yii-date-picker>
            </div>
            <div class="p-search-date-end">
                <yii-date-picker @change="changeDate()" placeholder="结束日期" v-model="params.date_end"></yii-date-picker>
            </div>
            <div class="p-search-btn">
                <yii-button  @click="search">查询</yii-button>
            </div>
        </div>
        <div class="p-req-con">
            <div class="p-desc-content">
                
                <table class="workrecord-table">
                    <tr>
                        <th style="width: 20px"><i v-if="$route.params.userid==userinfo.id"  class="add-btn" type="text" @click="addRow()"></i></th>
                        <th>日报内容</th>
                        <th style="width: 160px">日期</th>
                        <th style="width: 160px">用户</th>
                        <th style="width: 160px">创建时间</th>
                        <th style="width: 50px" v-if="$route.params.userid==userinfo.id" >操作</th>
                    </tr>
                    <tr v-for="(row,index) in dataList">
                        <td>{{index+1}} </td>
                        <td>
                            <yii-textarea v-if="row.editable" v-focus="true" @blur="changeRow(row)" v-model="row.content"   maxlength="200" counter ime ></yii-textarea>
                            <span  v-if="!row.editable" v-html="row.content"></span>
                        </td>
                        <td>
                            {{row.createtime?row.createtime.split(" ")[0]:""}}
                        </td>
                        <td>
                            {{row.createusername}}
                        </td>
                        <td>
                            {{row.createtime}}
                        </td>  
                        <td v-if="$route.params.userid==userinfo.id" ><i class="del-btn" v-if="row.createuser==userinfo.id" type="text" @click="del($event, row.id,index)"></i>
                        <i class="edit-btn" v-if="row.createuser==userinfo.id" type="text" @click="edit(row)"></i></td>                     
                    </tr>
                </table>
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