<!-- Created by gaoyang 计划详情页面-->
<template>
    <div class="plan-detail-wrapper">

        <div class="plan-detail">
            <yii-row>
                <yii-col class="label" span="3">计划内容</yii-col>
                <yii-col class="value" span="20">
                    {{plan.name}}
                </yii-col>
            </yii-row>
            <yii-row>
                <yii-col class="label" span="3">计划描述</yii-col>
                <yii-col class="value" span="20">
                    {{plan.remark}}
                </yii-col>
            </yii-row>
            <yii-row>
                <yii-col class="label" span="3">时间</yii-col>
                <yii-col class="value" span="20">
                    {{plan.starttime}}~{{plan.endtime}}
                </yii-col>
            </yii-row>
            
       </div>
       <div class="p-search-btn">
            <yii-button icon="addfile"  @click="gotoNew">创建计划</yii-button>
        </div>
       <div class="plan-detail-plandetails">
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
                            <th style="width: 20px">序号</th>
                            <th>标题</th>
                            <th>计划内容</th>
                            <th style="width: 160px">用户</th>
                            <th style="width: 160px">创建时间</th>
                            <th style="width: 160px">是否完成</th>
                            <th style="width: 50px">操作</th>
                        </tr>
                        <tr v-for="(row,index) in dataList">
                            <td>{{index+1}} </td>   
                            <td>{{row.title}}
                            </td>
                            <td v-html="row.content"></td>
                            <td>
                                {{row.createusername}}
                            </td>
                            <td>
                                {{row.createtime}}
                            </td>  
                            <td>
                                <span v-if="row.finished">完成</span>
                                <span v-if="!row.finished">未完成</span>
                            </td>  
                            <td><i class="del-btn" v-if="row.createuser==userinfo.id" type="text" @click="del($event, row.id,index)"></i>
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
        
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>