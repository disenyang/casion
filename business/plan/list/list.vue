<!-- Created by gaoyang 计划列表页面-->
<template>
    <div class="plan-list-wrapper">
        <div class="p-search-req">
            
            <div class="p-search-input">
                <yii-icon name="search" color="#888"></yii-icon>
                <input class="input-search" v-model="params.name" placeholder="名称">
                
            </div>
            <div class="p-search-date-start">
                <yii-date-picker @change="changeDate()" placeholder="开始日期" v-model="params.date_start"></yii-date-picker>
            </div>
            <div class="p-search-date-end">
                <yii-date-picker @change="changeDate()" placeholder="结束日期" v-model="params.date_end"></yii-date-picker>
            </div>
        </div>
        <div class="plan-list">
            <div class="plan" v-for="(plan,index) in dataList" @click="gotoDetail(plan)">
                <div class="name">{{plan.name}}</div>
                <div class="remark">{{plan.remark}}</div>
                <div class="time">{{plan.starttime}}~{{plan.endtime}}</div>

                <div class="edit" v-if="userinfo.id===plan.createuser" @click="gotoEdit(plan)">
                    <yii-icon name="edit"></yii-icon>
                </div>
                <div class="del" v-if="userinfo.id===plan.createuser" @click="del($event,plan.id)">
                    <yii-icon name="delete"></yii-icon>
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