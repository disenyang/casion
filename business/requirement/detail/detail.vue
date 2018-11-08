<!-- Created by gaoyang 需求详情页面-->
<template>
    <div class="requirement-detail-wrapper">
        <yii-row>
            <yii-col span="3">需求名称</yii-col>
            <yii-col span="5">
                {{requirement.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">状态</yii-col>
            <yii-col span="5">
                {{requirement.status}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">开发开始时间</yii-col>
            <yii-col span="5">
                {{requirement.dev_start_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">开发结束时间</yii-col>
            <yii-col span="5">
                {{requirement.dev_end_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">联调开始时间</yii-col>
            <yii-col span="5">
                {{requirement.couplet_start_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">联调结束时间</yii-col>
            <yii-col span="5">
                {{requirement.couplet_end_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3"></yii-col>
            <yii-col span="5">
                {{requirement.test_start_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3"></yii-col>
            <yii-col span="5">
                {{requirement.test_end_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">上线时间</yii-col>
            <yii-col span="5">
                {{requirement.online_date}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">开发者</yii-col>
            <yii-col span="5">
                {{requirement.developer}}
            </yii-col>
        </yii-row>
        <yii-row>
        </yii-row>
        <yii-row>
            <yii-button type="stroke" @click="back()">返回</yii-button>
        </yii-row>
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>